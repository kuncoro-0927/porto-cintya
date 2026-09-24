const CardData = ({ title, icon, subtitle }) => {
  return (
    <div className="p-6 w-full bg-white rounded-xl">
      <div className="flex items-center justify-between">
        <span>{icon}</span>

        <div className="flex justify-center items-center h-8 w-8 rounded-lg bg-gray-100">
          <i class="bi bi-arrow-up-right bg-linear-to-r from-biru to-hijau bg-clip-text text-transparent"></i>
        </div>
      </div>

      <div className="flex flex-col mt-8">
        <span className="mb-1">{title}</span>
        <span className="text-sm font-medium bg-linear-to-r from-biru to-hijau bg-clip-text text-transparent">
          Total: {subtitle}
        </span>
      </div>
    </div>
  );
};

export default CardData;
