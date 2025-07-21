import { TCategory } from "@/components/categories/types";
import { TCity } from "@/components/cities/types";
import { TTier } from "@/components/tiers/types";
import { TKitchen } from "@/components/kitchen/types";
import { TTestimonial } from "../testimonials/types";
import { TBonus } from "@/components/bonuses/types";


export type TShow = "popular" | "newest";

export type TPackage = {
    "id": number;
            "name": string;
            "slug": string;
            "is_popular": 0| 1;
            "thumbnail":string;
            "about":string;
            "city": TCity;
            "category": TCategory;
            "kitchen": TKitchen;
            "tiers":TTier[];
};

export type TPackageDetails = {
photos: {
    "id": number;
    "photo": string;
    "catering_package_id": number;
    "deleted_at": string | null;
    "created_at": string;
    "updated_at": string;
}[];
bonuses:TBonus[]
testimonials:TTestimonial[]

} & TPackage;