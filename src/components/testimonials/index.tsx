import Link from "next/link";
import React from "react";
import { getAllTestimonials } from "./actions";
import { TTestimonial } from "./types";
import Image from "next/image";
import Slider from "@/components/slider";
import Notes from "@/assets/images/notes.svg";
import People from "@/assets/images/people.svg";
import PinPoint from "@/assets/images/pinpoint.svg";


export function ContentTestimonial({data}: {data: TTestimonial}) {
 

  return (
    <div
    className="h-full rounded-3xl overflow-hidden relative border p-3 flex flex-col gap-y-3"
  >

    <p className="italic text-sm font-semibold leading-6">
      “{data.message}”
    </p>

    <div className="flex gap-x-3 items-center">
      <figure
        className="w-9 flex-none aspect-square relative rounded-full overflow-hidden"
      >
        <Image
              fill
                className="w-full h-full object-cover object-center"
                src={`${process.env.HOST_API}/storage/${data.photo}`}
                alt={data.name}
                sizes="(max-width: 768px) 100vw"
              />
      </figure>
      <span className="font-semibold">{data.name}</span>
    </div>
  </div>
  )
}

export function WrapperTestimonials({data}: {data: TTestimonial[]}) {
  return <Slider 
  spaceBetween={20} 
  hasPagination={false} 
  swiperClassName="!h-[156px] !px-4" 
  swiperSlideClassName="!w-[280px]">
    {
      data.map(item => {
        return <ContentTestimonial key={item.id} data={item}/>
      })
    }
  </Slider>
}

async function Testimonials() {
  const { data }: { data: TTestimonial[] } = await getAllTestimonials();


  if(data.length === 0) return "tidak ada data"
  return <WrapperTestimonials data={data}/>
}

export default Testimonials;