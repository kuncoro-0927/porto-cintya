import { FaInstagram } from "react-icons/fa";
import { AiOutlineLinkedin } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import useProfile from "../pages/admin/data/profile/hooks/useProfile";
const Contact = () => {
  const { profile } = useProfile();
  return (
    <section
      id="contact"
      className="px-6 sm:px-20 lg:px-20 py-20 lg:py-40 2xl:px-40 flex flex-col lg:flex-row lg:gap-10 items-start justify-between"
    >
      <div className="w-full lg:max-w-1/2">
        <div className="border border-amber-800 text-amber-800 rounded-full px-4 py-2 w-fit">
          Get in Touch
        </div>
        <h2 className="text-3xl lg:text-4xl font-medium lg:max-w-md mt-5 text-left">
          I’m always open to new ideas, collaborations, or a simple conversation
        </h2>
      </div>
      <div className="grid grid-cols-2 w-full lg:max-w-1/2  mt-10 lg:mt-0 gap-6">
        <a
          href={profile?.instagram || ""}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-[180px] w-full lg:max-w-[250px] 2xl:max-w-full items-center justify-center rounded-2xl bg-[#eeeeee] transition-colors duration-300 hover:bg-purple-800 cursor-pointer"
        >
          <FaInstagram className="text-5xl text-[#6c6c6c] transition-colors duration-300 group-hover:text-white" />
        </a>
        <a
          href={profile?.linkedin || ""}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-[180px] w-full lg:max-w-[250px] 2xl:max-w-full items-center justify-center rounded-2xl bg-[#eeeeee] transition-colors duration-300 hover:bg-blue-800 cursor-pointer"
        >
          <AiOutlineLinkedin className="text-5xl text-[#6c6c6c] transition-colors duration-300 group-hover:text-white" />
        </a>
        <a
          href={profile?.email ? `mailto:${profile.email}` : "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-[180px] w-full lg:max-w-[250px] 2xl:max-w-full items-center justify-center rounded-2xl bg-[#eeeeee] transition-colors duration-300 hover:bg-orange-700 cursor-pointer"
        >
          <MdOutlineEmail className="text-5xl text-[#6c6c6c] transition-colors duration-300 group-hover:text-white" />
        </a>
        <a
          href={profile?.github || ""}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-[180px] w-full lg:max-w-[250px] 2xl:max-w-full  items-center justify-center rounded-2xl bg-[#eeeeee] transition-colors duration-300 hover:bg-black cursor-pointer"
        >
          <FaGithub className="text-5xl text-[#6c6c6c] transition-colors duration-300 group-hover:text-white" />
        </a>
      </div>
    </section>
  );
};

export default Contact;
