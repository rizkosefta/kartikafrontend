import React from 'react'
import ComposeHeader from './ComposeHeader'
import Image from 'next/image'
import { TPackageDetails } from '@/components/packages/types';
import { getPackageDetails } from '@/components/packages/actions';
import { Metadata, ResolvingMetadata } from 'next';
import Notes from "@/assets/images/notes.svg";
import People from "@/assets/images/people.svg";
import { ContentTier } from '@/components/tiers';


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
      title: ` Select Tier | ${cateringPackages.data.name}`,
      description: cateringPackages.data.about,
    };
}

async function PackageTiersPage({params}: Request) {

  const cateringPackages: { data: TPackageDetails } = await getPackageDetails(
    params.packageSlug
  );

  const lowestTier = cateringPackages.data.tiers.length > 0 ?
  cateringPackages.data.tiers.reduce((min, low) => low.price < min.price ? low : min)
  : null

  const highestTier = cateringPackages.data.tiers.length > 0 ?
  cateringPackages.data.tiers.reduce((max, current) => current.price > max.price ? current : max)
  : null


  return (
    <>
    <ComposeHeader />
    <section className="relative px-4 -mt-20 z-10" >
        <div
          className="flex gap-x-3 bg-white shadow-[0px_12px_30px_0px_#07041517] p-3 rounded-3xl items-center"
        >
          <figure
            className="w-[100px] h-[120px] relative flex-none rounded-2xl overflow-hidden"
          >
             <Image
                        fill
                            className="w-full h-full object-cover object-center"
                            src={`${process.env.HOST_API}/storage/${cateringPackages.data.thumbnail}`}
                            alt={cateringPackages.data.name}
                            sizes="(max-width: 768px) 100vw"
                        />
          </figure>
          <span className="flex flex-col gap-y-3">
            <span className="font-semibold">{cateringPackages.data.name}</span>
            <span className="flex gap-x-1">
              <span className="text-color2">
              <Image src={Notes} alt="People" className="w-6 h-6" />
              </span>
              <span className="text-gray2">{cateringPackages.data.category.name}</span>
            </span>

            <span className="flex gap-x-1">
              <span className="text-color2">
              <Image src={People} alt="People" className="w-6 h-6" />
              </span>
              <span className="text-gray2"> {highestTier?.quantity || 0} - {lowestTier?.quantity || 0} Pax</span>
            </span>
          </span> 
        </div>
      </section>


      <section className="relative z-10 pb-10">
        <h2 className="font-semibold px-4 mb-3">Choose Your Package</h2>
        <div className="flex flex-col gap-y-4 px-4">
          {
            cateringPackages.data.tiers.map(tier => {
              return <ContentTier
              data={tier}
              key={tier.id} 
              packageSlug={params.packageSlug} 
              isPriceShown/>
            })
          }
        </div>
      </section>
    </>
  );
}

export default PackageTiersPage