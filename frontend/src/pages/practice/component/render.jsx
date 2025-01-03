import SingleChoice from "./single_choice";
import MultipleChoice from "./multiple_choice";
import FillInTheBlank from "./fill_in_the_blank";
import ShortAnswer from "./short_answer";
import DragAndDrop from "./drag_and_drop";

const renderAnswerOptions = (question) => {
  const { id, type } = question;

  switch (type) {
    case "SINGLE_CHOICE":
      return (
        <SingleChoice
          question={question}
          userAnswer={userAnswers[id]}
          onChange={handleAnswerChange}
        />
      );
    case "MULTIPLE_CHOICE":
      return (
        <MultipleChoice
          question={question}
          userAnswer={userAnswers[id]}
          onChange={handleAnswerChange}
        />
      );
    case "FILL_IN_THE_BLANK":
      return (
        <FillInTheBlank
          question={question}
          userAnswer={userAnswers[id]}
          onChange={handleAnswerChange}
        />
      );
    case "SHORT_ANSWER":
      return (
        <ShortAnswer
          question={question}
          userAnswer={userAnswers[id]}
          onChange={handleAnswerChange}
        />
      );
    case "DRAG_AND_DROP":
      return (
        <DragAndDrop
          question={question}
          userAnswer={userAnswers[id]}
          onChange={handleAnswerChange}
        />
      );
    default:
      return <p className="text-red-500">Unsupported question type</p>;
  }
};
