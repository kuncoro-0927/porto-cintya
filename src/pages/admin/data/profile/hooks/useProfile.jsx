/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { supabase } from "../../../../../lib/supabaseClient";
import { getProfile } from "../../../../../services/supabaseService";
import { toast } from "react-toastify";
const useProfile = () => {
  const [profile, setProfile] = useState(null);

  const [form, setForm] = useState({
    name: "",
    bio: "",
    email: "",
    phone: "",
    linkedin: "",
    instagram: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [cvFile, setCvFile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);

    try {
      const data = await getProfile();

      setProfile(data);

      if (data) {
        setForm({
          name: data.name || "",
          bio: data.bio || "",
          email: data.email || "",
          phone: data.phone || "",
          linkedin: data.linkedin || "",
          instagram: data.instagram || "",
        });

        setImagePreview(data.image_url || null);
      }
    } catch (error) {
      console.error("Error get profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 500 * 1024) {
      alert("HUAHAHA, MAX 500 KB AJAH");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleCvChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("CV harus berupa file PDF");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Ukuran CV maksimal 2 MB");
      return;
    }

    setCvFile(file);
  };

  const uploadFile = async (bucket, file) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);

    return data.publicUrl;
  };

  const saveProfile = async () => {
    setSaving(true);

    try {
      let imageUrl = profile?.image_url || null;
      let cvUrl = profile?.cv_url || null;

      if (imageFile) {
        imageUrl = await uploadFile("profile", imageFile);
      }

      if (cvFile) {
        cvUrl = await uploadFile("cv", cvFile);
      }

      const profileData = {
        name: form.name,
        bio: form.bio,
        email: form.email,
        phone: form.phone,
        linkedin: form.linkedin,
        instagram: form.instagram,
        image_url: imageUrl,
        cv_url: cvUrl,
      };

      let result;

      if (profile?.id) {
        result = await supabase
          .from("profile")
          .update(profileData)
          .eq("id", profile.id)
          .select()
          .single();
      } else {
        result = await supabase
          .from("profile")
          .insert([profileData])
          .select()
          .single();
      }

      if (result.error) {
        throw result.error;
      }

      setProfile(result.data);

      setImageFile(null);
      setCvFile(null);

      toast.success("profil udah ke simpen y, mks");
    } catch (error) {
      console.error("Error save profile:", error);
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  return {
    profile,
    form,
    loading,
    saving,

    imageFile,
    imagePreview,
    cvFile,

    handleChange,
    handleImageChange,
    handleCvChange,
    saveProfile,
    fetchProfile,
  };
};

export default useProfile;
