import profile from "../assets/images/profile-cintya.jpeg";

const Footer = () => {
  return (
    <footer className="px-6 sm:p-20 py-10 lg:p-20 2xl:px-40 flex flex-col  bg-black text-white">
      <div className="flex flex-col lg:flex-row items-stretch justify-between">
        <div>
          <div className="bg-white/20 p-1 w-fit rounded-md">
            <img
              className="w-16 h-16 object-cover rounded-md"
              src={profile}
              alt=""
            />
          </div>
          <h2 className="text-2xl font-medium max-w-xl mt-5 text-left">
            There’s more to me…
          </h2>
          <p className="text-[18px] font-medium leading-tight text-[#6c6c6c] max-w-xl mt-3">
            Beyond data, I’m also a{" "}
            <span className="text-white text-lg">Graphic Designer,</span>{" "}
            combining analytical thinking with creativity through visual design.
          </p>
          <button className="py-3 px-6 rounded-xl bg-white font-medium text-black mt-6">
            View My Experiences
          </button>
        </div>

        <div className="flex mt-10 lg:mt-0 flex-col justify-between  items-start gap-10">
          <ul className="flex flex-col lg:flex-row  items-start gap-3 lg:gap-6">
            <li>About</li>
            <li>Projects</li>
            <li>Experiences</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>

      <div className="mt-16 mb-6 border-t border-white/20"></div>
      <div className="flex flex-col gap-3 lg:flex-row items-start lg:items-center justify-between">
        <span className="text-[#6c6c6c] text-sm">
          ©Cintya 2026. All rights reserved.
        </span>
        <span className="text-[#6c6c6c] text-sm">
          Design and crafted with passion
        </span>
      </div>
    </footer>
  );
};

export default Footer;
