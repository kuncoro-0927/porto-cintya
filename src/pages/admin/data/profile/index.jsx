import useProfile from "./hooks/useProfile";
import { Link } from "react-router-dom";
const ProfileAdmin = () => {
  const {
    profile,
    form,
    loading,
    saving,
    imagePreview,
    cvFile,
    handleChange,
    handleImageChange,
    handleCvChange,
    saveProfile,
  } = useProfile();

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 backdrop-blur-sm">
        <div class="three-body">
          <div class="three-body__dot"></div>
          <div class="three-body__dot"></div>
          <div class="three-body__dot"></div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <nav className="relative text-sm 2xl:text-base xl:px-20 xl:py-5 px-4 sm:px-20 lg:px-20 2xl:px-44 py-4  border-b border-black/20">
        <Link to="/admin" className="flex items-center gap-2 font-medium">
          {" "}
          <i class="bi bi-arrow-left"></i>
          Kembali
        </Link>
      </nav>
      <main className=" gap-6 py-10 px-4 sm:px-20 lg:px-20 2xl:px-44">
        <div className="flex flex-col pb-4 ">
          <h2 className="text-xl xl:text-2xl font-medium bg-linear-to-r from-biru to-hijau bg-clip-text text-transparent">
            Profile
          </h2>
          <span className="text-[#6c6c6c] text-sm">
            edit n apdet profil buat di portofolio
          </span>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveProfile();
          }}
        >
          {/* PERSONAL */}
          <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-20 xl:gap-36 mt-6 lg:mt-10">
            <div className="flex flex-col whitespace-nowrap w-full max-w-xs">
              <span className="text-base lg:text-lg font-medium ">
                Personal
              </span>
              <span className="text-sm text-[#6c6c6c]">
                ini nama, bio n image profil
              </span>
            </div>

            <div className="flex flex-col items-start gap-3 w-full">
              <div className="flex items-center gap-3">
                {imagePreview && (
                  <div className="h-20 w-20 shrink-0">
                    <img
                      src={imagePreview}
                      alt="Profile Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-base">Profile </span>
                  <div>
                    <input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />

                    <label
                      htmlFor="profile-image"
                      className="flex items-center gap-2 px-3 w-fit py-1.5 text-sm rounded-md text-white bg-linear-to-r from-biru to-hijau hover:-translate-y-0.5 hover:shadow-md duration-300 cursor-pointer"
                    >
                      <i className="bi bi-upload"></i>
                      Update Image
                    </label>
                  </div>
                  <span className="text-sm text-[#6c6c6c]">
                    bisa jpg, jpeg, png, svg dll. emm max 500 kb aja yh
                  </span>
                </div>
              </div>

              <div className="w-full mt-6">
                {" "}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    nama
                  </label>

                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Contoh: Khitan Wilhem DiCaprio"
                    aria-describedby="name-info"
                    className="rounded-lg text-sm border w-full border-gray-300 px-4 py-3 outline-none
      focus:border-transparent
      focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,var(--color-biru),var(--color-hijau))_border-box]"
                  />

                  <p id="name-info" className="text-xs text-gray-500">
                    nama km buat di section about
                  </p>
                </div>
                <div className="flex flex-col gap-1.5 mt-6">
                  <label htmlFor="bio" className="text-sm font-medium">
                    bio
                  </label>

                  <textarea
                    name="bio"
                    placeholder="Contoh: Statistics graduate from Universitas Gadjah Mada with a strong interest in data science and programming, particularly in data analysis, machine learning, data visualization, and data engineering. I leverage various analytical, visualization, and design tools to transform data into meaningful insights and effective solutions."
                    rows="4"
                    value={form.bio}
                    onChange={handleChange}
                    aria-describedby="description-01-info"
                    className="rounded-lg text-sm border border-gray-300 px-4 py-3 outline-none
      focus:border-transparent
      focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,var(--color-biru),var(--color-hijau))_border-box]"
                  />

                  <p id="bullets-info" className="text-xs text-gray-500">
                    bio km
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SOSIAL MEDIA */}
          <div className="flex flex-col lg:flex-row  items-start gap-6 lg:gap-20 xl:gap-36 mt-10">
            <div className="flex flex-col whitespace-nowrap w-full max-w-xs ">
              <span className="text-base lg:text-lg font-medium ">
                Sosial Media
              </span>
              <span className="text-sm text-[#6c6c6c]">
                link akun linkedin n instagram
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-3 w-full">
              {" "}
              <div className="flex flex-col gap-1.5 w-full">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  email
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Contoh: khitandicaprio@gmail.com"
                  aria-describedby="email-info"
                  className="rounded-lg text-sm border w-full border-gray-300 px-4 py-3 outline-none
      focus:border-transparent
      focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,var(--color-biru),var(--color-hijau))_border-box]"
                />

                <p id="email-info" className="text-xs text-gray-500">
                  email km
                </p>
              </div>
              <div className="flex flex-col gap-1.5 w-full">
                <label
                  htmlFor="linkedin"
                  className="text-sm font-medium text-gray-700"
                >
                  linkedin
                </label>

                <input
                  id="linkedin"
                  name="linkedin"
                  value={form.linkedin}
                  onChange={handleChange}
                  placeholder="Contoh: https://www.linkedin.com/in/username"
                  aria-describedby="linkedin-info"
                  className="rounded-lg text-sm border w-full border-gray-300 px-4 py-3 outline-none
      focus:border-transparent
      focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,var(--color-biru),var(--color-hijau))_border-box]"
                />

                <p id="linkedin-info" className="text-xs text-gray-500">
                  link linkedin km
                </p>
              </div>
              <div className="flex flex-col gap-1.5 w-full">
                <label
                  htmlFor="github"
                  className="text-sm font-medium text-gray-700"
                >
                  github 
                </label>

                <input
                  id="github"
                  name="github"
                  value={form.github}
                  onChange={handleChange}
                  placeholder="Contoh: https://github.com/username"
                  aria-describedby="phone-info"
                  className="rounded-lg text-sm border w-full border-gray-300 px-4 py-3 outline-none
      focus:border-transparent
      focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,var(--color-biru),var(--color-hijau))_border-box]"
                />

                <p id="github-info" className="text-xs text-gray-500">
                  link github km
                </p>
              </div>
              <div className="flex flex-col gap-1.5 w-full">
                <label
                  htmlFor="instagram"
                  className="text-sm font-medium text-gray-700"
                >
                  instagram
                </label>

                <input
                  id="instagram"
                  name="instagram"
                  value={form.instagram}
                  onChange={handleChange}
                  placeholder="Contoh: https://www.instagram.com/username"
                  aria-describedby="instagram-info"
                  className="rounded-lg text-sm border w-full border-gray-300 px-4 py-3 outline-none
      focus:border-transparent
      focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,var(--color-biru),var(--color-hijau))_border-box]"
                />

                <p id="instagram-info" className="text-xs text-gray-500">
                  link ig km
                </p>
              </div>
            </div>
          </div>

          {/* DOKUMEN */}
          <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-20 xl:gap-36 mt-10">
            <div className="flex flex-col whitespace-nowrap w-full max-w-xs">
              <span className="text-lg font-medium ">Documents</span>

              <span className="text-sm text-[#6c6c6c]">isinya cv ajah</span>
            </div>

            <div className="flex flex-row items-start gap-3 w-ful">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">CV</label>

                <div className="flex items-center gap-3">
                  <input
                    id="cv"
                    type="file"
                    accept=".pdf"
                    onChange={handleCvChange}
                    className="hidden"
                  />

                  <label
                    htmlFor="cv"
                    className=" flex items-center gap-2 bg-linear-to-r from-biru to-hijau text-sm rounded-md text-white px-3 py-2 hover:-translate-y-0.5 hover:shadow-md duration-300 cursor-pointer"
                  >
                    <i className="bi bi-upload"></i>
                    aplod CV
                  </label>

                  {profile?.cv_url && (
                    <a
                      href={profile.cv_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm btn-gradient-border px-3 py-2 rounded-md hover:-translate-y-0.5 hover:shadow-md duration-300 cursor-pointer"
                    >
                      <span className="bg-linear-to-r from-biru to-hijau bg-clip-text text-transparent">
                        {" "}
                        liat CV
                      </span>
                    </a>
                  )}
                </div>
                <p id="instagram-info" className="text-xs text-gray-500">
                  aplod cv, max 2 mb aja yh
                </p>

                {cvFile && (
                  <span className="text-xs text-[#6c6c6c]">
                    File baru: {cvFile.name}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* BUTTON SAVE */}
          <div className="flex justify-start lg:justify-end mt-10">
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 w-full lg:w-fit text-sm rounded-lg bg-linear-to-r from-biru to-hijau text-white hover:-translate-y-0.5 hover:shadow-md duration-300 cursor-pointer"
            >
              {saving ? "nyimpen..." : "simpen"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ProfileAdmin;
