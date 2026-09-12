import { useEffect, useRef, useState } from "react";
import { CiMail } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { FiHome, FiEdit3, FiBookOpen, FiUser } from "react-icons/fi";
import gsap from "gsap";
import profile from "../assets/images/profile-cintya.jpeg";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const overlayRef = useRef(null);
  const iconRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Animasi rotate icon plus jadi X
  useEffect(() => {
    gsap.to(iconRef.current, {
      rotate: menuOpen ? 45 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [menuOpen]);

  // Animasi muncul dropdown card + item-itemnya
  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
      );

      gsap.fromTo(
        menuRef.current,
        { y: -16, opacity: 0, scale: 0.96, transformOrigin: "top right" },
        { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" },
      );

      gsap.fromTo(
        itemsRef.current,
        { y: -8, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.06,
          delay: 0.1,
          ease: "power2.out",
        },
      );
    }
  }, [menuOpen]);

  const closeMenu = () => {
    gsap.to(menuRef.current, {
      y: -16,
      opacity: 0,
      scale: 0.96,
      duration: 0.2,
      ease: "power2.in",
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => setMenuOpen(false),
    });
  };

  const navLinks = [
    { href: "#about", label: "About", icon: FiUser },
    { href: "#projects", label: "Projects", icon: FiEdit3 },
    { href: "#experiences", label: "Experiences", icon: FiBookOpen },
    { href: "#contact", label: "Contact", icon: FiHome },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-50 flex w-full items-center justify-between px-4 py-3 text-sm transition-all duration-300 lg:px-10 ${
          scrolled ? " bg-white/80 backdrop-blur-lg" : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <div className="text-left flex items-center gap-3">
          <div className="bg-white p-0.5 rounded-md">
            <img
              className="w-10 h-10 object-cover rounded-md"
              src={profile}
              alt=""
            />
          </div>
          <h1 className="text-left text-base font-medium">Data Enthusiast</h1>
        </div>

        {/* Navigation desktop */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center text-base md:flex font-medium">
          <div className="flex items-center gap-7">
            <a
              href="#about"
              className="transition duration-300 hover:opacity-60"
            >
              About
            </a>
            <a
              href="#projects"
              className="transition duration-300 hover:opacity-60"
            >
              Projects
            </a>
            <a
              href="#experiences"
              className="transition duration-300 hover:opacity-60"
            >
              Experiences
            </a>
            <a
              href="#contact"
              className="transition duration-300 hover:opacity-60"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Contact desktop */}
        <div className="hidden lg:flex text-right">
          <button className="rounded-xl bg-black p-2.5 text-white transition duration-300 hover:scale-105">
            <CiMail className="text-2xl" />
          </button>
        </div>

        {/* Button menu mobile */}
        <div className="relative flex lg:hidden text-right">
          <button
            onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
            className="rounded-xl bg-black p-2.5 text-white transition duration-300 hover:scale-105"
          >
            <FaPlus ref={iconRef} className="text-xl" />
          </button>

          {/* Dropdown card menu */}
          {menuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 top-[calc(100%+12px)] mt-4 z-50 w-72 rounded-3xl bg-white p-3 shadow-2xl"
              style={{ opacity: 0 }}
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      ref={(el) => (itemsRef.current[i] = el)}
                      onClick={closeMenu}
                      className="flex items-center gap-4 rounded-2xl p-2 transition duration-300 hover:bg-gray-100"
                      style={{ opacity: 0 }}
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
                        <Icon className="text-xl" />
                      </span>
                      <span className="text-base font-medium text-black">
                        {link.label}
                      </span>
                    </a>
                  );
                })}

                <button
                  ref={(el) => (itemsRef.current[navLinks.length] = el)}
                  onClick={closeMenu}
                  style={{ opacity: 0 }}
                  className="mt-1 flex items-center justify-center gap-2 rounded-2xl bg-gray-100 p-4 text-base font-semibold text-black transition duration-300 hover:bg-gray-200"
                >
                  Email Me
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Overlay backdrop blur */}
      {menuOpen && (
        <div
          ref={overlayRef}
          onClick={closeMenu}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          style={{ opacity: 0 }}
        />
      )}
    </>
  );
};

export default Navbar;
