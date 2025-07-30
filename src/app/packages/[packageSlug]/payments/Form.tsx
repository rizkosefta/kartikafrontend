"use client"

import React, { useEffect, useActionState } from 'react';
import Image from 'next/image';
import ArrowCircleDown from "@/assets/images/arrow-circle-down.svg";
import Calendar from "@/assets/images/calendar.svg";
import Package from "@/assets/images/package.svg";
import Clock from "@/assets/images/clock.svg";
import People from "@/assets/images/people.svg";
import Truck from "@/assets/images/truck.svg";
import Tax from "@/assets/images/tax.svg";
import pinpoint from "@/assets/images/pinpoint.svg";
import { TPackageDetails } from '@/components/packages/types';
import { useLocalStorage } from '@uidotdev/usehooks';
import { submitPayment } from '@/components/packages/actions';
import "@/libs/thousands";
import { useRouter } from 'next/navigation';
import {format} from "date-fns";
import Address from "@/assets/images/Address.svg";
import Postcode from "@/assets/images/postcode.svg";
import Notes from "@/assets/images/notes.svg";
import User from "@/assets/images/user.svg";
import Envelope from "@/assets/images/envelope.svg";
import Phone from "@/assets/images/phone.svg";
import BCA from "@/assets/images/logobca.svg";
import BadgeCheckmark from "@/assets/images/badgecheckmar.svg";
import Mandiri from "@/assets/images/logomandiri.svg";
import Receipt from "@/assets/images/receipt.svg";
import { toast } from 'react-toastify';

// Helper function untuk memvalidasi dan memformat tanggal
const formatDateSafely = (dateString: string | undefined, formatString: string): string => {
  if (!dateString) return "-";
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "-";
  
  try {
    return format(date, formatString);
  } catch (error) {
    console.error('Error formatting date:', error);
    return "-";
  }
};

type Props = {
    data: TPackageDetails,
    tierId: string
}

const initialState:{
    message: string,
    field: string
    data?: any
}={
    message:"",
    field:"",
}

function Form({data, tierId}: Props) {

    const[checkout, checkoutSet] = useLocalStorage<{[key: string]: any}>("checkout", {})

    const router = useRouter()

    const currentTier = data.tiers.find(
        (tier) => String(tier.id) === tierId);


        const tax =(currentTier?.price || 0) * 0.11
        const grandTotal = (currentTier?.price || 0) + tax

        const [state, formAction] = useActionState(submitPayment, initialState)

        useEffect(() => {
            if(!!state.field && state.field !== ""){
              if(state.field === "toaster"){
                toast.error(state.message);
              }else{
                const element = document.getElementById(state.field)!
                element.focus();
                element.click();
                element.scrollIntoView({
                  behavior:"smooth"
                })
              }
            } else if(state.data) {
                checkoutSet(prev => {
                  const previousData = {...prev}
                  delete previousData[state.data.slug];

                  return previousData;
                });
                router.push(`/packages/${data.slug}/success?tier=${tierId}&phone=${state.data.phone}&trx_id=${state.data.booking_trx_id}`)
            }

        },[state]);

  return (
  <form action={formAction}>
    <input type="hidden" value={data.slug} name="slug"/>
    <input type="hidden" value={data.id} name="catering_package_id"/>
    <input type="hidden" value={tierId} name="catering_tier_id"/>
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
            defaultValue={checkout[data.slug]?.name || ""}
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
            defaultValue={checkout[data.slug]?.email || ""}
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
            defaultValue={checkout[data.slug]?.phone || ""}
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
            defaultValue={checkout[data.slug]?.started_at || ""}
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
                    {formatDateSafely(checkout[data.slug]?.started_at, "dd LLLL yyyy")}
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
                    {formatDateSafely(checkout[data.slug]?.started_at, "HH:mm")}
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
                    {data.city.name}
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
                  defaultValue={checkout[data.slug]?.address || ""}
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
                  defaultValue={checkout[data.slug]?.post_code || ""}
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
                  defaultValue={checkout[data.slug]?.notes || ""}
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
            <span className="font-semibold">Rp {(currentTier?.price || 0).thousands()}</span>
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
            <span className="font-semibold">{currentTier?.duration || 0} Days</span>
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
            <span className="font-semibold">{currentTier?.quantity || 0} People</span>
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
            <span className="text-sm text-gray2">PPN 11%</span>
            <span className="font-semibold">Rp {(tax).thousands()}</span>
          </div>
        </div>
      </div>
    </div>

    <section className="relative flex flex-col gap-y-5">
            <h2 className="font-semibold">Send Payment to</h2>
            <div
              className="flex items-center gap-x-3 bg-white border border-gray1 p-4 rounded-2xl"
            >
              <Image src={BCA} alt="BCA" />

              <span className="flex flex-col">
                <span className="flex gap-x-2">
                  <h3 className="font-semibold">Euis Ika Kartika</h3>
                  <span className="text-color3">
                    <Image src={BadgeCheckmark} alt="BadgeCheckmark" />
                  </span>
                </span>
                <span className="text-sm text-gray2">7771947780</span>
              </span>
            </div>

            <div
              className="flex items-center gap-x-3 bg-white border border-gray1 p-4 rounded-2xl"
            >
              <Image src={Mandiri} alt="Mandiri" />

              <span className="flex flex-col">
                <span className="flex gap-x-2">
                  <h3 className="font-semibold">Euis Ika Kartika</h3>
                  <span className="text-color3">
                    <Image src={BadgeCheckmark} alt="BadgeCheckmark" />
                  </span>
                </span>
                <span className="text-sm text-gray2">7771947780</span>
              </span>
            </div>
          </section>

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
              <div className="flex relative">
                <span
                  className="absolute left-0 bottom-2 top-3 aspect-square flex items-center justify-center text-color2">
                    <Image src={Receipt} alt="Receipt" />
                </span>
                <input
                accept="image/*"
                  type="file"
                  className="pl-12 w-full pt-8 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold appearance-none file:hidden"
                  name="proof"
                  id="proof"
                  placeholder="Add an attachment"
                />
                <label
                  htmlFor="proof"
                  className="absolute pointer-events-none text-gray2 inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-6 peer-placeholder-shown:text-base text-sm transition-all duration-300"
                  >Add an attachment</label>
              </div>
            </div>
          </div>

    <div className="sticky bottom-4 z-50 mb-8">
      <div
        className="rounded-full flex justify-between gap-x-3 bg-white shadow-[0px_12px_30px_0px_#07041517] p-3 pl-6"
      >
        <span className="flex flex-col">
          <span className="text-gray2 text-sm">Grand Total</span>
          <span className="font-semibold text-xl">Rp {(grandTotal).thousands()}</span>
        </span>
        <button
          type="submit"
          className="bg-color1 rounded-full flex items-center justify-center text-white px-5"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
</form>
);
}

export default Form