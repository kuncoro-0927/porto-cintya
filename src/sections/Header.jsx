import { FaLinkedin } from "react-icons/fa";
import useProfile from "../pages/admin/data/profile/hooks/useProfile";
const Header = () => {
  const { profile } = useProfile();
  return (
    <header id="header" className="px-6 mt-40 sm:px-20 lg:p-20 lg:mt-20 2xl:px-40">
      <div className=" flex flex-col gap-5 justify-center items-center text-center">
        <h1 className="font-semibold text-4xl lg:text-6xl max-w-4xl">
          <span className="text-[#6c6c6c] leading-tight">
            Hi, I'm Cintya Kusuma
          </span>{" "}
          <br /> A Data Enthusiast
        </h1>
        <span className="max-w-2xl text-[#6c6c6c] text-sm lg:text-[18px] leading-tight">
          I transform raw data into actionable insights, identify key patterns,
          and develop data-driven models to support strategic decision-making
          and business growth.
        </span>
        <div className="flex items-center gap-3 mt-5 text-sm lg:text-[18px]">
          <a
            target="_blank"
            href={profile?.linkedin || ""}
            className="flex items-center gap-2 bg-black py-3 px-5 font-medium rounded-xl text-white drop-shadow-md drop-shadow-black hover:-translate-y-0.5 hover:shadow-md duration-300 cursor-pointer"
          >
            {" "}
            <FaLinkedin className="text-xl" /> Connect with me
          </a>

          <a
            href={profile?.cv_url}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-100 py-3 px-5 rounded-xl font-medium hover:-translate-y-0.5 hover:shadow-md duration-300 cursor-pointer"
          >
            Download CV
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
