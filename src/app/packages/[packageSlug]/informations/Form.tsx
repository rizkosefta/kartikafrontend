"use client"

import React, { useEffect, useActionState } from 'react'
import Image from 'next/image'
import ArrowCircleDown from "@/assets/images/arrow-circle-down.svg"
import User from "@/assets/images/user.svg"
import Envelope from "@/assets/images/envelope.svg"
import Phone from "@/assets/images/phone.svg"
import Calendar from "@/assets/images/calendar.svg"
import Package from "@/assets/images/package.svg"
import Clock from "@/assets/images/clock.svg"
import People from "@/assets/images/people.svg"
import Truck from "@/assets/images/truck.svg"
import Tax from "@/assets/images/tax.svg"
import { TPackageDetails } from '@/components/packages/types';
import { useLocalStorage } from '@uidotdev/usehooks';
import { submitInformation } from '@/components/packages/actions'
import "@/libs/thousands";
import { useRouter } from 'next/navigation';




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


        const tax =(currentTier?.price || 0) * 0.05
        const grandTotal = (currentTier?.price || 0) + tax

        const [state, formAction] = useActionState(submitInformation, initialState)

        useEffect(() => {

            if(!!state.field && state.field !== ""){
                const element = document.getElementById(state.field)!
                element.focus()
            } else if(state.data) {
                checkoutSet(prev => ({
                    ...prev,
                    [state.data.slug] : {
                        ...prev[state.data.slug],
                        ...state.data
                    }               
                }));
                router.push(`/packages/${data.slug}/shipping?tier=${tierId}`)
            }

        },[state])

  return (
  <form action={formAction}>
    <input type="hidden" value={data.slug} name="slug"/>
    <input type="hidden" value={data.id} name="catering_package_id"/>
    <input type="hidden" value={tierId} name="catering_tier_id"/>
  <div className="flex flex-col gap-y-7 px-4">
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
            type="text"
            className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold"
            name="name"
            id="name"
            placeholder="Full Name"
            defaultValue={checkout[data.slug]?.name || ''}
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
            type="email"
            className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold"
            name="email"
            id="email"
            placeholder="Email"
            defaultValue={checkout[data.slug]?.email ||''}
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
            type="tel"
            className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold"
            name="phone"
            id="phone"
            placeholder="Phone"
            defaultValue={checkout[data.slug]?.phone || ''}
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
            type="date"
            className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold appearance-none"
            name="started_at"
            id="started_at"
            placeholder="Start At"
            defaultValue={checkout[data.slug]?.started_at || ''}
          />
          <label
            htmlFor="started_at"
            className="absolute pointer-events-none text-gray2 inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-8 peer-placeholder-shown:text-base text-sm transition-all duration-300"
            >Start At</label>
        </div>
      </div>
    </div>

    <div
      className="flex flex-col bg-white border border-gray1 rounded-2xl p-4"
    >
      <input
        type="checkbox"
        name="accordion"
        id="payment-details"
        className="peer hidden"
        defaultChecked
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
            <span className="text-sm text-gray2">Biaya service 5%</span>
            <span className="font-semibold">Rp {(tax).thousands()}</span>
          </div>
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