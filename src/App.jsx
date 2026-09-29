import { Routes, Route } from "react-router-dom";
import { Suspense, lazy, useState, useEffect } from "react";
import Header from "./sections/Header";
const Marquee = lazy(() => import("./sections/Marquee"));
const About = lazy(() => import("./sections/About"));
const Projects = lazy(() => import("./sections/Projects"));
const WorkExperiences = lazy(() => import("./sections/WorkExperiences"));
const Contact = lazy(() => import("./sections/Contact"));
const Footer = lazy(() => import("./components/Footer"));
import DetailProject from "./pages/user/detailProject";
import Navbar from "./components/Navbar";
import SmoothScroll from "./components/SmoothScroll";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// admin
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/admin/auth/loginAdmin";
import Admin from "./pages/admin/dashboard/adminDashboard";
import ProfileAdmin from "./pages/admin/data/profile";
import {
  getProfile,
  getProjects,
  getWorkExperiences,
} from "./services/supabaseService";

export default function App() {
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await Promise.all([getProfile(), getProjects(), getWorkExperiences()]);
      } catch (error) {
        console.error("App initialization error:", error);
      } finally {
        setAppLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (appLoading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 backdrop-blur-sm">
        <div className="three-body">
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {" "}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route
          path="/"
          element={
            <div className="relative z-0">
              <SmoothScroll />
              <Navbar />
              <Header />
              <main>
                <Suspense fallback={<div className="h-40" />}>
                  <Marquee />
                </Suspense>

                <Suspense fallback={<div className="h-40" />}>
                  <About />
                </Suspense>

                <Suspense fallback={<div className="h-40" />}>
                  <Projects />
                </Suspense>

                <Suspense fallback={<div className="h-40" />}>
                  <WorkExperiences />
                </Suspense>

                <Suspense fallback={<div className="h-40" />}>
                  <Contact />
                </Suspense>
              </main>

              <Suspense fallback={null}>
                <Footer />
              </Suspense>
            </div>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute>
              <ProfileAdmin />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/login" element={<Login />} />

        <Route path="/project/:slug" element={<DetailProject />} />
      </Routes>
    </>
  );
}
