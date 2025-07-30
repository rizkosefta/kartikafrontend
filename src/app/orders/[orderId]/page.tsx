import React from 'react';
import ComposeHeader from './ComposeHeader';
import Image from 'next/image';
import Notes from "@/assets/images/notes.svg"
import People from "@/assets/images/people.svg"
import { checkBookingByTrxId } from '@/components/packages/actions';
import { TBookingDetails } from '@/components/packages/types';
import { OpenModal } from '@/components/modal';
import receipt from "@/assets/images/receipt.svg"
import ArrowCircleDown from "@/assets/images/arrow-circle-down.svg";
import Calendar from "@/assets/images/calendar.svg";
import Package from "@/assets/images/package.svg";
import Clock from "@/assets/images/clock.svg";
import Truck from "@/assets/images/truck.svg";
import Tax from "@/assets/images/tax.svg";
import pinpoint from "@/assets/images/pinpoint.svg";
import {format} from "date-fns";
import User from "@/assets/images/user.svg";
import Envelope from "@/assets/images/envelope.svg";
import Phone from "@/assets/images/phone.svg";
import Address from "@/assets/images/Address.svg";
import Postcode from "@/assets/images/postcode.svg";
import BCA from "@/assets/images/logobca.svg";
import BadgeCheckmark from "@/assets/images/badgecheckmar.svg";
import Mandiri from "@/assets/images/logomandiri.svg";
import Receipt from "@/assets/images/receipt.svg";      

type Request = {
  params: {
    orderId: string;
  };
  searchParams: {
    phone: string;
    [key: string]: string;
  };
};

        async function OrdersFoundPage({ params, searchParams }: Request){
         const bookingDetails: { data: TBookingDetails } = await checkBookingByTrxId(
        params.orderId,
        searchParams.phone
      );
    
   return (
    <>
    <ComposeHeader/>

    <section className="relative px-4 -mt-20 z-10" >
        <div
          className="flex gap-y-5 flex-col bg-white shadow-[0px_12px_30px_0px_#07041517] p-3 rounded-3xl">
{
    bookingDetails.data.isPaid === 0 &&
            <span className="bg-color5 flex gap-x-3 p-3 rounded-2xl items-center">
            <span className="">
              <Image src={receipt} alt="Status Pembayaran" />
            </span>
            <span className="flex flex-col">
              <span className="text-sm">Status Pembayaran</span>
              <span className="font-semibold">Terpending</span>
            </span>
          </span>
}

{
    bookingDetails.data.isPaid === 1 &&
          <span
            className="bg-color3 text-white flex gap-x-3 p-3 rounded-2xl items-center"
          >
            <span className="">
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M7.29079 21.3416C8.17913 20.3883 9.53329 20.4641 10.3133 21.5041L11.4075 22.9666C12.285 24.1258 13.7041 24.1258 14.5816 22.9666L15.6758 21.5041C16.4558 20.4641 17.81 20.3883 18.6983 21.3416C20.6266 23.4 22.1975 22.7175 22.1975 19.8358V7.62663C22.2083 3.26079 21.19 2.16663 17.095 2.16663H8.90496C4.80996 2.16663 3.79163 3.26079 3.79163 7.62663V19.825C3.79163 22.7175 5.37329 23.3891 7.29079 21.3416Z"
                  className="fill-current"
                />
                <path
                  d="M17.5825 12.7291H11.6241C11.18 12.7291 10.8116 12.3608 10.8116 11.9166C10.8116 11.4725 11.18 11.1041 11.6241 11.1041H17.5825C18.0266 11.1041 18.395 11.4725 18.395 11.9166C18.395 12.3608 18.0266 12.7291 17.5825 12.7291Z"
                  className="fill-current"
                />
                <path
                  d="M17.5825 8.39587H11.6241C11.18 8.39587 10.8116 8.02754 10.8116 7.58337C10.8116 7.13921 11.18 6.77087 11.6241 6.77087H17.5825C18.0266 6.77087 18.395 7.13921 18.395 7.58337C18.395 8.02754 18.0266 8.39587 17.5825 8.39587Z"
                  className="fill-current"
                />
                <path
                  d="M8.4283 8.66667C7.83247 8.66667 7.34497 8.17917 7.34497 7.58333C7.34497 6.9875 7.83247 6.5 8.4283 6.5C9.02414 6.5 9.51164 6.9875 9.51164 7.58333C9.51164 8.17917 9.02414 8.66667 8.4283 8.66667Z"
                  className="fill-current"
                />
                <path
                  d="M8.4283 13C7.83247 13 7.34497 12.5125 7.34497 11.9167C7.34497 11.3209 7.83247 10.8334 8.4283 10.8334C9.02414 10.8334 9.51164 11.3209 9.51164 11.9167C9.51164 12.5125 9.02414 13 8.4283 13Z"
                  className="fill-current"
                />
              </svg>
            </span>
            <span className="flex flex-col">
              <span className="text-sm">Status Pembayaran</span>
              <span className="font-semibold">Sukses Terbayar & Siap Antar</span>
            </span>
          </span>
}

        <div
          className="flex gap-x-3 items-center"
        >
          <figure
            className="w-[100px] h-[120px] relative flex-none rounded-2xl overflow-hidden"
          >
             <Image
                        fill
                            className="w-full h-full object-cover object-center"
                            src={`${process.env.HOST_API}/storage/${bookingDetails.data.cateringPackage.thumbnail}`}
                            alt={bookingDetails.data.cateringPackage.name}
                            sizes="(max-width: 768px) 100vw"
                        />
          </figure>
          <span className="flex flex-col gap-y-3">
                         <span className="font-semibold">{bookingDetails.data.cateringPackage.name}</span>
             <span className="flex gap-x-1">
               <span className="text-color2">
               <Image src={Notes} alt="People" className="w-6 h-6" />
               </span>
               <span className="text-gray2">{bookingDetails.data.cateringPackage.category.name}</span>
            </span>

            <span className="flex gap-x-1">
              <span className="text-color2">
              <Image src={People} alt="People" className="w-6 h-6" />
              </span>
                             <span className="text-gray2"> {bookingDetails.data.quantity} Pax</span>
            </span>
          </span> 
        </div>

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
                              src={`${process.env.HOST_API}/storage/${bookingDetails.data.cateringPackage.thumbnail}`}
                              alt={bookingDetails.data.cateringPackage.name || ''}
                              sizes="(max-width: 768px) 100vw"
                          />
                  </figure>
                  <h3 className="font-semibold text-lg">{bookingDetails.data.cateringPackage.name}</h3>
                  <OpenModal 
                  modal="tier" 
                  queries={{
                     packageSlug: bookingDetails.data.cateringPackage.slug,
                     tierId:String(bookingDetails.data.cateringPackage.id),
                 }} 
                  className="bg-gray1 px-3 font-semibold text-sm py-1 flex rounded-full">
                    Details
                  </OpenModal>
                </span>
              </div>
        </div>
         

        </div>
      </section>

      <div className="flex flex-col gap-y-7 px-4">
{/* customer information */}
    <div
      className="flex flex-col bg-white border border-gray1 rounded-2xl p-4"
    >
      <input
        type="checkbox"
        name="accordion"
        id="customer-information"
        className="peer hidden"
        defaultChecked
        
      /><label
        htmlFor="customer-information"
        className="flex justify-between items-center cursor-pointer [--state-rotate:0deg] peer-checked:[--state-rotate:180deg]"
      >
        <h6 className="text-xl font-bold">Customer Information</h6>
        <span
          className="text-color2 flex items-center justify-center transition-all duration-300 [rotate:var(--state-rotate)] bg-white border rounded-full p-2"
        >
          <Image src={ArrowCircleDown} alt="Arrow" />
        </span>
      </label>
      <div
        className="flex flex-col gap-y-5 max-h-0 overflow-hidden transition-all duration-300 h-full peer-checked:mt-5 peer-checked:max-h-screen"
      >
        <div className="flex relative">
          <span
            className="absolute left-0 bottom-2 top-3 aspect-square flex items-center justify-center text-color2">
                <Image src={User} alt="User" />
          </span>
          <input
          readOnly
            type="text"
            className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold"
            name="name"
            id="name"
            placeholder="Full Name"
            defaultValue={bookingDetails.data.name}
          />
          <label
            htmlFor="name"
            className="absolute pointer-events-none text-gray2 inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-8 peer-placeholder-shown:text-base text-sm transition-all duration-300"
            >Full Name</label>
        </div>

        <div className="flex relative">
          <span
            className="absolute left-0 bottom-2 top-3 aspect-square flex items-center justify-center text-color2"
          >
            <Image src={Envelope} alt="Mail" />
          </span>
          <input
          readOnly
            type="email"
            className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold"
            name="email"
            id="email"
            placeholder="Email"
            defaultValue={bookingDetails.data.email}
          />
          <label
            htmlFor="email"
            className="absolute pointer-events-none text-gray2 inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-8 peer-placeholder-shown:text-base text-sm transition-all duration-300"
            >Email</label>
        </div>

        <div className="flex relative">
          <span
            className="absolute left-0 bottom-2 top-3 aspect-square flex items-center justify-center text-color2">
                <Image src={Phone} alt="Phone" />
          </span>
          <input
          readOnly
            type="tel"
            className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold"
            name="phone"
            id="phone"
            placeholder="Phone"
            defaultValue={bookingDetails.data.phone}
          />
          <label
            htmlFor="phone"
            className="absolute pointer-events-none text-gray2 inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-8 peer-placeholder-shown:text-base text-sm transition-all duration-300"
            >Phone</label>
        </div>

        <div className="flex relative">
          <span
            className="absolute left-0 bottom-2 top-3 aspect-square flex items-center justify-center text-color2">
                <Image src={Calendar} alt="Calendar" />
          </span>
          <input
          readOnly
            type="date"
            className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold appearance-none"
            name="started_at"
            id="started_at"
            placeholder="Start At"
            defaultValue={bookingDetails.data.started_at}
          />
          <label
            htmlFor="started_at"
            className="absolute pointer-events-none text-gray2 inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-8 peer-placeholder-shown:text-base text-sm transition-all duration-300"
            >Start At</label>
        </div>
      </div>
    </div>

    {/* shipping address */}
    <div
      className="flex flex-col bg-white border border-gray1 rounded-2xl p-4"
    >
      <input
        type="checkbox"
        name="accordion"
        id="shipping-address"
        className="peer hidden"
        defaultChecked
      /><label
        htmlFor="shipping-address"
        className="flex justify-between items-center cursor-pointer [--state-rotate:0deg] peer-checked:[--state-rotate:180deg]"
      >
        <h6 className="text-xl font-bold">Shipping Address</h6>
        <span
          className="text-color2 flex items-center justify-center transition-all duration-300 [rotate:var(--state-rotate)] bg-white border rounded-full p-2"
        >
          <Image src={ArrowCircleDown} alt="Arrow" />
        </span>
      </label>
      <div
        className="flex flex-col gap-y-5 max-h-0 overflow-hidden transition-all duration-300 h-full peer-checked:mt-5 peer-checked:max-h-screen">
      {/*tanggal mulai */}
      <div className="flex relative">
                <span
                  className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                    <Image src={Calendar} alt="Calendar" />
                </span>
                <div
                  className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3"
                >
                  <span className="text-sm text-gray2">Started At</span>
                  <span className="font-semibold">
                    {format(bookingDetails.data.started_at, "dd LLLL yyyy")}
                  </span>
                </div>
      </div>
      {/*tanggal selesai */}
      {/*jam mulai */}
      <div className="flex relative">
                <span
                  className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                    <Image src={Clock} alt="Clock" />
                </span>
                <div
                  className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3">
                  <span className="text-sm text-gray2">Time</span>
                  <span className="font-semibold">
                    {format(bookingDetails.data.started_at, "HH:mm")}
                  </span>
                </div>
      </div>
      {/*tanggal selesai */}
      {/*kota */}
      <div className="flex relative">
                <span
                  className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                  <Image src={pinpoint} alt="Location" />
                </span>
                <div
                  className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3"
                >
                  <span className="text-sm text-gray2">City</span>
                  <span className="font-semibold">
                    {bookingDetails.data.city}
                  </span>
                </div>
      </div>
      {/* kota selesai */}


      <div className="flex relative">
                <span
                  className="absolute left-4 top-5 aspect-square flex items-center justify-center text-color2">
                    <Image src={Address} alt="Address" />
                </span>
                <textarea
                readOnly
                  className="pl-12 w-full pt-7 pr-4 border border-light3 focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-6 font-semibold"
                  name="address"
                  id="address"
                  rows={3}
                  placeholder="Address"
                  defaultValue={bookingDetails.data.address}
                  ></textarea>
                <label
                  htmlFor="address"
                  className="absolute pointer-events-none text-gray2 flex items-center ml-12 peer-placeholder-shown:top-5 top-3 peer-placeholder-shown:text-base text-sm transition-all duration-300"
                  >Address</label>
      </div>

      <div className="flex relative">
                <span
                  className="absolute left-0 bottom-2 top-3 aspect-square flex items-center justify-center text-color2"
                >
                  <Image src={Postcode} alt="Postcode" />
                </span>
                <input
                  readOnly
                  type="text"
                  className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold"
                  name="post_code"
                  id="post_code"
                  placeholder="Post code"
                  defaultValue={bookingDetails.data.post_code}
                />
                <label
                  htmlFor="post_code"
                  className="absolute pointer-events-none text-gray2 inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-8 peer-placeholder-shown:text-base text-sm transition-all duration-300"
                  >Post code</label>
      </div>

      <div className="flex relative">
                <span
                  className="absolute left-4 top-5 aspect-square flex items-center justify-center text-color2">
                  <Image src={Notes} alt="Notes" />
                </span>
                <textarea
                readOnly
                  className="pl-12 w-full pt-7 pr-4 border border-light3 focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-6 font-semibold"
                  name="notes"
                  id="notes"
                  rows={3}
                  placeholder="Notes"
                  defaultValue={bookingDetails.data.notes}
                ></textarea>
                <label
                  htmlFor="notes"
                  className="absolute pointer-events-none text-gray2 flex items-center ml-12 peer-placeholder-shown:top-5 top-3 peer-placeholder-shown:text-base text-sm transition-all duration-300"
                  >Notes</label>
      </div>


      </div>
    </div>

    {/* payment details */}
    <div
      className="flex flex-col bg-white border border-gray1 rounded-2xl p-4"
    >
      <input
        type="checkbox"
        name="accordion"
        id="payment-details"
        className="peer hidden"
        
      /><label
        htmlFor="payment-details"
        className="flex justify-between items-center cursor-pointer [--state-rotate:0deg] peer-checked:[--state-rotate:180deg]"
      >
        <h6 className="text-xl font-bold">Payment Details</h6>
        <span
          className="text-color2 flex items-center justify-center transition-all duration-300 [rotate:var(--state-rotate)] bg-white border rounded-full p-2"
        >
         <Image src={ArrowCircleDown} alt="Arrow" />
        </span>
      </label>
      <div
        className="flex flex-col gap-y-5 max-h-0 overflow-hidden transition-all duration-300 h-full peer-checked:mt-5 peer-checked:max-h-screen"
      >
        <div className="flex relative">
          <span
            className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                <Image src={Package} alt="Package" />
          </span>
          <div
            className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3"
          >
            <span className="text-sm text-gray2">Paket Catering</span>
            <span className="font-semibold">Rp {(bookingDetails.data.price || 0).thousands()}</span>
          </div>
        </div>

        <div className="flex relative">
          <span
            className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
               <Image src={Clock} alt="Clock" />
          </span>
          <div
            className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3"
          >
            <span className="text-sm text-gray2">Duration</span>
            <span className="font-semibold">{bookingDetails.data.duration || 0} Days</span>
          </div>
        </div>

        <div className="flex relative">
          <span
            className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                <Image src={People} alt="People" />
          </span>
          <div
            className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3"
          >
            <span className="text-sm text-gray2">Quantity</span>
            <span className="font-semibold">{bookingDetails.data.quantity || 0} People</span>
          </div>
        </div>

        <div className="flex relative">
          <span
            className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                <Image src={Truck} alt="Truck" />
          </span>
          <div
            className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3"
          >
            <span className="text-sm text-gray2">Delivery</span>
            <span className="font-semibold">Rp 0 (Free)</span>
          </div>
        </div>

        <div className="flex relative">
          <span
            className="absolute left-0 bottom-2 top-2 aspect-square flex items-center justify-center text-color2">
                <Image src={Tax} alt="Tax" />
          </span>
          <div
            className="pl-12 flex flex-col w-full justify-center pr-4 h-[69px] rounded-2xl bg-gray3"
          >
            <span className="text-sm text-gray2">Biaya service 5%</span>
            <span className="font-semibold">Rp {(bookingDetails.data.total_tax_amount || 0).thousands()}</span>
          </div>
        </div>
      </div>
    </div>

          <div
            className="flex flex-col bg-white border border-gray1 rounded-2xl p-4"
          >
            <input
              type="checkbox"
              name="accordion"
              id="proof-payment"
              className="peer hidden"
              defaultChecked
            /><label
              htmlFor="proof-payment"
              className="flex justify-between items-center cursor-pointer [--state-rotate:0deg] peer-checked:[--state-rotate:180deg]"
            >
              <h6 className="text-xl font-bold">Upload Proof of Payment</h6>
              <span
                className="text-color2 flex items-center justify-center transition-all duration-300 [rotate:var(--state-rotate)] bg-white border rounded-full p-2"
              >
               <Image src={ArrowCircleDown} alt="Arrow" />
              </span>
            </label>
            <div
              className="flex flex-col gap-y-5 max-h-0 overflow-hidden transition-all duration-300 h-full peer-checked:mt-5 peer-checked:max-h-screen"
            >
              <span
              className="relative w-[390px] aspect-video rounded-2xl overflow-hidden"
            >
              <Image
                        fill
                            className="w-full h-full object-cover object-center"
                            src={`${process.env.HOST_API}/storage/${bookingDetails.data.proof}`}
                            alt={bookingDetails.data.name}
                            sizes="(max-width: 768px) 100vw"
                        />
            </span>
            </div>
          </div>

                     <div className="sticky bottom-4 z-50 mb-8">
           <a
           href={`https://wa.me/628977871757?text=Halo, saya ingin bertanya tentang pesanan saya dengan ID: ${bookingDetails.data.booking_trx_id}`}
           target="_blank"
           rel="noopener noreferrer"
           className="bg-color1 text-white rounded-full flex items-center justify-center px-5 w-full py-3">
           Contact customer service
         </a>

     </div>
  </div>
    </>
  );
}

export default OrdersFoundPage;