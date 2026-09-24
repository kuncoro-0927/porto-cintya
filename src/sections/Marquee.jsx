import MarqueeAnimation from "../components/MarqueeAnimation";
import profile from "../assets/images/profile-cintya.jpeg";

const Marquee = () => {
  return (
    <section className="md:relative mx-6 sm:mx-20 md:mx-20 md:py-40 lg:py-60 mt-20 lg:mt-0 2xl:mx-40">
      {/* Area marquee - disembunyikan di mobile */}
      <div className="relative hidden overflow-hidden md:block">
        <MarqueeAnimation />

        {/* Fade kiri */}
        <div className="pointer-events-none absolute left-0 top-0 z-30 h-full w-24 bg-gradient-to-r from-white to-transparent" />

        {/* Fade kanan */}
        <div className="pointer-events-none absolute right-0 top-0 z-30 h-full w-24 bg-gradient-to-l from-white to-transparent" />
      </div>

      {/* Foto - DIAM & boleh keluar dari area marquee */}
      <div className="pointer-events-none md:absolute md:left-1/2 md:top-1/2 z-40 w-full md:w-[400px] md:-translate-x-1/2 md:-translate-y-1/2">
        <img
          src={profile}
          alt=""
          className="w-full md:h-[550px] object-cover rounded-4xl shadow-2xl"
        />
      </div>
    </section>
  );
};

export default Marquee;
