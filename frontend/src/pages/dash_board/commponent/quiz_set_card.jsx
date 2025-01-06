import { useNavigate } from "react-router-dom";
import img_quiz from "../../../images/img-quiz.jpg";

export default function QuizSetCard({
  title,
  owner,
  questions,
  minutes,
  createdAt,
  participants,
  id, 
}) {



  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/quizset-detail/${id}`); 
  };

  return (
    <div
      className="relative flex flex-col rounded-lg shadow-lg min-w-[200px] w-[260px] overflow-hidden text-gray-800 bg-white m-4 cursor-pointer"
      onClick={()=>handleClick()}
    >
      {/* Image Background */}
      <div className="relative h-[120px]">
        <img
          src={img_quiz}
          alt={`Quiz set ${title} cover`}
          className="absolute inset-0 w-full h-full object-cover z-0 rounded-t-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
      </div>

      {/* Content Section */}
      <div className="relative z-20 p-3 flex flex-col justify-between">
        <div className="text-base font-bold mb-1 text-gray-900 truncate">
          {title}
        </div>
        <div className="text-xs text-gray-600 mb-1">
          <span className="italic">By: {owner}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs mb-2">
          <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md">
            <span className="font-semibold text-gray-700">{questions}</span>
            <span className="text-gray-500">Questions</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-1 bg-gray-50 rounded-lg shadow-sm">
            <span className="font-semibold text-gray-700">{minutes}</span>
            <span className="text-gray-500">Minutes</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-1 bg-gray-50 rounded-lg shadow-sm col-span-2">
            <span className="font-semibold text-gray-700">{participants}</span>
            <span className="text-gray-500">Participants</span>
          </div>
        </div>
        <div className="text-right text-xs text-gray-400">{createdAt}</div>
      </div>
    </div>
  );
}