const About = () => {
  return (
    <section className="p-6 sm:p-20 lg:p-20 lg:py-40 2xl:px-40 flex flex-col lg:flex-row gap-3 items-stretch bg-gray-100 mt-20 lg:mt-0">
      <div className="flex flex-col justify-between w-full lg:max-w-sm bg-black text-white p-6 rounded-3xl shadow-2xl shadow-black">
        <div className="flex flex-col gap-3">
          <span className="font-medium text-2xl">I'm Cintya Kusuma</span>
          <p className="text-[#a6a6a6] text-base font-medium">
            Statistics graduate from Universitas Gadjah Mada with a strong
            interest in data science and programming, particularly in data
            analysis, machine learning, data visualization, and data
            engineering. I leverage various analytical, visualization, and
            design tools to transform data into meaningful insights and
            effective solutions.
          </p>
        </div>
        <button className="py-3 mt-20 lg:mt-0 rounded-2xl bg-white font-medium text-black">
          View My Experiences
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="p-3 rounded-3xl shadow-xs bg-white">
          <div className="flex justify-between items-end p-2">
            <span className="text-6xl">1+</span>
            <span className="text-[#6c6c6c]">years of experience</span>
          </div>
          <div className="flex border-b-[1.5px] border-gray-300 mx-2 my-2"></div>
          <div className="p-2 pb-10">
            <p className="text-base font-normal text-[#6c6c6c] leading-tight">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur voluptatum cupiditate expedita perspiciatis
              consequuntur nemo nihil?
            </p>
          </div>
        </div>
        <div className="p-3 rounded-3xl shadow-xs bg-white">
          <div className="flex justify-between items-end p-2">
            <span className="text-6xl">17+</span>
            <span className="text-[#6c6c6c]">achievments</span>
          </div>
          <div className="flex border-b-[1.5px] border-gray-300 mx-2 my-2"></div>
          <div className="p-2 pb-10">
            <p className="text-base font-normal text-[#6c6c6c] leading-tight">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur voluptatum cupiditate expedita perspiciatis
              consequuntur nemo nihil?
            </p>
          </div>
        </div>
        <div className="p-3 rounded-3xl shadow-xs bg-white">
          <div className="flex justify-between items-end p-2">
            <span className="text-6xl">26+</span>
            <span className="text-[#6c6c6c]">projects</span>
          </div>
          <div className="flex border-b-[1.5px] border-gray-300 mx-2 my-2"></div>
          <div className="p-2 pb-10">
            <p className="text-base font-normal text-[#6c6c6c] leading-tight">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur voluptatum cupiditate expedita perspiciatis
              consequuntur nemo nihil?
            </p>
          </div>
        </div>
        <div className="p-3 rounded-3xl shadow-xs bg-white">
          <div className="flex justify-between items-end p-2">
            <span className="text-6xl">9+</span>
            <span className="text-[#6c6c6c]">certified</span>
          </div>
          <div className="flex border-b-[1.5px] border-gray-300 mx-2 my-2"></div>
          <div className="p-2 pb-10">
            <p className="text-base font-normal text-[#6c6c6c] leading-tight">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur voluptatum cupiditate expedita perspiciatis
              consequuntur nemo nihil?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
