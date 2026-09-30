import { useState, useRef, useEffect } from "react";
import CardProject from "../components/CardProject";
import logoR from "../assets/images/software/Rlogo.svg";
import logoPython from "../assets/images/software/Python-logo-notext.svg";
import logoTableau from "../assets/images/software/Tableau Icon - Colored - zonalogo.com.svg";
import logoSql from "../assets/images/software/mysql.svg";
import logoBI from "../assets/images/software/New_Power_BI_Logo.svg";
import logoExcel from "../assets/images/software/Microsoft Excel Logo - Colored - zonalogo.com.svg";
import logoPP from "../assets/images/software/Microsoft PowerPoint Logo - Colored - zonalogo.com.svg";
import useProjects from "../pages/admin/data/projects/hooks/useProjects";
import getProjectDate from "../services/projectDate";
const categories = ["Data Analysis", "Dashboard", "Infographics"];
const MOBILE_INITIAL_COUNT = 3;

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [showAllMobile, setShowAllMobile] = useState(false);

  const { projects, loading } = useProjects();

  const scrollRef = useRef(null);

  const filteredProjects = projects.filter(
    (project) => project.category === activeCategory,
  );

  const mobileProjects = showAllMobile
    ? filteredProjects
    : filteredProjects.slice(0, MOBILE_INITIAL_COUNT);

  const hasMoreMobile = filteredProjects.length > MOBILE_INITIAL_COUNT;

  const checkScroll = () => {
    const el = scrollRef.current;

    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(
      Math.ceil(el.scrollLeft + el.clientWidth) < el.scrollWidth,
    );
  };

  useEffect(() => {
    checkScroll();
  }, [activeCategory, projects]);

  const scrollToNext = () => {
    const el = scrollRef.current;

    if (!el) return;

    el.scrollBy({
      left: el.clientWidth,
      behavior: "smooth",
    });
  };

  const showNextButton = !canScrollLeft && canScrollRight;

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
        <div className="three-body">
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
        </div>
      </div>
    );
  }

  return (
    <section
      id="projects"
      className="py-20  lg:mt-0 lg:py-40 flex flex-col justify-center"
    >
      <div className="flex justify-between items-end w-full px-5 sm:px-20 lg:px-20 2xl:px-40">
        <div className="justify-start items-start flex flex-col">
          <div className="border border-amber-800 text-amber-800 rounded-full px-4 py-2 w-fit">
            Projects
          </div>
          <h2 className="text-3xl lg:text-4xl font-medium max-w-3xl mt-5 text-left">
            Explore projects that turn data into meaningful insights.
          </h2>
          <div className="flex items-center gap-3 mt-6 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setShowAllMobile(false);
                }}
                className={`flex items-center gap-2 py-3 px-5 rounded-xl font-medium shrink-0 ${
                  activeCategory === cat
                    ? "bg-black text-white hover:-translate-y-0.5 hover:shadow-md duration-300 cursor-pointer"
                    : "bg-gray-100 text-black hover:-translate-y-0.5 hover:shadow-md duration-300 cursor-pointer"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tombol next cuma ada gunanya di desktop (scroll horizontal) */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={scrollToNext}
            className={`z-40 bg-transparent text-black border border-black rounded-full h-10 w-10 transition-opacity duration-300 ${
              showNextButton ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            →
          </button>
        </div>
      </div>

      <div className="mt-12">
        {/* ===== MOBILE: list vertikal + show more ===== */}
        <div className="md:hidden px-6 sm:px-20">
          <div className="flex flex-col gap-3">
            {mobileProjects.map((project) => (
              <div key={project.id} className="w-full">
                <CardProject
                  title={project.title}
                  year={project.year}
                  software={project.software}
                  image={project.image_url || project.image}
                  slug={project.slug}
                />
              </div>
            ))}
          </div>

          {hasMoreMobile && !showAllMobile && (
            <button
              onClick={() => setShowAllMobile(true)}
              className="mt-6 w-full rounded-xl bg-gray-100 py-3 font-medium text-black transition-colors hover:bg-gray-200"
            >
              Show more
            </button>
          )}
        </div>

        {/* ===== DESKTOP: scroll horizontal semua item ===== */}
        <div className="relative mx-20 2xl:mx-40 hidden md:block">
          <div className="relative overflow-hidden">
            <div
              ref={scrollRef}
              onScroll={checkScroll}
              className="flex items-stretch gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
            >
              {[...filteredProjects]
                .sort((a, b) => getProjectDate(b.year) - getProjectDate(a.year))
                .map((project) => (
                  <div
                    key={project.id}
                    className="snap-start shrink-0 md:w-[calc((100%-1.5rem)/1.5)] lg:w-[calc((100%-1.5rem)/3)]"
                  >
                    <CardProject
                      title={project.title}
                      year={project.year}
                      software={project.software}
                      image={project.image_url || project.image}
                      slug={project.slug}
                    />
                  </div>
                ))}
            </div>

            <div
              className={`pointer-events-none absolute left-0 top-0 z-30 h-full w-24 bg-linear-to-r from-white to-transparent transition-opacity duration-300 ${
                canScrollLeft ? "opacity-100" : "opacity-0"
              }`}
            />
            <div
              className={`pointer-events-none absolute right-0 top-0 z-30 h-full w-24 bg-linear-to-l from-white to-transparent transition-opacity duration-300 ${
                canScrollRight ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
      </div>

      <div className="px-5 sm:px-20 lg:px-20 2xl:px-40 pt-10 lg:pt-20 flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-0">
        <div className="flex flex-col">
          <h2 className="text-2xl lg:text-4xl font-medium max-w-sm mt-5 mb-3 text-left">
            Supporting software for my work
          </h2>
          <span className="max-w-xs text-[#6c6c6c]">
            Software and tools I use for data analysis, visualization, and
            development.
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:flex lg:flex-wrap justify-start lg:justify-center items-stretch gap-6 max-w-xl">
          <div className="bg-[#eeeeee] flex justify-center p-6 rounded-2xl">
            <img src={logoR} className="w-14 h-auto" alt="R" />
          </div>
          <div className="bg-[#eeeeee] flex justify-center p-6 rounded-2xl">
            <img src={logoPython} className="w-14 h-auto" alt="Python" />
          </div>
          <div className="bg-[#eeeeee] flex justify-center p-6 rounded-2xl">
            <img src={logoSql} className="w-14 h-auto" alt="SQL" />
          </div>
          <div className="bg-[#eeeeee] flex justify-center p-6 rounded-2xl">
            <img src={logoTableau} className="w-14 h-auto" alt="Tableau" />
          </div>
          <div className="bg-[#eeeeee] flex justify-center p-6 rounded-2xl">
            <img src={logoBI} className="w-14 h-auto" alt="Power BI" />
          </div>
          <div className="bg-[#eeeeee] flex justify-center p-6 rounded-2xl">
            <img src={logoExcel} className="w-14 h-auto" alt="Excel" />
          </div>
          <div className="bg-[#eeeeee] flex justify-center p-6 rounded-2xl">
            <img src={logoPP} className="w-14 h-auto" alt="PowerPoint" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
