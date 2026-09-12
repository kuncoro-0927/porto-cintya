import MarqueeAnimation from "../components/MarqueeAnimation";
import profile from "../assets/images/profile-cintya.jpeg";

const Marquee = () => {
  return (
    <section className="lg:relative mx-6 lg:mx-20 lg:py-60 mt-20 lg:mt-0">
      {/* Area marquee - disembunyikan di mobile */}
      <div className="relative hidden overflow-hidden lg:block">
        <MarqueeAnimation />

        {/* Fade kiri */}
        <div className="pointer-events-none absolute left-0 top-0 z-30 h-full w-24 bg-gradient-to-r from-white to-transparent" />

        {/* Fade kanan */}
        <div className="pointer-events-none absolute right-0 top-0 z-30 h-full w-24 bg-gradient-to-l from-white to-transparent" />
      </div>

      {/* Foto - DIAM & boleh keluar dari area marquee */}
      <div className="pointer-events-none lg:absolute lg:left-1/2 lg:top-1/2 z-40 w-full lg:w-[400px] lg:-translate-x-1/2 lg:-translate-y-1/2">
        <img
          src={profile}
          alt=""
          className="w-full lg:h-[550px] object-cover rounded-4xl shadow-2xl"
        />
      </div>
    </section>
  );
};

export default Marquee;
