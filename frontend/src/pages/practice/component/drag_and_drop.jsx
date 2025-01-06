import React from "react";
import DragAndDropQuestion from "./drag_and_drop";

const DragAndDrop = ({ question, userAnswer, onChange }) => {
  return (
    <DragAndDropQuestion
      question={question}
      userAnswers={userAnswer}
      onChange={(updatedAnswer) => onChange(updatedAnswer, question.id, question.type)}
    />
  );
};

export default DragAndDrop;
