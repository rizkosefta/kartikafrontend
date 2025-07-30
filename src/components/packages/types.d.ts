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

export type TBookingDetails={
    
        id: number;
        name: string;
        email: string;
        phone: string;
        post_code: string;
        city: string;
        address: string;
        notes: string;
        started_at: string;
        ended_at: string;
        booking_trx_id: string;
        price: number;
        total_tax_amount: number;
        total_amount: number;
        delivery_time: string;
        quantity: number;
        duration: number;
        isPaid: 0 | 1;
        proof: string;
        cateringPackage: TPackage;
        cateringTier: TTier;
};