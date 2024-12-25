const QuizsetCard = ({ name, description }) => {
    return (
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h3 className="font-bold text-xl">{name}</h3>
        <p className="text-gray-500">{description}</p>
      </div>
    );
  };
  
  export default QuizsetCard;
  