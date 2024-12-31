export default function QuizSetCard({
  title,
  owner,
  questions,
  minutes,
  createdAt,
  participants,
  imageUrl,
}) {
  return (
    <div className="relative flex flex-col rounded-lg shadow-lg min-w-[200px] w-[260px] overflow-hidden text-gray-800 bg-white m-4 hover:shadow-xl transition-shadow duration-300">
      {/* Image Background */}
      <div className="relative h-[140px]"> {/* Tăng chiều cao hình ảnh */}
        <img
          src={imageUrl}
          alt={`Quiz set ${title} cover`}
          className="absolute inset-0 w-full h-full object-cover z-0 rounded-t-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
      </div>

      {/* Content Section */}
      <div className="relative z-20 p-4 flex flex-col justify-between">
        {/* Title */}
        <div className="text-lg font-bold mb-2 text-gray-900 truncate">{title}</div>
        
        {/* Owner */}
        <div className="text-sm text-gray-600 mb-2">
          <span className="italic">By: {owner}</span>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-3 text-sm mb-3">
          <div className="flex items-center gap-2 px-2 py-1 bg-gray-50 rounded-lg shadow-sm">
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

        {/* Created At */}
        <div className="text-right text-sm text-gray-400">{createdAt}</div>
      </div>
    </div>
  );
}