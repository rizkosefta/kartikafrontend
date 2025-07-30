import React from 'react'
import { TTier } from './types'
import Clock from "@/assets/images/clock.svg";
import Image from 'next/image'
import People from "@/assets/images/people.svg";
import Point from "@/assets/images/point.svg";
import Link from 'next/link';
import "@/libs/thousands";




export function ContentTier({
  packageSlug,
   data,
  isPriceShown 
}: 
  {packageSlug: string,
  data:TTier,
  isPriceShown?: boolean}) {
  return (
    <div
            className="flex flex-col gap-y-3 h-full p-4 rounded-3xl relative border"
          >
            <span className="flex gap-x-2 items-center">
              <figure className="w-[100px] h-[80px] rounded-2xl overflow-hidden relative">
              <Image
                        fill
                            className="w-full h-full object-cover object-center"
                            src={`${process.env.HOST_API}/storage/${data.photo}`}
                            alt={data.name}
                            sizes="(max-width: 768px) 100vw"
                        />
              </figure>
              <span className="flex flex-col">
                <h2 className="font-semibold text-lg">{data.name}</h2>
                <span className="text-gray2 text-sm">{}</span>
              </span>
            </span>

            <hr />

            <ul className="flex flex-col gap-y-4">

                {
                    data.benefits.map(benefit =>{
                        return <li className="flex gap-x-2" key={benefit.id}>
                        <span className="text-color3">
                          <Image src={Point} alt="People" className="w-6 h-6" />
                        </span>
                        <span className="font-semibold">{benefit.name}</span>
                      </li>
                    })
                }
            </ul>

{
  !!isPriceShown &&
  <>
  <hr />

<span className="flex flex-col gap-y-2">
  <span className="font-semibold text-xl">Rp {Number(data.price).thousands()}</span>
  <span className="flex gap-x-3">
    <span className="flex gap-x-1">
      <span className="text-color2">
      <Image src={Clock} alt="People" className="w-6 h-6" />
      </span>
      <span className="text-gray2">{data.duration} days</span>
    </span>

    <span className="flex gap-x-1">
      <span className="text-color2">
      <Image src={People} alt="People" className="w-6 h-6" />
      </span>
      <span className="text-gray2">{data.quantity} orang</span>
    </span>
  </span>
</span>
<hr/>
  </>
            
            
  }

            <Link href={`/packages/${packageSlug}/informations?tier=${data.id}`} 
            className="flex py-3 border border-gray1 rounded-full font-semibold justify-center hover:bg-color1 hover:text-white hover:border-transparent"
            >Choose Package</Link>

        
          </div>
  );
}