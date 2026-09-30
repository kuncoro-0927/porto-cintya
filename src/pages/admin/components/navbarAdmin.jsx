import { useState } from "react";
import { useNavigate } from "react-router-dom";
import profile_img from "../../../assets/images/profile-cintya.jpeg";
import { Link } from "react-router-dom";
import useProfile from "../data/profile/hooks/useProfile";
import { supabase } from "../../../lib/supabaseClient";
const NavbarAdmin = ({ setActiveSection }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { profile, loading } = useProfile();
  const handleSelect = (section) => {
    setActiveSection(section);
    setMenuOpen(false);
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
      alert(error.message);
      return;
    }

    navigate("/admin/login");
  };

  return (
    <nav className="relative lg:px-20 xl:py-5 2xl:px-44 px-4 sm:px-20 py-4 flex items-center justify-between">
      <div>
        <span className="font-medium">Dashboard</span>
      </div>

      {/* Menu tengah - desktop only */}
      <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 items-center">
        <ul className="flex items-center text-base gap-6 justify-center text-[#6c6c6c]">
          <li
            onClick={() => setActiveSection("project")}
            className="hover:text-biru duration-300 cursor-pointer"
          >
            Project
          </li>
          <li
            onClick={() => setActiveSection("workExperience")}
            className="hover:text-biru duration-300 cursor-pointer"
          >
            Experience
          </li>

          <li className="hover:text-biru duration-300 cursor-pointer">
            <Link to="/admin/profile">Profile</Link>
          </li>
        </ul>
      </div>

      {/* Profile - desktop only */}
      <div className="hidden lg:flex items-stretch gap-2">
        <div className="flex flex-col text-sm text-right ">
          <span className="font-medium">Cintya Kusuma</span>
          <span className="text-xs text-[#6c6c6c]">blewah-ljubana@gmail.com</span>
        </div>
        <div
          onClick={() => setMenuOpen(!menuOpen)}
          className="h-10 w-10 cursor-pointer"
        >
          {!loading && (
            <img
              className="h-full w-full object-cover rounded-lg"
              src={profile?.image_url || profile_img}
              alt={profile?.name || ""}
            />
          )}
        </div>
      </div>

      {/* Hamburger - mobile only */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8"
      >
        <span
          className={`block h-0.5 w-6 bg-black rounded-full transition-all duration-300 ${
            menuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-black rounded-full transition-all duration-300 ${
            menuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-black rounded-full transition-all duration-300 ${
            menuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Dropdown mobile - muncul dari kanan atas */}
      {menuOpen && (
        <>
          {/* overlay buat nutup pas klik luar */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setMenuOpen(false)}
          />

          <div className="absolute top-16 right-6 lg:right-20  z-50 w-56 lg:w-fit rounded-xl bg-white shadow-lg border border-gray-100 p-4 lg:px-4 lg:py-3">
            <ul className="flex flex-col gap-3 text-sm text-[#6c6c6c]">
              <li
                onClick={() => handleSelect("project")}
                className="hover:text-biru duration-300 cursor-pointer lg:hidden"
              >
                Project
              </li>
              <li
                onClick={() => handleSelect("workExperience")}
                className="hover:text-biru duration-300 cursor-pointer lg:hidden"
              >
                Experience
              </li>

              <li
                onClick={handleLogout}
                className="hover:text-red-500 flex items-center gap-3 duration-300 cursor-pointer"
              >
                Logout
                <i class="bi bi-box-arrow-right"></i>
              </li>
            </ul>

            <div className="border-t border-gray-100 mt-3 pt-3 flex items-center gap-3 lg:hidden">
              <div className="h-10 w-10 shrink-0">
                <img
                  className="h-full w-full object-cover rounded-lg"
                  src={profile?.image_url || profile_img}
                  alt={profile?.name || ""}
                />
              </div>
              <div className="flex flex-col text-sm">
                <span className="font-medium">Cintya Kusuma</span>
                <span className="text-xs text-[#6c6c6c]">
                  blewah-ljubana@gmail.com
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default NavbarAdmin;
