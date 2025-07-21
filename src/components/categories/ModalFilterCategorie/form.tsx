"use client"

import { navigateFilterCategories } from "@/components/categories/actions";
import { TCategory } from "@/components/categories/types";
import { useFormState } from "react-dom";

type Props = {
    categorySlug: string;
    categories: TCategory[];
   

}

function FormFilterCategories({categorySlug, categories}: Props) {

    const[, formAction] = useFormState (navigateFilterCategories,{
        message: "",field: ""
    })

  return (
    <form action= {formAction} className="flex flex-col gap-y-4">
        <h6 className="text-xl font-semibold">Set Filter</h6>

        <div className="flex flex-col gap-y-4">
          <h6 className="text-sm font-semibold">Category</h6>

        {categories.map((category)=>{
            return(
            <label
            htmlFor={`${category.id}-${category.slug}`}
            className="flex gap-x-2 cursor-pointer"
          >
            <input
              type="radio"
              name="category"
              id={`${category.id}-${category.slug}`}
              className="hidden peer"
              defaultChecked={categorySlug === category.slug}
              defaultValue={category.slug}
            />
            <span
              className="radio p-1 rounded-full border border-color2 w-6 aspect-square peer-checked:[&>span]:opacity-100"
            >
              <span
                className="aspect-square h-full block rounded-full opacity-0 bg-color2 transition-all duration-300">
            </span>
            </span>
            <span className="">{category.name}</span>
          </label>
            )
        })}
        </div>

        <button type="submit" className="bg-color1 text-white px-5 py-3 rounded-full font-semibold text-center">
          View Result
        </button>

    </form>
  )
}

export default FormFilterCategories