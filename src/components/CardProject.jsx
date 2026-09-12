const CardProject = ({ image, title, year, software }) => {
  return (
    <div className="bg-[#eeeeee] rounded-4xl p-5 w-full h-full max-w-lg">
      <img className="rounded-2xl mb-6 w-full h-auto" src={image} alt="" />
      <span className="text-lg font-medium min-h-[84px] line-clamp-3">
        {title}
      </span>
      <div className="mt-6 text-[#6c6c6c]">
        <div className="flex items-center justify-between">
          <span>Tahun</span>
          <span className="text-black">{year}</span>
        </div>
        <div className="border-gray-200 border my-3"></div>
        <div className="flex items-start gap-6 justify-between">
          <span>Software/Tool</span>
          <span className="text-black line-clamp-1">{software}</span>
        </div>
      </div>
      <button className="py-3 rounded-2xl bg-black text-white w-full mt-16">
        View details
      </button>
    </div>
  );
};

export default CardProject;
