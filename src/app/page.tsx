import Logo from "@/assets/images/logo.jpg";
import Slider from "@/components/slider";
import Categories from "@/components/categories";
import Image from "next/image";

export default function Home() {
  return (
   <>
    <header className="flex items-center justify-between px-4">
      <span className="flex gap-x-2 items-center">
        <span className="text-color1">
          <img src={Logo.src} alt="Logo" className="h-8 w-auto" />
        </span>
        <span className="font-bold text-2xl">Katika Catering</span>
      </span>
    </header>

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

    <Categories />
  </>
  );
}