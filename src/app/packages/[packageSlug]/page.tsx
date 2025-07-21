import React from 'react'
import { Metadata, ResolvingMetadata } from 'next';
import { TPackageDetails } from '@/components/packages/types';
import { getPackageDetails } from '@/components/packages/actions';
import ComposeHeader from './ComposeHeader';
import Slider from '@/components/slider';
import Image from 'next/image';
import Notes from "@/assets/images/notes.svg";
import People from "@/assets/images/people.svg";
import { ContentBonus } from '@/components/bonuses';
import PinPoint from "@/assets/images/pinpoint.svg";
import Truck from "@/assets/images/truck.svg";
import { ContentTestimonial } from '@/components/testimonials';
import { TTier } from '@/components/tiers/types';
import Link from 'next/link';

type Request = {
    params: {
      packageSlug: string;
    }
   
  };
export async function generateMetaData(
    {params}: Request, 
    parent: ResolvingMetadata
    ): Promise<Metadata>{
      const cateringPackages: { data: TPackageDetails } = await getPackageDetails(
        params.packageSlug
      );
  
      return {
        title: ` ${cateringPackages.data.name}`,
        description: cateringPackages.data.about,
      };
  }
async function PackageDetailsPage({params}: Request) {
    const cateringPackages: { data: TPackageDetails } = await getPackageDetails(
        params.packageSlug
      );

      const lowestTier = cateringPackages.data.tiers.length > 0 ?
      cateringPackages.data.tiers.reduce((min, low) => low.price < min.price ? low : min)
                : null
        
  return (
    <>
    <ComposeHeader />
{/* ini bagian slider */}
    <section className="relative">
    <Slider 
      spaceBetween={20} 
      hasPagination
      swiperClassName="!h-[550px] " 
      swiperSlideClassName="!w-full"
      >
        {cateringPackages.data.photos.map(item =>{
                return (<figure key={item.id} className="w-full h-full absolute">
                     <Image
                        fill
                            className="w-full h-full object-cover object-center"
                            src={`${process.env.HOST_API}/storage/${item.photo}`}
                            alt={`${item.id}`}
                            sizes="(max-width: 768px) 100vw"
                        />
                  </figure>
                );
            })}
      </Slider>

      <div
          className="flex left-0 right-0 gap-x-4 mx-4 bg-white shadow-[0px_12px_30px_0px_#07041517] p-4 -translate-y-1/2 rounded-3xl justify-between absolute top-full z-20"
        >
          <span className="flex flex-col gap-y-3">
            <h1 className="text-xl font-bold">{cateringPackages.data.name}</h1>
            <span className="flex gap-x-3">
              <span className="flex gap-x-1">
                <span className="text-color2">
                <Image src={Notes} alt="Notes" className="w-6 h-6" />
                </span>
                <span className="font-semibold text-xl">Rp. {(lowestTier?.price || 0).thousands()}</span>
              </span>

              <span className="flex gap-x-1">
                <span className="text-color2">
                <Image src={People} alt="People" className="w-6 h-6" />
                </span>
                <span className="font-semibold text-xl">{lowestTier?.quantity || 0} Pax</span>
              </span>
            </span></span>
          <span
            className="bg-color1 flex flex-col items-center justify-center px-2 gap-y-2 rounded-2xl text-white"
          >
            <span className="">4.5/5</span>
          </span>
        </div>
    </section>
{/* akhir slider */}

{/* ini bagian about */}
    <section className="relative z-10 mt-16">
        <h2 className="font-semibold px-4 mb-3">About Package</h2>
        <p className="px-4">
          {
            cateringPackages.data.about
          }
        </p>
    </section>
{/* akhir about */}

{/* ini bagian bonus */}
    <section className="relative z-10">
        <h2 className="font-semibold px-4 mb-3">All Bonuses For You</h2>
        <Slider 
        spaceBetween={20} 
        hasPagination
        swiperClassName="!h-[153px] !px-4" 
        swiperSlideClassName="!w-[190px]"
        >
        {
          cateringPackages.data.bonuses.map(bonus =>{
            return <ContentBonus data={bonus} key={bonus.id}/>
          })
        }
        </Slider>
    </section>
{/* akhir bonus */}

{/* ini bagian detail pesanan */}
    <section className="relative z-10">
        <h2 className="font-semibold px-4 mb-3">Catering Details</h2>
        <div className="grid grid-cols-2 gap-3 px-4">
          <span className="flex gap-x-3">
            <span
              className="w-[52px] aspect-square rounded-full bg-color2 text-white items-center justify-center flex"
            >
              <Image src={PinPoint} alt="PinPoint" className="w-6 h-6" />
            </span>
            <span className="flex flex-col">
              <span className="text-gray2">City</span>
              <span className="font-semibold">{cateringPackages.data.city.name}</span>
            </span>
          </span>

          <span className="flex gap-x-3">
            <span
              className="w-[52px] aspect-square rounded-full bg-color2 text-white items-center justify-center flex"
            >
              <Image src={People} alt="People" className="w-6 h-6" />
            </span>
            <span className="font-semibold text-xl">{lowestTier?.quantity || 0} Pax</span>
          </span>

          <span className="flex gap-x-3">
            <span
              className="w-[52px] aspect-square rounded-full bg-color2 text-white items-center justify-center flex"
            >
              <Image src={Notes} alt="Notes" className="w-6 h-6" />
            </span>
            <span className="flex flex-col">
              <span className="text-gray2">Category</span>
              <span className="font-semibold">{cateringPackages.data.category.name}</span>
            </span>
          </span>

          <span className="flex gap-x-3">
            <span
              className="w-[52px] aspect-square rounded-full bg-color2 text-white items-center justify-center flex"
            >
              <Image src={Truck} alt="Truck" className="w-6 h-6" />
            </span>
            <span className="flex flex-col">
              <span className="text-gray2">Delivery</span>
              <span className="font-semibold">Free 100%</span>
            </span>
          </span>
        </div>
    </section>
{/* akhir detail pesanan */}

{/* ini bagian testimonial */}
    <section className="relative">
        <h2 className="font-semibold mb-3 px-4">Most People Love It</h2>
        <Slider
        spaceBetween={20}
        hasPagination
        swiperClassName="!h-[156px] !px-4"
        swiperSlideClassName="!w-[280px]"
        >
        {
          cateringPackages.data.testimonials.map(testimonial =>{
            return <ContentTestimonial data={testimonial} key={testimonial.id}/>
          })
        }
        </Slider>
    </section>
{/* akhir testimonial */}

{/* ini bagian bottom bar */}
<div className="sticky bottom-4 px-4 z-50 mt-8">
        <div
          className="rounded-full flex justify-between gap-x-3 bg-white shadow-[0px_12px_30px_0px_#07041517] p-3 pl-6"
        >
          <span className="flex flex-col">
            <span className="font-semibold text-xl">Rp. {(lowestTier?.price || 0).thousands()}</span>
            <span className="text-gray2 text-sm">{lowestTier?.duration} days, {lowestTier?.quantity} people</span>
          </span>

        {
          !!lowestTier ?
          <Link 
          href={`/packages/${params.packageSlug}/tiers`}
          className="bg-color1 rounded-full flex items-center justify-center text-white px-5"
          >Booking Now</Link>:
          <span className="bg-gray1 rounded-full flex items-center justify-center text-gray-200 cursor-not-allowed px-5">Booking Now</span>
        }

          
        </div>
      </div>

    </>
  );
}
export default PackageDetailsPage;