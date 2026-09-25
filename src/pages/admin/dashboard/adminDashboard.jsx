import { useState } from "react";
import NavbarAdmin from "../components/navbarAdmin";
import CardData from "../components/cardData";
import DataProject from "../data/projects";
import DataWorkExperiences from "../data/work-experiences";
import profile from "../../../assets/images/profile-cintya.jpeg";
import StorageUsage from "../components/storageUsage";
const Admin = () => {
  const [activeSection, setActiveSection] = useState("project");
  return (
    <div className="bg-gray-200/60 min-h-screen">
      <NavbarAdmin setActiveSection={setActiveSection} />

      <main className=" gap-6 py-10 px-4 lg:px-20">
        <section className="">
          <div className="mb-6">
            <h1 className="xl:text-3xl">Welcome Con!</h1>
            <span className="text-sm text-[#6c6c6c]">
              Lorem ipsum dolor sit amet consectetur.
            </span>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch gap-6">
            {/* kiri */}
            <div className="flex flex-col gap-6 max-w-3xl w-full">
              <div className="block lg:hidden relative flex-1 min-h-0 overflow-hidden rounded-xl">
                <img className="size-full object-cover" src={profile} alt="" />

                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                <button className="flex items-center gap-2 absolute inset-x-0 bottom-2 left-2 text-sm p-4 font-medium text-white bg-white/20 backdrop-blur-xs px-3 py-2 w-fit rounded-lg">
                  Update Profile
                  <i class="bi bi-gear-fill"></i>
                </button>
              </div>
              <div className=" flex flex-col lg:flex-row items-stretch gap-4">
                <CardData
                  title="Projects"
                  icon={
                    <i className="bi bi-folder2-open text-2xl bg-linear-to-r from-biru to-hijau bg-clip-text text-transparent"></i>
                  }
                  subtitle="4 Project"
                />
                <CardData
                  title="Work Experiences"
                  icon={
                    <i class="bi bi-briefcase text-2xl bg-linear-to-r from-biru to-hijau bg-clip-text text-transparent"></i>
                  }
                  subtitle="4 Experiences"
                />
                <CardData
                  title="Software"
                  icon={
                    <i class="bi bi-window text-2xl bg-linear-to-r from-biru to-hijau bg-clip-text text-transparent"></i>
                  }
                  subtitle="4 Software"
                />
              </div>

              <div>
                {activeSection === "project" && <DataProject />}

                {activeSection === "workExperience" && <DataWorkExperiences />}
              </div>
            </div>

            {/* kanan */}

            <div className="relative w-full">
              <div className="lg:absolute inset-0 flex flex-col gap-6">
                <div className="hidden lg:block lg:relative lg:flex-1 min-h-0 overflow-hidden rounded-xl">
                  <img
                    className="size-full object-cover"
                    src={profile}
                    alt=""
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                  <button className="flex items-center gap-2 absolute inset-x-0 bottom-2 left-2 text-sm p-4 font-medium text-white bg-white/20 backdrop-blur-xs px-3 py-2 w-fit rounded-lg">
                    Update Profile
                    <i class="bi bi-gear-fill"></i>
                  </button>
                </div>

                <div className="shrink-0">
                  <StorageUsage />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Admin;
