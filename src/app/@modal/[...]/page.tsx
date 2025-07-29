import { TModalPosRegistered, TModalRegistered } from '@/components/modal'
import React from 'react'
import { RouterBack, PreventScrolling } from '@/components/modal'
import ModalFilterCategorie from '@/components/categories/ModalFilterCategorie'
import ModalDetailTier from '@/components/tiers/ModalDetailTier'

type Request = {
    searchParams: {
        modal: TModalRegistered,
        'modal-pos': TModalPosRegistered,
        [key: string]: string;
    };
};

async function page ({searchParams}: Request) {
    const params = await searchParams;
    if(params.modal) {

        let modalPosition = "items-center"
        let modalWrapper = "bg-white rounded-2xl p-4 flex flex-col gap-y-5 max-w-sm relative z-20"

        if(params['modal-pos'] === "bottom") {
            modalPosition = "items-end";
            modalWrapper = "relative bg-white rounded-t-2xl p-4 flex flex-col gap-y-5 max-w-sm w-full shadow-[0px_-12px_30px_0px_#0D082245]";
        }
        return (
            <>
            <div 
            className={[
                "fixed inset-0 z-50 bg-color4/80 flex justify-center",
             modalPosition,
            ].join(" ")}
            >
            <div className={modalWrapper}>
                {
                    searchParams.modal === "filter-category" &&
                    <ModalFilterCategorie categorySlug={searchParams.categorySlug} />
                }
                {
                    searchParams.modal === "tier" &&
                    <ModalDetailTier packageSlug={searchParams.packageSlug} tierId={searchParams.tierId} />
                }
            </div>

            <RouterBack/>

            </div>

            <PreventScrolling/>
            </>
        );
}
return null
}
export default page;