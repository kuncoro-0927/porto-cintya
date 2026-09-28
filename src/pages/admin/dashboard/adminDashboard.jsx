import { useState, useEffect } from "react";
import { Link as ProfileLink } from "react-router-dom";
import NavbarAdmin from "../components/navbarAdmin";
import CardData from "../components/cardData";
import DataProject from "../data/projects";
import DataWorkExperiences from "../data/work-experiences";
import profile_img from "../../../assets/images/profile-cintya.jpeg";
import {
  getProfile,
  getProjects,
  getWorkExperiences,
} from "../../../services/supabaseService";
import StorageUsage from "../components/storageUsage";
const Admin = () => {
  const [activeSection, setActiveSection] = useState(
    () => localStorage.getItem("adminSection") || "project",
  );
  const [sectionLoading, setSectionLoading] = useState(false);
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalExperiences, setTotalExperiences] = useState(0);
  const handleSectionChange = (section) => {
    if (section === activeSection) return;

    setSectionLoading(true);
    setActiveSection(section);
    localStorage.setItem("adminSection", section);
  };

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      setProfile(data);
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      const [projects, experiences] = await Promise.all([
        getProjects(),
        getWorkExperiences(),
      ]);

      setTotalProjects(projects.length);
      setTotalExperiences(experiences.length);
    };

    fetchStats();
  }, []);
  return (
    <div className="bg-gray-200/60 min-h-screen">
      <NavbarAdmin setActiveSection={handleSectionChange} />

      <main className=" gap-6 py-10 px-4 sm:px-20 lg:px-20 2xl:px-44">
        <section className="">
          <div className=" mb-6">
            <h1 className="text-2xl xl:text-3xl">Welcome Con!</h1>
            <span className="text-sm text-[#6c6c6c]">
              ini dashboardnya yh, semoga hari-harimu selalu lancar
            </span>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch gap-6">
            {/* kiri */}
            <div className="flex flex-col gap-6 lg:max-w-xl xl:max-w-3xl w-full">
              <div className="block lg:hidden relative h-[400px] object-cover overflow-hidden rounded-xl">
                <img
                  className="w-full h-full object-cover"
                  src={profile?.image_url || profile_img}
                  alt={profile?.name || ""}
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                <ProfileLink
                  to="/admin/profile"
                  className="flex items-center gap-2 absolute inset-x-0 bottom-2 left-2 text-sm p-4 font-medium text-white bg-white/20 backdrop-blur-xs px-3 py-2 w-fit rounded-lg"
                >
                  Update Profile
                  <i class="bi bi-gear-fill"></i>
                </ProfileLink>
              </div>
              <div className=" flex flex-col lg:flex-row items-stretch gap-4">
                <CardData
                  title="Project"
                  icon={
                    <i className="bi bi-folder2-open text-2xl bg-linear-to-r from-biru to-hijau bg-clip-text text-transparent shrink-0"></i>
                  }
                  subtitle={
                    totalProjects !== null
                      ? `${totalProjects} Projects`
                      : "No data"
                  }
                />
                <CardData
                  title="Work Experience"
                  icon={
                    <i class="bi bi-briefcase text-2xl bg-linear-to-r from-biru to-hijau bg-clip-text text-transparent shrink-0"></i>
                  }
                  subtitle={
                    totalExperiences !== null
                      ? `${totalExperiences} Experiences`
                      : "No data"
                  }
                />
                {/* <CardData
                  title="Software"
                  icon={
                    <i class="bi bi-window text-2xl bg-linear-to-r from-biru to-hijau bg-clip-text text-transparent shrink-0"></i>
                  }
                  subtitle="4 Software Tools"
                /> */}
              </div>

              <div>
                {activeSection === "project" && (
                  <DataProject onLoadingChange={setSectionLoading} />
                )}

                {activeSection === "workExperience" && (
                  <DataWorkExperiences onLoadingChange={setSectionLoading} />
                )}
              </div>
            </div>

            {/* kanan */}

            <div className="relative w-full">
              <div className="lg:absolute inset-0 flex flex-col gap-6">
                <div className="hidden lg:block lg:relative lg:flex-1 min-h-0 overflow-hidden rounded-xl">
                  <img
                    className="w-full h-full object-cover"
                    src={profile?.image_url || profile_img}
                    alt={profile?.name || ""}
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                  <ProfileLink
                    to="/admin/profile"
                    className="flex items-center gap-2 absolute inset-x-0 bottom-2 left-2 text-sm p-4 font-medium text-white bg-white/20 backdrop-blur-xs px-3 py-2 w-fit rounded-lg hover:-translate-y-0.5 hover:shadow-md duration-300 cursor-pointer"
                  >
                    Update Profile
                    <i class="bi bi-gear-fill"></i>
                  </ProfileLink>
                </div>

                <div className="shrink-0">
                  <StorageUsage />
                </div>
              </div>
            </div>
          </div>
        </section>

        {sectionLoading && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 backdrop-blur-sm">
            <div class="three-body">
              <div class="three-body__dot"></div>
              <div class="three-body__dot"></div>
              <div class="three-body__dot"></div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
