package com.example.backend.service;

import com.example.backend.DTO.Practice.BlankAnswerDTO;
import com.example.backend.DTO.Practice.BlankResultDTO;
import com.example.backend.DTO.Practice.ListSmallPracticeResultDTO;
import com.example.backend.DTO.Practice.MultipleChoiceAnswerDTO;
import com.example.backend.DTO.Practice.OptionResultDTO;
import com.example.backend.DTO.Practice.PracticeRequestDTO;
import com.example.backend.DTO.Practice.PracticeResultDTO;
import com.example.backend.DTO.Practice.QuizResultDTO;
import com.example.backend.DTO.Practice.ShortAnswerDTO;
import com.example.backend.DTO.Practice.ShortResultDTO;
import com.example.backend.DTO.Practice.SmallPracticeResultDTO;
import com.example.backend.DTO.Quiz.Quiz.QuizResponseDTO;
import com.example.backend.DTO.User.UserResponseDTO;
import com.example.backend.entity.*;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.*;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class PracticeService {

    private final QuizSetRepository quizSetRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final ResultRepository resultRepository;
    private final QuizRepository quizRepository;
    private final QuizAnswerRepository quizAnswerRepository;


    public List<QuizResponseDTO> getQuizzesForPractice(int id) {

        var quizSet = quizSetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz set not found"));

        List<QuizResponseDTO> quizzes = quizSet.getQuizList().stream()
                .map(quiz -> modelMapper.map(quiz, QuizResponseDTO.class))
                .collect(Collectors.toList());
        return quizzes;
    }

    public void submitPractice(String name,int id, PracticeRequestDTO practiceRequestDTO) {

        var user = userRepository.findByEmail(name)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        var quizSet = quizSetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz set not found"));

        int getAttemptTime = resultRepository.countByQuizSetIdAndUserId(user.getId(), quizSet.getId());

        //create new result record
        Result result = new Result();
        result.setUser(user);
        result.setQuizSet(quizSet);
        result.setCompleteTime(practiceRequestDTO.getTime());
        result.setCreatedAt(LocalDateTime.now());
        result.setAttemptTime(getAttemptTime + 1);

        if(practiceRequestDTO.getTeamId() != null){
            var team = new Team();
            team.setId(practiceRequestDTO.getTeamId());
            result.setTeam(team);
        }

        //save record for eachquiz
        practiceRequestDTO.getListAnswer().forEach(answer -> {
            var quiz = quizRepository.findById(answer.getId()).orElseThrow(() -> new ResourceNotFoundException("Quiz not found"));
            QuizAnswer quizAnswer = new QuizAnswer();
            quizAnswer.setQuiz(quiz);
            quizAnswer.setType(quiz.getType());
            quizAnswer.setResult(result);

            AtomicBoolean isCorrect = new AtomicBoolean(false);//flag to check if the quiz is correct

            //handle single choice quiz
            if(answer.getType().equals(QuestionType.SINGLE_CHOICE)){
                System.out.println("Single choice processing............................");
                //cast to multiplechoice DTO
                var multipleChoiceAnswer = (MultipleChoiceAnswerDTO) answer;

                System.out.println("Multiple choice answer : " + multipleChoiceAnswer);

                //get the user answer
                var userAnswer = multipleChoiceAnswer.getOptions().getFirst();

                //get the correct answer
                var correctAnswerContent = quiz.getOptions().stream()
                    .filter(QuizOption::getIsCorrect)
                    .map(QuizOption::getContent)
                    .findFirst()
                    .orElse(null);


                if(multipleChoiceAnswer.getOptions().size()==1 && userAnswer.equals(correctAnswerContent)){
                    isCorrect.set(true);
                }

                //save the answer
                QuizOptionAnswer quizOptionAnswer = new QuizOptionAnswer();
                quizOptionAnswer.setContent(userAnswer);
                quizOptionAnswer.setQuizAnswer(quizAnswer);
                quizAnswer.setQuizOptionAnswers(List.of(quizOptionAnswer));
            }

            //handle multiple choice quiz
            if(answer.getType().equals(QuestionType.MULTIPLE_CHOICE)){
                System.out.println("Multi choice processing............................");
                //cast to multiplechoice DTO
                var multipleChoiceAnswer = (MultipleChoiceAnswerDTO) answer;

                //get the correct answer
                var correctAnswerContent = quiz.getOptions().stream().filter(QuizOption::getIsCorrect).map(QuizOption::getContent).toList();

                isCorrect.set(correctAnswerContent.containsAll(multipleChoiceAnswer.getOptions())
                    && multipleChoiceAnswer.getOptions().containsAll(correctAnswerContent)
                    && correctAnswerContent.size() == multipleChoiceAnswer.getOptions().size());

                //save the answer
                quizAnswer.setQuizOptionAnswers(multipleChoiceAnswer.getOptions().stream().map(option -> {
                    QuizOptionAnswer quizOptionAnswer = new QuizOptionAnswer();
                    quizOptionAnswer.setContent(option);
                    quizOptionAnswer.setQuizAnswer(quizAnswer);
                    return quizOptionAnswer;
                }).toList());
            }

            //handle short answer quiz
            if((answer.getType().equals(QuestionType.SHORT_ANSWER))){
                System.out.println("Short processing............................");
                //cast to short answer DTO
                var shortAnswer = (ShortAnswerDTO) answer;

                System.out.println("Short answer : " + shortAnswer);

                //get the correct answer
                var correctAnswerContent = quiz.getShortAnswer().getContent();

                isCorrect.set(shortAnswer.getShortAnswer().equalsIgnoreCase(correctAnswerContent));

                //save the answer
                ShortAnswer shortAnswerEntity = new ShortAnswer();
                shortAnswerEntity.setContent(shortAnswer.getShortAnswer());
                shortAnswerEntity.setQuizAnswer(quizAnswer);
                quizAnswer.setShortAnswer(shortAnswerEntity);
            }

            //handle blank answer quiz
            if(answer.getType().equals(QuestionType.FILL_IN_THE_BLANK) || answer.getType().equals(QuestionType.DRAG_AND_DROP)){
                System.out.println("Blank processing............................");
                //cast to blank answer DTO
                var blankAnswerDTO = (BlankAnswerDTO) answer;

                //get the correct answer
                var blankList = quiz.getBlanks();

                isCorrect.set(true);

                if(blankAnswerDTO.getBlanks().size() != blankList.size()){
                    isCorrect.set(false);
                }

                List<BlankAnswer> blankAnswers = blankAnswerDTO.getBlanks().stream().map(blankDTO -> {
                    BlankAnswer blankAnswer = new BlankAnswer();
                    blankAnswer.setContent(blankDTO.getContent());
                    blankAnswer.setBlankOrder(blankDTO.getOrder());
                    blankAnswer.setQuizAnswer(quizAnswer);

                    // Check if there is an object in blankList with equal value and order
                    boolean match = blankList.stream().anyMatch(blank ->
                        blank.getContent().equalsIgnoreCase(blankDTO.getContent()) && blank.getBlankOrder().equals(blankDTO.getOrder())
                    );

                    if (!match) {
                        isCorrect.set(false);
                    }

                    return blankAnswer;
                }).collect(Collectors.toList());

                quizAnswer.setBlankAnswers(blankAnswers);

            }
            quizAnswer.setIsCorrect(isCorrect.get());
            if(isCorrect.get()){
                result.setNumberCorrect(result.getNumberCorrect() + 1);
            }
            quizAnswer.setResult(result);
            result.addQuizAnswer(quizAnswer);
        });

        resultRepository.save(result);
    }

    public PracticeResultDTO getPracticeResult(int id) {
        var result = resultRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Result not found"));

        var practiceResultDTO = modelMapper.map(result, PracticeResultDTO.class);

        var listQuizResultDTO = result.getQuizAnswers().stream().map(quizAnswer ->{
            var type = quizAnswer.getQuiz().getType();
            var quizResultDTO = modelMapper.map(quizAnswer, QuizResultDTO.class);
            var quiz = quizAnswer.getQuiz();
            quizResultDTO.setContent(quizAnswer.getQuiz().getContent());

            //handle choice quiz
            if(type.equals(QuestionType.SINGLE_CHOICE) || type.equals(QuestionType.MULTIPLE_CHOICE)){
                //get the list of options which user choose
                var options = quizAnswer.getQuizOptionAnswers().stream()
                    .map(quizOptionAnswer -> {
                        var optionResultDTO = new OptionResultDTO();
                        optionResultDTO.setContent(quizOptionAnswer.getContent());
                        return optionResultDTO;
                    }).toList();

                // get all options of quiz and set isSelected field if has element in quizOptionAnswers
                var finalResultOption = quizAnswer.getQuiz().getOptions().stream().map(quizOption -> {
                    var optionResultDTO = new OptionResultDTO();
                    optionResultDTO.setContent(quizOption.getContent());
                    optionResultDTO.setIsCorrect(quizOption.getIsCorrect());
                    optionResultDTO.setIsSelected(options.stream()
                        .anyMatch(option -> option.getContent().equalsIgnoreCase(quizOption.getContent())));
                    return optionResultDTO;
                }).toList();

                quizResultDTO.setOptions(finalResultOption);
            }

            //handle short answer quiz
            if(type.equals(QuestionType.SHORT_ANSWER)){
                var shortAnswer = quizAnswer.getShortAnswer();
                var shortResultDTO = new ShortResultDTO();
                shortResultDTO.setId(shortAnswer.getId());
                shortResultDTO.setFilledContent(shortAnswer.getContent());
                shortResultDTO.setContent(quiz.getShortAnswer().getContent());

                quizResultDTO.setShortAnswer(shortResultDTO);
            }

            //handle blank answer quiz
            if(type.equals(QuestionType.FILL_IN_THE_BLANK) || type.equals(QuestionType.DRAG_AND_DROP)){
                //get the blanks that user filled
                var blanks = quizAnswer.getBlankAnswers();

                //get the real blank of quiz
                var finalResultBlank = quizAnswer.getQuiz().getBlanks().stream()
                    .map(blankAnswer -> {
                        var blankResultDTO = new BlankResultDTO();
                        blankResultDTO.setContent(blankAnswer.getContent());
                        blankResultDTO.setOrder(blankAnswer.getBlankOrder());
                        //get the content of this order filled by user
                        var filledContent = blanks.stream()
                            .filter(blank -> blank.getBlankOrder().equals(blankAnswer.getBlankOrder()))
                            .findFirst()
                            .map(BlankAnswer::getContent)
                            .orElse(null);
                        blankResultDTO.setFilledContent(filledContent);

                        return blankResultDTO;
                    }).collect(Collectors.toList());

                quizResultDTO.setBlanks(finalResultBlank);
            }

            return quizResultDTO;

        }).toList();

        practiceResultDTO.setQuizAnswers(listQuizResultDTO);

        return practiceResultDTO;
    }

    public ListSmallPracticeResultDTO getAllPracticeResults(String email,String sortElement, String direction, String search, int page, int limit) {
        Sort sort = Sort.by(Sort.Direction.fromString(direction), sortElement);
        Pageable pageable = PageRequest.of(page - 1, limit, sort);

        Page<Result> resultsPage;

        if (search != null && !search.isEmpty()) {
            resultsPage = resultRepository.findByUserEmailAndQuizSetNameContainingIgnoreCase(email, search, pageable);
        } else {
            resultsPage = resultRepository.findByUserEmail(email, pageable);
        }

        List<SmallPracticeResultDTO> results = resultsPage.stream()
            .map(result -> modelMapper.map(result, SmallPracticeResultDTO.class))
            .toList();

        return ListSmallPracticeResultDTO.builder()
            .results(results)
            .totalPages(resultsPage.getTotalPages())
            .totalElements((int) resultsPage.getTotalElements())
            .build();
    }

    public UserResponseDTO getUserById(int id) {
        var user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return modelMapper.map(user, UserResponseDTO.class);
    }
}
