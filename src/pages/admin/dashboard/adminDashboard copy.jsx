/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabaseClient";

const Admin = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    category: "",
    title: "",
    slug: "",
    subtitle: "",
    year: "",
    event: "",
    description_1: "",
    description_2: "",
    software: "",
    image_url: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    checkUser();
    getProjects();
  }, []);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/admin/login");
    }
  };

  const getProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setProjects(data);
    setLoading(false);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Validasi tipe file
    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar.");
      return;
    }

    // Validasi ukuran maksimal 5 MB
    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 5 MB.");
      return;
    }

    setImageFile(file);

    // Preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const uploadImage = async () => {
    if (!imageFile) {
      return form.image_url || "";
    }

    setUploading(true);

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;

    const filePath = fileName;

    const { error: uploadError } = await supabase.storage
      .from("projects")
      .upload(filePath, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      setUploading(false);
      throw uploadError;
    }

    const { data } = supabase.storage.from("projects").getPublicUrl(filePath);

    setUploading(false);

    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUploading(true);

      // Upload image kalau ada gambar baru
      let imageUrl = form.image_url;

      if (imageFile) {
        imageUrl = await uploadImage();
      }

      const projectData = {
        category: form.category,
        title: form.title,
        slug: form.slug,
        subtitle: form.subtitle,
        year: form.year,
        event: form.event,
        description_1: form.description_1,
        description_2: form.description_2,
        software: form.software,
        image_url: imageUrl,
      };

      if (editingId) {
        const { error } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", editingId);

        if (error) {
          alert(error.message);
          return;
        }
      } else {
        const { error } = await supabase.from("projects").insert([projectData]);

        if (error) {
          alert(error.message);
          return;
        }
      }

      resetForm();
      getProjects();
    } catch (error) {
      console.error(error);
      alert(error.message || "Gagal menyimpan project.");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);

    setForm({
      category: project.category || "",
      title: project.title || "",
      slug: project.slug || "",
      subtitle: project.subtitle || "",
      year: project.year || "",
      event: project.event || "",
      description_1: project.description_1 || "",
      description_2: project.description_2 || "",
      software: project.software || "",
      image_url: project.image_url || "",
    });

    setImageFile(null);
    setImagePreview(project.image_url || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus project ini?");

    if (!confirmDelete) return;

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    getProjects();
  };

  const resetForm = () => {
    setEditingId(null);

    setForm({
      category: "",
      title: "",
      slug: "",
      subtitle: "",
      year: "",
      event: "",
      description_1: "",
      description_2: "",
      software: "",
      image_url: "",
    });

    setImageFile(null);
    setImagePreview("");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-5 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold">Project Management</h1>

          <button
            onClick={handleLogout}
            className="border border-black px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        {/* Form */}
        <div className="bg-white border rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-5">
            {editingId ? "Edit Project" : "Add Project"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Category"
              className="border rounded-lg px-4 py-3"
              required
            />

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="border rounded-lg px-4 py-3"
              required
            />

            <input
              name="slug"
              value={form.slug}
              onChange={handleChange}
              placeholder="Slug"
              className="border rounded-lg px-4 py-3"
            />

            <input
              name="subtitle"
              value={form.subtitle}
              onChange={handleChange}
              placeholder="Subtitle"
              className="border rounded-lg px-4 py-3"
            />

            <input
              name="year"
              value={form.year}
              onChange={handleChange}
              placeholder="Year"
              className="border rounded-lg px-4 py-3"
            />

            <input
              name="event"
              value={form.event}
              onChange={handleChange}
              placeholder="Event"
              className="border rounded-lg px-4 py-3"
            />

            <input
              name="software"
              value={form.software}
              onChange={handleChange}
              placeholder="Software"
              className="border rounded-lg px-4 py-3"
            />

            {/* IMAGE */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                Project Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border rounded-lg px-4 py-3"
              />

              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">Image Preview</p>

                  <div className="w-full max-w-md aspect-video border rounded-xl overflow-hidden bg-gray-100">
                    <img
                      src={imagePreview}
                      alt="Project preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            <textarea
              name="description_1"
              value={form.description_1}
              onChange={handleChange}
              placeholder="Description 1"
              className="border rounded-lg px-4 py-3 md:col-span-2"
              rows="4"
            />

            <textarea
              name="description_2"
              value={form.description_2}
              onChange={handleChange}
              placeholder="Description 2"
              className="border rounded-lg px-4 py-3 md:col-span-2"
              rows="4"
            />

            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                disabled={uploading}
                className="bg-black text-white px-6 py-3 rounded-lg disabled:opacity-50"
              >
                {uploading
                  ? "Uploading..."
                  : editingId
                    ? "Update Project"
                    : "Add Project"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-200 px-6 py-3 rounded-lg"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Project List */}
        <div className="bg-white border rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-5">Projects</h2>

          <div className="space-y-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="border rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  {project.image_url && (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-20 h-14 object-cover rounded-lg border"
                    />
                  )}

                  <div>
                    <h3 className="font-medium">{project.title}</h3>

                    <p className="text-sm text-gray-500">
                      {project.category} · {project.year}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="border px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(project.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
