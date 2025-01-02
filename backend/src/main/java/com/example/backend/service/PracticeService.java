package com.example.backend.service;

import com.example.backend.DTO.Practice.BlankAnswerDTO;
import com.example.backend.DTO.Practice.MultipleChoiceAnswerDTO;
import com.example.backend.DTO.Practice.PracticeRequestDTO;
import com.example.backend.DTO.Practice.ShortAnswerDTO;
import com.example.backend.DTO.Quiz.Quiz.QuizResponseDTO;
import com.example.backend.DTO.Quiz.QuizResultDTO;
import com.example.backend.entity.*;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.*;
import java.util.HashSet;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
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

    public QuizResultDTO submitPractice(String name,int id, PracticeRequestDTO practiceRequestDTO) {

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

                //get the user answer
                var userAnswer = multipleChoiceAnswer.getOptions().getFirst();

                //get the correct answer
                var correctAnswerContent = quiz.getOptions().stream()
                    .filter(QuizOption::getIsCorrect)
                    .map(QuizOption::getContent)
                    .findFirst()
                    .orElse(null);


                if(multipleChoiceAnswer.getOptions().size()==1 || userAnswer.equals(correctAnswerContent)){
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

        return null;
    }
}
