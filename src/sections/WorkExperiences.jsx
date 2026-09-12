import { FaLinkedin } from "react-icons/fa";
import CardExperience from "../components/CardExperience";
import { experiences } from "../data/dataWorkExperience";
const WorkExperiences = () => {
  return (
    <section className="p-6 lg:p-20 mt-20 lg:mt-0 py-20 lg:py-40 flex flex-col gap-10 lg:flex-row items-start justify-between bg-black text-white">
      <div className="lg:sticky lg:top-40 lg:self-start">
        <div className="border border-yellow-500 text-yellow-500 rounded-full px-4 py-2 w-fit">
          Work Experiences
        </div>
        <h2 className="text-3xl lg:text-4xl font-medium max-w-2xl mt-5 text-left">
          Lorem ipsum dolor, sit amet consectetur adipisicing.
        </h2>
        <button className="flex items-center gap-2 bg-white py-3 px-5 font-medium rounded-xl text-black mt-6">
          <FaLinkedin className="text-xl" /> Connect with me
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {experiences.map((exp, index) => (
          <CardExperience
            key={exp.id}
            item={exp}
            defaultOpen={index === 0} // Mengaktifkan item pertama saja
          />
        ))}
      </div>
    </section>
  );
};

export default WorkExperiences;
