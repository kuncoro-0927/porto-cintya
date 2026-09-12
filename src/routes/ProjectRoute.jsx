// import DetailProject from "../pages/DetailProject";
import { Routes, Route } from "react-router-dom";
import Header from "../sections/Header";
function ProjectRoute() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />} />
        {/* <Route path="/project/:slug" element={<DetailProject />} /> */}
      </Routes>
    </>
  );
}

export default ProjectRoute;
