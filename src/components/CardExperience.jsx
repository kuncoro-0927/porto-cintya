import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const CardExperience = ({ item, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (isOpen) {
      // Animate ke height asli konten
      gsap.to(el, {
        height: "auto",
        opacity: 1,
        marginTop: 12,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        marginTop: 0,
        duration: 0.35,
        ease: "power2.inOut",
      });
    }
  }, [isOpen]);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="bg-white/15 lg:bg-none hover:bg-white/15 transition-all duration-400 rounded-3xl p-6 max-w-xl cursor-pointer"
    >
      <div className="flex items-start gap-6 justify-between">
        <div className="flex items-center gap-3">
          <img
            src={item.logo}
            className="w-14 h-14 object-contain"
            alt={item.company}
          />
          <div className="flex flex-col">
            <span className="text-base font-medium">{item.company}</span>
            <span className="text-[#999999] text-sm font-medium">
              {item.period}
            </span>
          </div>
        </div>

        <button
          className={`w-6 h-6 text-[#999999] border-2 border-[#999999] rounded-full flex items-center justify-center text-[22px] leading-none transition-transform duration-300 ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
          aria-label="Toggle details"
        >
          <span className="-mt-[2px]">+</span>
        </button>
      </div>

      <div className="mt-4">
        <span className="font-medium text-2xl">{item.role}</span>

        <div
          ref={contentRef}
          className="overflow-hidden"
          style={{
            height: defaultOpen ? "auto" : 0,
            opacity: defaultOpen ? 1 : 0,
          }}
        >
          <ul className="text-[16px] font-medium text-[#999999] leading-tight space-y-2 list-disc list-inside">
            {item.bullets?.map((bullet, index) => (
              <li key={index} className="leading-snug">
                <span className="-ml-1">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CardExperience;
