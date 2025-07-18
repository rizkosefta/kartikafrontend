import { TCategory } from "@/components/categories/types";
import { TCity } from "@/components/cities/types";
import { TTier } from "@/components/tiers/types";
import { TKitchen } from "@/components/kitchen/types";


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