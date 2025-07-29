"use client"

import dynamic from 'next/dynamic';
import { TPackageDetails } from "@/components/packages/types";

const Form = dynamic(() => import('./Form'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center p-8">Loading form...</div>
});

type Props = {
  data: TPackageDetails | undefined;
  tierId: string;
}

export default function ClientFormWrapper({ data, tierId }: Props) {
  if (!data) {
    return <div className="flex items-center justify-center p-8">Data tidak tersedia</div>;
  }
  
  return <Form data={data} tierId={tierId} />;
} 