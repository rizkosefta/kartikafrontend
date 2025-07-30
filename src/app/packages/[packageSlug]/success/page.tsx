import { TBookingDetails } from '@/components/packages/types';
import { checkBookingByTrxId } from '@/components/packages/actions';
import React from 'react'
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import receipt from '@/assets/images/receipt.svg';
import Link from 'next/link';

type Request = {
  params: {
    packageSlug: string;
  };
  searchParams: {
    "trx_id": string;
    phone: string;
  };
};

export async function generateMetadata(
  { searchParams }: Request,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const bookingDetails: { data: TBookingDetails } | null = await checkBookingByTrxId(
      searchParams["trx_id"],
      searchParams.phone
    );

    if (!bookingDetails || !bookingDetails.data) {
      return {
        title: `Booking Not Found`,
      };
    }

    return {
      title: `Booking Success`,
    };
  } catch (error) {
    return {
      title: `Error`,
    };
  }
}

async function BookingSuccessPage({ params, searchParams }: Request) {
  try {
    // Debug: log searchParams (hapus di production)
    // console.log('SearchParams:', searchParams);
    // console.log('trx_id:', searchParams["trx_id"]);
    // console.log('phone:', searchParams.phone);
    
    // Validasi searchParams
    if (!searchParams["trx_id"] || !searchParams.phone) {
      return (
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Parameter Tidak Lengkap</h2>
            <p className="text-gray2">Transaction ID atau nomor telepon tidak ditemukan.</p>
          </div>
        </div>
      );
    }

    const bookingDetails: { data: TBookingDetails } = await checkBookingByTrxId(
      searchParams["trx_id"],
      searchParams.phone
    );

    // Penanganan jika data booking tidak ditemukan
    if (!bookingDetails || !bookingDetails.data) {
      return (
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Booking Tidak Ditemukan</h2>
            <p className="text-gray2">Data booking tidak ditemukan atau telah dihapus.</p>
          </div>
        </div>
      );
    }

  return (
    <>
      <section className="relative">
        <figure className="w-full h-[450px] relative">
        <Image
                        fill
                            className="w-full h-full object-cover object-center"
                           src="/images/details1.jpg"
                            alt=""
                            sizes="(max-width: 768px) 100vw"
                        />
        </figure>

        <div
          className="flex left-0 right-0 gap-x-4 mx-4 bg-white shadow-[0px_12px_30px_0px_#07041517] p-4 -translate-y-1/2 rounded-3xl justify-between absolute top-full z-20"
        >
          <span className="flex flex-col gap-y-2">
            <h1 className="flex gap-x-1">
              <span className="text-color2">
                <Image src={receipt} alt="receipt" className="w-6 h-6" />
              </span>

              <span className="text-gray2 text-sm"> Booking Transaction ID </span>
            </h1>
            <span className="font-bold text-xl">{searchParams['trx_id']}</span></span>
        </div>
      </section>

      <section className="relative mt-16 flex flex-col items-center gap-y-4">
        <h2 className="font-bold text-2xl text-center">Booking Finished</h2>
        <p className="px-4 text-center text-gray2">
          Gunakan kode booking di atas untuk memeriksa status pemesanan
        </p>

        <div className="flex flex-col gap-y-4">
          <Link
            href="/orders"
            className="bg-color1 text-white rounded-full inline-flex items-center justify-center px-5 py-3"
          >
            View My Booking
          </Link>

          <Link
            href="/"
            className="bg-white border border-gray2 rounded-full inline-flex items-center justify-center px-5 py-3"
          >
            Book Other Package
          </Link>
        </div>
      </section>
    </>
  );
  } catch (error) {
    console.error('Error loading booking details:', error);
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Terjadi Kesalahan</h2>
          <p className="text-gray2">Gagal memuat data booking. Silakan coba lagi.</p>
        </div>
      </div>
    );
  }
}

export default BookingSuccessPage;