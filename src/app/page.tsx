import Logo from "@/assets/images/logo.jpg";
import Slider from "@/components/slider";
import Categories from "@/components/categories";
import Image from "next/image";
import Packages from "@/components/packages";
import Testimonials from "@/components/testimonials";
import Bottombar from "@/components/bottombar";

export default function Home() {
  return (
   <>

  {/* header */}
    <header className="flex items-center justify-between px-4 pt-16" >
      <span className="flex gap-x-2 items-center">
        <span className="text-color1">
          <img src={Logo.src} alt="Logo" className="h-8 w-auto" />
        </span>
        <span className="font-bold text-2xl">Katika Catering</span>
      </span>
    </header>

  {/* promosi poster */}
    <section className="relative">
      <Slider 
      spaceBetween={20} 
      hasPagination={false} 
      swiperClassName="!h-[180px] !px-4" 
      swiperSlideClassName="!max-w-xs">
        <div className="h-full rounded-3xl overflow-hidden relative border">
          <figure className="w-full h-full absolute">
              <Image
          fill
            className="w-full h-full object-cover object-center"
            src="/images/slide1.png"
            alt="slide sale 1"
            sizes="(max-width: 768px) 100vw"
          />
          
          </figure>
          <div
            className="absolute inset-0 bg-gradient-to-r from-black to-black/0"
          ></div>
          <div
            className="absolute left-0 bottom-0 top-0 pl-4 w-32 flex flex-col justify-center font-bold"
          >
            <span className="text-white">Sale</span>
            <span className="text-color1 text-4xl">50%</span>
            <span className="text-white">Potongan</span>
          </div>

          {/* <a href="details.html" class="absolute inset-0"></a> */}
        </div>
        <div className="h-full rounded-3xl overflow-hidden relative border">
          <figure className="w-full h-full absolute">
              <Image
          fill
            className="w-full h-full object-cover object-center"
            src="/images/slide2.png"
            alt="slide sale 2"
            sizes="(max-width: 768px) 100vw"
          />
          </figure>
          <div
            className="absolute inset-0 bg-gradient-to-r from-black to-black/0"
          ></div>
          <div
            className="absolute left-0 bottom-0 top-0 pl-4 w-32 flex flex-col justify-center font-bold"
          >
            <span className="text-white">Sale</span>
            <span className="text-color1 text-4xl">50%</span>
            <span className="text-white">Potongan</span>
          </div>

          {/* <a href="details.html" class="absolute inset-0"></a> */}
        </div>
      </Slider>
    </section>

  {/* category paket */}
    <section className="relative">
      <h2 className="font-semibold mb-4 px-4">Category paket</h2>
      <Categories />
    </section>

  {/* paket yang tersedia */}
    <section className="relative">
      <h2 className="font-semibold mb-4 px-4">Paket yang Tersedia</h2>
      <Packages show="popular"/>
    </section>

  {/* testimonials */}
    <section className="relative">
      <h2 className="font-semibold mb-4 px-4">Testimonials</h2>
      <Testimonials/>
    </section>

  {/* paket terlaris */}
    <section className="relative">
      <h2 className="font-semibold mb-4 px-4">Paket paling laris</h2>
      <Packages show="newest"/>
    </section>

  {/* Bottombar */}
    <Bottombar/>
  </>
  );
}