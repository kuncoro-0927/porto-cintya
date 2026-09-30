import { Link } from "react-router-dom";
const CardProject = ({ image, title, year, software, slug }) => {
  return (
    <div className="bg-[#eeeeee] flex flex-col justify-between items-start rounded-4xl p-5 w-full h-full lg:max-w-lg">
      <div className="flex flex-col">
        <div className="w-full rounded-2xl mb-6 h-[240px] shrink-0 ">
          <img
            className="w-full h-full rounded-2xl  object-cover"
            src={image}
            alt=""
          />
        </div>
        <span className="text-lg font-medium  line-clamp-3">{title}</span>
      </div>
      <div className="w-full">
        <div className="mt-6 text-[#6c6c6c]">
          <div className="flex items-center justify-between">
            <span>Project Date</span>
            <span className="text-black">{year}</span>
          </div>
          <div className="border-gray-200 border my-3"></div>
          <div className="flex items-start gap-6 justify-between">
            <span>Tools & Technologies</span>
            <span className="text-black line-clamp-1">{software}</span>
          </div>
        </div>
        <div className=" w-full mt-16">
          <Link
            to={`/project/${slug}`}
            className="py-3 rounded-2xl bg-black text-white w-full flex justify-center items-center hover:-translate-y-0.5 hover:shadow-md duration-300"
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardProject;
