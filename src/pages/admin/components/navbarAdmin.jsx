import profile from "../../../assets/images/profile-cintya.jpeg";

const NavbarAdmin = () => {
  return (
    <nav className="xl:px-20 xl:py-5 flex items-center justify-between">
      <div>
        <span className="font-medium">Dashboard</span>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 items-center">
        <ul className="flex items-center text-base gap-6 justify-center text-[#6c6c6c]">
          <li>Project</li>
          <li>Experience</li>
          <li>Software</li>
        </ul>
      </div>

      <div className="flex items-stretch gap-2">
        <div className="flex flex-col text-sm text-right ">
          <span className="font-medium">Cintya Kusuma</span>
          <span className="text-xs text-[#6c6c6c]">cintyakusuma@gmail.com</span>
        </div>
        <div className="h-10 w-10">
          <img
            className="h-full w-full object-cover rounded-lg"
            src={profile}
            alt=""
          />
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
