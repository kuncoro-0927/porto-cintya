import MarqueeModule from "react-fast-marquee";
import project1 from "../assets/images/projects/project1.png";
import project2 from "../assets/images/projects/project2.png";
import project3 from "../assets/images/projects/project3.png";
import project4 from "../assets/images/projects/project4.png";
const Marquee = MarqueeModule.default;
const MarqueeAnimation = () => {
  return (
    <Marquee speed={35} direction="left" autoFill className=" py-3">
      <div className="flex items-center gap-2 px-4">
        <img className="w-[350px] rounded-3xl" src={project1} alt="" />
        <img className="w-[350px] rounded-3xl" src={project2} alt="" />
        <img className="w-[350px] rounded-3xl" src={project3} alt="" />
        <img className="w-[350px] rounded-3xl" src={project4} alt="" />
      </div>
    </Marquee>
  );
};

export default MarqueeAnimation;
