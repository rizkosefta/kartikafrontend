import React from 'react'
import { getCategoryDetails } from '@/components/categories/actions';
import { TCategory } from '@/components/categories/types';
import ComposeHeader from './ComposeHeader';
import Image from 'next/image';
import People from '@/assets/images/people.svg';
import "@/libs/thousands";

import { ContentNewest, ContentPopular } from '@/components/packages';
import { OpenModal } from '@/components/modal';
import { Metadata, ResolvingMetadata } from 'next';


type Request = {
  params: {
    categorySlug: string;
  }
 
};


export async function generateMetaData(
  {params}: Request, 
  parent: ResolvingMetadata
  ): Promise<Metadata>{
    const categories: { data: TCategory } = await getCategoryDetails(
      params.categorySlug
    );

    return {
      title: `category ${categories.data.name}`,
    };
}

async function PageCategoryDetails({params}: Request) {
    const { data }: { data: TCategory } = await getCategoryDetails
    (params.categorySlug);



  return <>
  <ComposeHeader />

  <section className="relative px-4 -mt-20 z-10">
        <div
          className="flex gap-y-5 flex-col bg-white shadow-[0px_12px_30px_0px_#07041517] p-3 rounded-3xl"
        >
          <div className="flex gap-x-3 items-center">
            <figure className="relative w-[100px] h-[120px] rounded-2xl overflow-hidden">
            <Image
              fill
                className="w-full h-full object-cover object-center"
                src={`${process.env.HOST_API}/storage/${data.photo}`}
                alt={data.name}
                sizes="(max-width: 768px) 100vw"
              />
            </figure>
            <span className="flex flex-col gap-y-3">
              <span className="font-semibold">{data.name}</span>

              <span className="flex gap-x-1">
                <span className="text-color2">
                  <Image src={People} alt="Notes" className="w-6 h-6" />
                </span>
                <span className="text-gray2">
                  {Number(data.catering_package_count || 0).thousands()}{""}
                  {`package${(data.catering_package_count || 0) > 1 ? "s" : ""}`}
                </span>
              </span>
            </span>
          </div>
        </div>
      </section>

      <section className="relative">
      <h2 className="font-semibold mb-4 px-4">Most People Love It</h2>

      <ContentPopular
      data={data.catering_packages.filter((item) => item.is_popular === 1)} />
      </section>

      <section className="relative">
        <h2 className="font-semibold mb-4 px-4">Fresh From Kitchen</h2>

        <ContentNewest data={data.catering_packages} withTierDetailsQuantity={false} />
        </section>

      <div className="sticky bottom-4 mt-36 px-4 z-50 flex justify-center">
        <OpenModal queries={{categorySlug: params.categorySlug,}} 
        modal="filter-category" 
        modalPosition="bottom" 
        className="bg-white border border-gray1 shadow-[0px_12px_30px_0px_#07041517] px-3 py-2 font-semibold text-sm rounded-full">
          See Filters
        </OpenModal>
      </div>
  </>
}

export default PageCategoryDetails