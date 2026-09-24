import { FaInstagram } from "react-icons/fa";
import { AiOutlineLinkedin } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
const Contact = () => {
  return (
    <section className="px-6 sm:px-20 lg:px-20 py-20 lg:py-40 2xl:px-40 flex flex-col lg:flex-row lg:gap-10 items-start justify-between">
      <div className="w-full lg:max-w-1/2">
        <div className="border border-amber-800 text-amber-800 rounded-full px-4 py-2 w-fit">
          Get in Touch
        </div>
        <h2 className="text-4xl font-medium lg:max-w-md mt-5 text-left">
          I’m always open to new ideas, collaborations, or a simple conversation
        </h2>
      </div>
      <div className="grid grid-cols-2 w-full max-w-1/2  mt-10 lg:mt-0 gap-6">
        <div className="group flex h-[180px] w-full lg:max-w-[250px] items-center justify-center rounded-2xl bg-[#eeeeee] transition-colors duration-300 hover:bg-purple-800 cursor-pointer">
          <FaInstagram className="text-5xl text-[#6c6c6c] transition-colors duration-300 group-hover:text-white" />
        </div>
        <div className="group flex h-[180px] w-full lg:max-w-[250px] items-center justify-center rounded-2xl bg-[#eeeeee] transition-colors duration-300 hover:bg-blue-800 cursor-pointer">
          <AiOutlineLinkedin className="text-5xl text-[#6c6c6c] transition-colors duration-300 group-hover:text-white" />
        </div>
        <div className="group flex h-[180px] w-full lg:max-w-[250px] items-center justify-center rounded-2xl bg-[#eeeeee] transition-colors duration-300 hover:bg-black cursor-pointer">
          <MdOutlineEmail className="text-5xl text-[#6c6c6c] transition-colors duration-300 group-hover:text-white" />
        </div>
        <div className="group flex h-[180px] w-full lg:max-w-[250px] items-center justify-center rounded-2xl bg-[#eeeeee] transition-colors duration-300 hover:bg-green-800 cursor-pointer">
          <FaWhatsapp className="text-5xl text-[#6c6c6c] transition-colors duration-300 group-hover:text-white" />
        </div>
      </div>
    </section>
  );
};

export default Contact;
