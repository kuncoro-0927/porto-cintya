const CardDetail = ({ category, title, year, software, subtitle, bullets }) => {
  return (
    <div className="bg-[#eeeeee] flex flex-col justify-between items-start rounded-4xl p-6 w-full h-full lg:max-w-lg">
      <div className="flex flex-col">
        <span className="text-lg font-medium  line-clamp-3">{title}</span>

        <span className="text-sm text-[#6c6c6c] mt-3 font-medium  line-clamp-3">
          {subtitle}
        </span>
      </div>
      <div className="w-full mt-6">
        <div className="mt-6 text-[#6c6c6c]">
          <div className="flex items-center justify-between">
            <span>Kategori</span>
            <span className="text-black">{category}</span>
          </div>
          <div className="border-gray-200 border my-3"></div>
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

        <div className="mt-10">
          <h2>Project Description</h2>

          {bullets?.length > 0 && (
            <ul>
              {bullets.map((bullet, index) => (
                <li key={index}>{bullet}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
