import React from 'react'
import { TPackageDetails } from '../packages/types';
import { getPackageDetails } from '../packages/actions';
import { ContentTier } from '.';




type Props = {
    packageSlug: string;
    tierId: string;
}

async function ModalDetailTier({packageSlug, tierId}: Props) {

    const cateringPackages: { data: TPackageDetails } = await getPackageDetails(
        packageSlug
      );

      const currentTier = cateringPackages.data.tiers.find(
        tier => String(tier.id) === tierId
    );

    if (!currentTier)
        return <div>Tier not found</div>;


  return (
    <ContentTier packageSlug={packageSlug} data={currentTier} isPriceShown={false}/>
  )
}

export default ModalDetailTier