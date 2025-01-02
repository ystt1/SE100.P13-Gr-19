package com.example.backend.service;

import com.example.backend.DTO.Quiz.Quiz.ListSmallQuizResponseDTO;
import com.example.backend.DTO.Quiz.Quiz.QuizResponseDTO;
import com.example.backend.DTO.Quiz.Quiz.SmallQuizResponseDTO;
import com.example.backend.DTO.QuizSet.ListQuizSetDTO;
import com.example.backend.DTO.QuizSet.QuizSetRequestDTO;
import com.example.backend.DTO.QuizSet.QuizSetResponseDTO;
import com.example.backend.entity.Quiz;
import com.example.backend.entity.QuizSet;
import com.example.backend.entity.User;
import com.example.backend.exception.ConflictException;
import com.example.backend.exception.ForbiddenException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.QuizRepository;
import com.example.backend.repository.QuizSetRepository;
import com.example.backend.repository.UserRepository;
import jakarta.persistence.criteria.Predicate;

import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class QuizSetService {

  private final QuizSetRepository quizSetRepository;

  private final UserRepository userRepository;

  private final QuizRepository quizRepository;

  private ModelMapper modelMapper;

  public QuizSetResponseDTO createQuizSet(String email, QuizSetRequestDTO quizSetRequestDTO) {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("User not found"));

    //check if quiz set with name already exists of this account
    var quizSets = quizSetRepository.findAllByNameAndCreatorEmail(quizSetRequestDTO.getName(),email);

    if(!quizSets.isEmpty()){
      throw new ConflictException("Quiz set with name " + quizSetRequestDTO.getName() + " already exists");
    }

    //map to entity
    QuizSet quizSet = modelMapper.map(quizSetRequestDTO, QuizSet.class);

    //set other value for the entity
    quizSet.setCreatedTime(new java.util.Date());
    quizSet.setUpdatedTime(quizSet.getCreatedTime());
    quizSet.setTotalQuestion(0);
    quizSet.setCreator(user);

    return modelMapper.map(quizSetRepository.save(quizSet), QuizSetResponseDTO.class);
  }

  public ListQuizSetDTO getAllQuizSetsByUserEmail(String email, String sortElement, String direction, String search, int page, int limit, int topicId) {
    User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));

    //Pageable for pagination and sorting
    Sort sort = Sort.by(Sort.Direction.fromString(direction), sortElement);
    Pageable pageable = PageRequest.of(page-1, limit, sort);

    //specification for searching
    Specification<QuizSet> spec = (root, query, criteriaBuilder) -> {
      Predicate predicate = criteriaBuilder.conjunction(); // Initialize predicate

      if (email != null) {
        predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("creator").get("email"), email));
      }
      if (search != null && !search.isEmpty()) {
        predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("name"), "%" + search + "%"));
      }
      if (topicId != 0) {
        predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("topic").get("id"), topicId));
      }
      return predicate;
    };

    Page<QuizSet> quizSetPage = quizSetRepository.findAll(spec, pageable);

    List<QuizSetResponseDTO> quizSetDTOs = quizSetPage.getContent().stream()
        .map(quizSet -> {
          QuizSetResponseDTO dto = modelMapper.map(quizSet, QuizSetResponseDTO.class);
          dto.setIsBookmarked(user.getBookmarks().contains(quizSet));
          return dto;
        })
        .collect(Collectors.toList());

    var result = ListQuizSetDTO.builder().quizSets(quizSetDTOs).build();
    result.setTotalElements((int) quizSetPage.getTotalElements());
    result.setTotalPages(quizSetPage.getTotalPages());
    result.setCurrentPage(page);

    return result;
  }


  public QuizSetResponseDTO getQuizSetById(String email, int id) {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("User not found"));

    var quizSet = quizSetRepository.findById(id);
    if (quizSet.isEmpty()) {
      throw new ResourceNotFoundException("Quiz set with id " + id + " not found");
    }

    QuizSetResponseDTO result = modelMapper.map(quizSet.get(), QuizSetResponseDTO.class);
    if(user.getBookmarks().contains(quizSet.get())){
      result.setIsBookmarked(true);
    }
    else {
      result.setIsBookmarked(false);
    }
    return result;
  }



  public void deleteQuizSet(String email,int id) {
    var quizSet = quizSetRepository.findById(id);
    if (quizSet.isEmpty()) {
      throw new ResourceNotFoundException("Quiz set not found");
    }

    if (!quizSet.get().getCreator().getEmail().equals(email)) {
      throw new ForbiddenException("You are not authorized to delete this quiz set");
    }
    quizSetRepository.deleteById(id);
  }

  public QuizSetResponseDTO updateQuizSet(String email, int id, QuizSetRequestDTO quizSetRequestDTO) {
    var quizSet = quizSetRepository.findById(id);
    if (quizSet.isEmpty()) {
      throw new ResourceNotFoundException("Quiz set not found");
    }

    if (!quizSet.get().getCreator().getEmail().equals(email)) {
      throw new ForbiddenException("You are not authorized to update this quiz set");
    }

    quizSet.get().setName(quizSetRequestDTO.getName());
    quizSet.get().setDescription(quizSetRequestDTO.getDescription());
    quizSet.get().setAllowShowAnswer(quizSetRequestDTO.getAllowShowAnswer());
    quizSet.get().setUpdatedTime(new java.util.Date());
    var resultDTO = modelMapper.map(quizSetRepository.save(quizSet.get()), QuizSetResponseDTO.class);
    return resultDTO;
  }

  public void addQuizToQuizSet(String email, int id, List<Integer> listQuizId) {

    var quizSet = quizSetRepository.findById(id);
    if (quizSet.isEmpty()) {
      throw new ResourceNotFoundException("Quiz set not found");
    }
    if (!quizSet.get().getCreator().getEmail().equals(email)) {
      throw new ForbiddenException("You are not authorized to add quizzes to this quiz set");
    }
    listQuizId.forEach(quizId -> {
      var quiz = quizRepository.findById(quizId);
      if (quiz.isEmpty()) {
        throw new ResourceNotFoundException("Quiz not found with id " + quizId);
      }
      if(checkQuizSetContainQuiz(quizSet.get(), quiz.get())){
        throw new ConflictException("Quiz with id " + quizId + " already exists in this quiz set");
      }
      quizSet.get().getQuizList().add(quiz.get());
      quizSet.get().setTotalQuestion(quizSet.get().getTotalQuestion() + 1);
    });
    quizSetRepository.save(quizSet.get());
  }

  public QuizSetResponseDTO allowShowAnswer(String email, int id) {
    var quizSet = quizSetRepository.findById(id);
    if (quizSet.isEmpty()) {
      throw new ResourceNotFoundException("Quiz set not found");
    }

    if (!quizSet.get().getCreator().getEmail().equals(email)) {
      throw new ForbiddenException("You are not authorized to add quizzes to this quiz set");
    }

    quizSet.get().setAllowShowAnswer(true);
    quizSetRepository.save(quizSet.get());

    var resultDTO = modelMapper.map(quizSet.get(), QuizSetResponseDTO.class);
    return resultDTO;
  }

  public QuizSetResponseDTO disableShowAnswer(String email, int id) {
    var quizSet = quizSetRepository.findById(id);
    if (quizSet.isEmpty()) {
      throw new ResourceNotFoundException("Quiz set not found");
    }

    if (!quizSet.get().getCreator().getEmail().equals(email)) {
      throw new ForbiddenException("You are not authorized to add quizzes to this quiz set");
    }

    quizSet.get().setAllowShowAnswer(false);
    quizSetRepository.save(quizSet.get());

    var resultDTO = modelMapper.map(quizSet.get(), QuizSetResponseDTO.class);
    return resultDTO;
  }

  public void addToBookmark(String email, int id) {
    var quizSet = quizSetRepository.findById(id);
    if (quizSet.isEmpty()) {
      throw new ResourceNotFoundException("Quiz set not found");
    }

    var user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));

    user.getBookmarks().add(quizSet.get());
    userRepository.save(user);
  }

  public void removeFromBookmark(String email, int id) {
    var quizSet = quizSetRepository.findById(id);
    if (quizSet.isEmpty()) {
      throw new ResourceNotFoundException("Quiz set not found");
    }

    var user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));

    if (!user.getBookmarks().remove(quizSet.get())) {
      throw new ResourceNotFoundException("Quiz set not found in bookmarks");
    }

    userRepository.save(user);
  }

  public ListQuizSetDTO getAllBookmarkQuizSetsByUserEmail(String email, String sortElement, String direction, String search, int page,
      int limit, int topicId) {
    if (direction == null) {
      direction = "asc";
    }

    Sort sort = Sort.by(Sort.Direction.fromString(direction), sortElement != null ? sortElement : "name");
    Pageable pageable = PageRequest.of(page -1 , limit, sort);

    User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));

    Specification<QuizSet> spec = (root, query, criteriaBuilder) -> {
      Predicate predicate = root.in(user.getBookmarks());
      if (search != null && !search.isEmpty()) {
        predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("name"), "%" + search + "%"));
      }
      if (topicId != 0) {
        predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("topic").get("id"), topicId));
      }
      return predicate;
    };

    Page<QuizSet> quizSetPage = quizSetRepository.findAll(spec, pageable);

    List<QuizSetResponseDTO> quizSetDTOs = quizSetPage.getContent().stream()
        .map(quizSet ->{
          var dto = modelMapper.map(quizSet, QuizSetResponseDTO.class);
          dto.setIsBookmarked(true);
          return dto;
        })
        .collect(Collectors.toList());

    return ListQuizSetDTO.builder()
        .quizSets(quizSetDTOs)
        .totalElements((int) quizSetPage.getTotalElements())
        .totalPages(quizSetPage.getTotalPages())
        .currentPage(page)
        .build();
  }

  public ListQuizSetDTO getAllBookmarkQuizSetsByUserEmail(String email, String sortElement, String direction, String search, int page,
      int limit) {
    return getAllBookmarkQuizSetsByUserEmail(email, sortElement, direction, search, page, limit, 0);
  }

  public ListQuizSetDTO getRandomQuizSet(int limit) {
    long totalQuizSets = quizSetRepository.count();
    int randomPage = (int) (Math.random() * (totalQuizSets / limit));

    Pageable pageable = PageRequest.of(randomPage, limit);
    Page<QuizSet> quizSetPage = quizSetRepository.findAll(pageable);

    List<QuizSetResponseDTO> quizSetDTOs = quizSetPage.getContent().stream()
        .map(quizSet -> modelMapper.map(quizSet, QuizSetResponseDTO.class))
        .collect(Collectors.toList());

    return ListQuizSetDTO.builder().quizSets(quizSetDTOs).build();
  }

  public List<QuizResponseDTO> getQuestionsByQuizSet(int quizSetId) {
    var quizSet = quizSetRepository.findById(quizSetId)
            .orElseThrow(() -> new ResourceNotFoundException("Quiz set không tồn tại"));
    return quizSet.getQuizList().stream()
            .map(quiz -> modelMapper.map(quiz, QuizResponseDTO.class))
            .toList();
  }

  public ListSmallQuizResponseDTO getQuizzesOfQuizSet(int id) {
    var quizSet = quizSetRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Quiz set not found"));

    List<SmallQuizResponseDTO> quizzes = quizSet.getQuizList().stream()
        .map(quiz -> modelMapper.map(quiz, SmallQuizResponseDTO.class))
        .collect(Collectors.toList());

    return ListSmallQuizResponseDTO.builder()
        .quizzes(quizzes)
        .build();
  }

  public Boolean checkQuizSetContainQuiz(QuizSet quizSet, Quiz quiz) {
    return quizSet.getQuizList().contains(quiz);
  }

  public void removeQuizFromQuizSet(String name, int id, int quizId) {
    var quizSet = quizSetRepository.findById(id);
    if(quizSet.isEmpty()){
      throw new ResourceNotFoundException("Quiz set not found");
    }
    if(!quizSet.get().getCreator().getEmail().equals(name)){
      throw new ForbiddenException("You are not authorized to remove quizzes from this quiz set");
    }

    var quiz = quizRepository.findById(quizId);

    if(quiz.isEmpty()){
      throw new ResourceNotFoundException("Quiz not found");
    }

    if(!quizSet.get().getQuizList().contains(quiz.get())){
      throw new ResourceNotFoundException("Quiz not found in this quiz set");
    }

    quizSet.get().getQuizList().remove(quiz.get());
    quizSet.get().setTotalQuestion(quizSet.get().getTotalQuestion() + 1);
    quizSetRepository.save(quizSet.get());
  }
}
