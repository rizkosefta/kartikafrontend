 "use client"

import Receipt from "@/assets/images/receipt.svg"
import Phone from "@/assets/images/phone.svg"
import Image from "next/image"
import { useActionState } from "react"
import { navigateOrdersByTrxId } from "@/components/packages/actions"

const initialState:{
    message: string,
    status: 400 | 200,
    field: string,
    data?: any
} = {
    message:"",
    field:"",
    status: 200,
}

function Form() {

    const [state, formAction] = useActionState(navigateOrdersByTrxId, initialState)

  return (
    <form action={formAction}>
        <section
          className="relative flex flex-col items-center gap-y-4 w-full px-4">
          <h2 className="font-bold text-2xl text-center">View Your Order</h2>

          <div className="flex relative w-full">
            <span
              className="absolute left-0 bottom-2 top-3 aspect-square flex items-center justify-center text-color2">
               <Image src={Phone} alt="People" className="w-6 h-6" />
            </span>
            <input
              type="tel"
              className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold"
              name="phone"
              id="phone"
              placeholder="Phone"/>
            <label
              htmlFor="phone"
              className="absolute pointer-events-none text-gray2 inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-8 peer-placeholder-shown:text-base text-sm transition-all duration-300"
              >Phone</label>
          </div>

          <div className="flex relative w-full">
            <span
              className="absolute left-0 bottom-2 top-3 aspect-square flex items-center justify-center text-color2">
               <Image src={Receipt} alt="Receipt" className="w-6 h-6"/>
            </span>
            <input
              type="text"
              className="pl-12 w-full pt-4 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold"
              name="booking_trx_id"
              id="booking_trx_id"
              placeholder="booking_trx_id"/>
            <label
              htmlFor="booking_trx_id"
              className="absolute pointer-events-none text-gray2 inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-8 peer-placeholder-shown:text-base text-sm transition-all duration-300"
              >Booking Transaction ID</label>
          </div>

          <div className="flex w-full">
            <button
              type="submit"
              className="bg-color1 text-white rounded-full inline-flex items-center justify-center px-5 py-3 w-full">
              Find My Order
            </button>
          </div>
        </section>
      </form>
  )
}

export default Form