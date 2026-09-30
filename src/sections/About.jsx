import useProfile from "../pages/admin/data/profile/hooks/useProfile";
import useProjects from "../pages/admin/data/projects/hooks/useProjects";
import useWorkExperiences from "../pages/admin/data/work-experiences/hooks/useWorkExperiences";
const About = () => {
  const { profile, loading } = useProfile();
  const { workExperiences } = useWorkExperiences();
  const { projects } = useProjects();

  const calculateExperienceYears = (experiences) => {
    let totalMonths = 0;

    experiences.forEach((experience) => {
      if (!experience.start_date) return;

      const start = new Date(experience.start_date);
      const end = experience.end_date
        ? new Date(experience.end_date)
        : new Date();

      const months =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth()) +
        1;

      totalMonths += months;
    });

    return Math.floor(totalMonths / 12);
  };

  const experienceYears = calculateExperienceYears(workExperiences);

  return (
    <section
      id="about"
      className="p-6 py-20 sm:p-20 lg:p-20 lg:py-40 2xl:px-40 flex flex-col lg:flex-row gap-3 items-stretch bg-gray-100 mt-20 lg:mt-0"
    >
      <div className="flex flex-col justify-between w-full lg:max-w-sm bg-black text-white p-6 rounded-3xl shadow-2xl shadow-black">
        <div className="flex flex-col gap-3">
          {!loading && (
            <span className="font-medium text-2xl">
              I'm {profile?.name || "Cintya Kusuma"}
            </span>
          )}

          {!loading && (
            <p className="text-[#a6a6a6] text-base font-medium">
              {profile?.bio ||
                "Statistics graduate from Universitas Gadjah Mada with a strong interest in data science and programming, particularly in data analysis, machine learning, data visualization, and data engineering. I leverage various analytical, visualization, and design tools to transform data into meaningful insights and effective solutions."}
            </p>
          )}
        </div>
        <a href="#work-experiences" className="py-3 mt-20 lg:mt-0 rounded-2xl flex justify-center items-center bg-white font-medium text-black hover:-translate-y-0.5 hover:shadow-md cursor-pointer duration-300">
          View My Experiences
        </a>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="p-3 rounded-3xl shadow-xs bg-white">
          <div className="flex justify-between items-end p-2">
            {!loading && (
              <span className="text-6xl">{experienceYears || "1"}+</span>
            )}

            <span className="text-[#6c6c6c]">Years of Experience</span>
          </div>
          <div className="flex border-b-[1.5px] border-gray-300 mx-2 my-2"></div>
          <div className="p-2 pb-10">
            <p className="text-base font-normal text-[#6c6c6c] leading-tight">
              Experience gained through internships, academic projects, and
              professional work in data and technology.
            </p>
          </div>
        </div>
        <div className="p-3 rounded-3xl shadow-xs bg-white">
          <div className="flex justify-between items-end p-2">
            <span className="text-6xl">17+</span>
            <span className="text-[#6c6c6c]">Achievments</span>
          </div>
          <div className="flex border-b-[1.5px] border-gray-300 mx-2 my-2"></div>
          <div className="p-2 pb-10">
            <p className="text-base font-normal text-[#6c6c6c] leading-tight">
              Recognitions and accomplishments from academic, professional, and
              extracurricular experiences.
            </p>
          </div>
        </div>
        <div className="p-3 rounded-3xl shadow-xs bg-white">
          <div className="flex justify-between items-end p-2">
            {!loading && (
              <span className="text-6xl"> {projects?.length || 8}+</span>
            )}

            <span className="text-[#6c6c6c]">Projects</span>
          </div>
          <div className="flex border-b-[1.5px] border-gray-300 mx-2 my-2"></div>
          <div className="p-2 pb-10">
            <p className="text-base font-normal text-[#6c6c6c] leading-tight">
              Data analysis, visualization, machine learning, and programming
              projects developed through various experiences.
            </p>
          </div>
        </div>
        <div className="p-3 rounded-3xl shadow-xs bg-white">
          <div className="flex justify-between items-end p-2">
            <span className="text-6xl">9+</span>
            <span className="text-[#6c6c6c]">Certificates</span>
          </div>
          <div className="flex border-b-[1.5px] border-gray-300 mx-2 my-2"></div>
          <div className="p-2 pb-10">
            <p className="text-base font-normal text-[#6c6c6c] leading-tight">
              Courses and certifications completed to strengthen technical and
              analytical skills.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
