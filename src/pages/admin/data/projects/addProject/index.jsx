import { useState } from "react";
import { supabase } from "../../../../../lib/supabaseClient";
const AddProjectModal = ({ onClose, onSuccess }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const categories = ["Data Analysis", "Dashboard", "Infographics"];
  const [form, setForm] = useState({
    category: "",
    title: "",
    subtitle: "",
    year: "",
    bullets: "",
    software: "",
    image_url: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Pilih gambar terlebih dahulu");
      return;
    }

    if (imageFile && imageFile.size > 2 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 2 MB");
      return;
    }
    setUploading(true);

    try {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("projects")
        .upload(fileName, imageFile);

      if (uploadError) {
        throw uploadError;
      }

      const slug = form.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

      const bullets = form.bullets
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

      const { data: publicUrlData } = supabase.storage
        .from("projects")
        .getPublicUrl(fileName);

      const imageUrl = publicUrlData.publicUrl;

      const { error } = await supabase.from("projects").insert([
        {
          category: form.category,
          title: form.title,
          slug: slug,
          subtitle: form.subtitle,
          year: form.year,
          bullets: bullets,
          software: form.software,
          image_url: imageUrl,
        },
      ]);

      if (error) {
        throw error;
      }

      onSuccess();
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-6 scrollbar-hide">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Tambah Project</h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-black cursor-pointer"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="category"
              className="text-sm font-medium text-gray-700"
            >
              Category
            </label>

            <div className="relative">
              <button
                type="button"
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-left text-sm flex items-center justify-between"
              >
                <span
                  className={form.category ? "text-gray-900" : "text-[#6c6c6c]"}
                >
                  {form.category || "Select Category"}
                </span>

                <span
                  className={`transition-transform ${
                    categoryOpen ? "rotate-180" : ""
                  }`}
                >
                  ↓
                </span>
              </button>

              <p id="title-info" className="text-xs mt-1.5 text-gray-500">
                ini jenis kategori project con
              </p>

              {categoryOpen && (
                <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setForm({
                          ...form,
                          category,
                        });
                        setCategoryOpen(false);
                      }}
                      className={`block w-full px-4 py-3 text-left text-sm transition-colors hover:bg-gray-100 ${
                        form.category === category
                          ? "bg-gray-50 font-medium"
                          : ""
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="title"
              className="text-sm font-medium text-gray-700"
            >
              Title
            </label>

            <input
              id="title"
              name="title"
              placeholder="Contoh: Content-Based Movie Recommendation Using TF-IDF and Cosine Similarity: An Analysis on the TMDB Dataset"
              value={form.title}
              onChange={handleChange}
              aria-describedby="title-info"
              className="rounded-lg text-sm border border-gray-300 px-4 py-3 outline-none
      focus:border-transparent
      focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,var(--color-biru),var(--color-hijau))_border-box]"
            />

            <p id="title-info" className="text-xs text-gray-500">
              kalo ini judulnya, udah gitu aja
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="title" className="text-sm font-medium">
              Subtitle
            </label>

            <input
              name="subtitle"
              placeholder="Contoh: Project of CodingCampby DBS Foundation 2025"
              value={form.subtitle}
              onChange={handleChange}
              aria-describedby="subtitle-info"
              className="rounded-lg text-sm border border-gray-300 px-4 py-3 outline-none
      focus:border-transparent
      focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,var(--color-biru),var(--color-hijau))_border-box]"
            />

            <p id="title-info" className="text-xs text-gray-500">
              yang ini subtitle, kaya.. ya subtitle aja, misal event atau apa gt
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="title" className="text-sm font-medium">
              Year
            </label>

            <input
              name="year"
              placeholder="Contoh: March 2025"
              value={form.year}
              onChange={handleChange}
              aria-describedby="year-info"
              className="rounded-lg text-sm border border-gray-300 px-4 py-3 outline-none
      focus:border-transparent
      focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,var(--color-biru),var(--color-hijau))_border-box]"
            />

            <p id="title-info" className="text-xs text-gray-500">
              ini diisi tahun doang atau sm bulan jg terserah
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="title" className="text-sm font-medium">
              Software
            </label>

            <input
              name="software"
              placeholder="Contoh: VS Code, GoogleColabs - Python"
              value={form.software}
              onChange={handleChange}
              aria-describedby="software-info"
              className="rounded-lg text-sm border border-gray-300 px-4 py-3 outline-none
      focus:border-transparent
      focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,var(--color-biru),var(--color-hijau))_border-box]"
            />

            <p id="title-info" className="text-xs text-gray-500">
              enih sofwer atau tul yg dipake apa aja
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="bullets" className="text-sm font-medium">
              Description
            </label>

            <textarea
              name="bullets"
              placeholder={`Contoh:
Description 1: Developed an interactive dashboard to report bank marketing campaign performance and customer subscription behavior, integrating key KPIs such as total clients, subscription rate, cal duration effectiveness, and demographic segmentation..
Description 2: The dashboard highlights the strongest drivers of successful term-deposit subscriptions (e.g., cal duration, contact channel, and campaign timing), supporting data-driven targeting strategies and model interpretation for the stacked ensemble prediction project.
Description 3: etc..`}
              value={form.bullets}
              onChange={handleChange}
              rows="6"
              aria-describedby="description-01-info"
              className="rounded-lg text-sm border border-gray-300 px-4 py-3 outline-none
      focus:border-transparent
      focus:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,var(--color-biru),var(--color-hijau))_border-box]"
            />

            <p id="bullets-info" className="text-xs text-gray-500">
              ini penting nih, kl deskripsi nya ada bbrp paragraf, tolong beda baris y, mks (pake
              enter! biar beda baris)
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="image"
              className="text-sm font-medium text-gray-700"
            >
              Image
            </label>

            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];

                if (!file) return;

                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
              }}
              className="rounded-lg border border-gray-300 px-4 py-3 text-sm"
            />

            <p id="title-info" className="text-xs  text-gray-500">
              nah ini yg terakhir gambar project - max 2 mb ya jgn gede"
              ukurannya
            </p>

            {imagePreview && (
              <div className="mt-2 overflow-hidden rounded-lg border border-gray-200 w-full max-w-[350px] mx-auto h-full">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="col-span-2 flex justify-end gap-3 mt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm text-[#6c6c6c] bg-gray-100 cursor-pointer hover:-translate-y-0.5 hover:shadow-md duration-300"
            >
              gjd tambah
            </button>

            <button
              type="submit"
              disabled={uploading}
              className="px-4 py-2 text-sm rounded-lg bg-linear-to-r from-biru to-hijau text-white disabled:opacity-50 cursor-pointer hover:-translate-y-0.5 hover:shadow-md duration-300"
            >
              {uploading ? "nambah..." : "tambah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;
