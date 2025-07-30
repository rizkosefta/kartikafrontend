import React from 'react'
import ComposeHeader from './ComposeHeader'
import Image from 'next/image'
import { TPackageDetails } from '@/components/packages/types';
import { getPackageDetails } from '@/components/packages/actions';
import { Metadata, ResolvingMetadata } from 'next';
import Notes from "@/assets/images/notes.svg";
import People from "@/assets/images/people.svg";
import { ContentTier } from '@/components/tiers';
import { OpenModal } from '@/components/modal';
import Form from '@/app/packages/[packageSlug]/shipping/Form';


type Request = {
  params: {
    packageSlug: string;
  };
  searchParams: {
    tier: string;
  };
};
export async function generateMetaData(
  {params}: Request, 
  parent: ResolvingMetadata
  ): Promise<Metadata>{
    try {
      const cateringPackages = await getPackageDetails(params.packageSlug);

      return {
        title: `Information | ${cateringPackages.data.name}`,
        description: cateringPackages.data.about,
      };
    } catch (error) {
      return {
        title: 'Package Information',
        description: 'Package information page',
      };
    }
}

async function PackageTiersPage({params, searchParams}: Request) {

  try {
    const cateringPackages = await getPackageDetails(params.packageSlug);

    // Validasi apakah data berhasil diambil
    if (!cateringPackages || !cateringPackages.data) {
      throw new Error('Data package tidak ditemukan');
    }

    // Validasi struktur data yang diperlukan
    if (!cateringPackages.data.name || !cateringPackages.data.tiers || !Array.isArray(cateringPackages.data.tiers)) {
      throw new Error('Data package tidak lengkap');
    }

    const currentTier = cateringPackages.data.tiers.find((tier: any) => String(tier.id) === searchParams.tier);

      const lowestTier = cateringPackages.data.tiers.length > 0 ?
  cateringPackages.data.tiers.reduce((min: any, low: any) => low.price < min.price ? low : min)
  : null

  const highestTier = cateringPackages.data.tiers.length > 0 ?
  cateringPackages.data.tiers.reduce((max: any, current: any) => current.price > max.price ? current : max)
  : null


  return (
    <>
    <ComposeHeader />
    <section className="relative px-4 -mt-20 z-10" >
        <div
          className="flex gap-y-5 flex-col bg-white shadow-[0px_12px_30px_0px_#07041517] p-3 rounded-3xl">
        <div
          className="flex gap-x-3 items-center"
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

        {
          !!currentTier && (
        <div className="">
            <h2 className="font-semibold mb-3">Tier Package</h2>
            <div
              className="flex flex-col gap-y-3 h-full p-4 rounded-3xl relative border-2 border-dashed"
            >
                <span className="flex gap-x-2 items-center">
                <figure className="w-[100px] h-[80px] rounded-2xl overflow-hidden relative">
                <Image
                        fill
                            className="w-full h-full object-cover object-center"
                            src={`${process.env.HOST_API}/storage/${currentTier.photo}`}
                            alt={currentTier.name || ''}
                            sizes="(max-width: 768px) 100vw"
                        />
                </figure>
                <h3 className="font-semibold text-lg">{currentTier.name}</h3>
                <OpenModal 
                modal="tier" 
                queries={{packageSlug: params.packageSlug, tierId:searchParams.tier}} 
                className="bg-gray1 px-3 font-semibold text-sm py-1 flex rounded-full">
                  Details
                </OpenModal>
              </span>
            </div>
          </div>
        )}

        </div>
      </section>

      {cateringPackages?.data && (
      <Form  data ={cateringPackages.data} tierId={searchParams.tier}/>
    )}

    </>
  );
  } catch (error) {
    console.error('Error loading package details:', error);
    return (
      <>
        <ComposeHeader />
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Terjadi Kesalahan</h2>
            <p className="text-gray2">Gagal memuat informasi package. Silakan coba lagi.</p>
          </div>
        </div>
      </>
    );
  }
}

export default PackageTiersPage