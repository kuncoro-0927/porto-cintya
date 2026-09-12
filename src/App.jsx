import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Header from "./sections/Header";
const Marquee = lazy(() => import("./sections/Marquee"));
const About = lazy(() => import("./sections/About"));
const Projects = lazy(() => import("./sections/Projects"));
const WorkExperiences = lazy(() => import("./sections/WorkExperiences"));
const Contact = lazy(() => import("./sections/Contact"));
const Footer = lazy(() => import("./components/Footer"));
import Navbar from "./components/Navbar";
import SmoothScroll from "./components/SmoothScroll";
export default function App() {
  return (
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
    </Routes>
  );
}
