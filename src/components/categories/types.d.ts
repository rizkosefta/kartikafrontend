import { TPackage } from "@/components/packages/types";

export type TCategory = {
    id: number;
    name: string;
    slug: string;
    photo: string;
    deleted_at: null | string;
    created_at: string;
    updated_at: string;
    catering_packages: TPackage[];
    catering_package_count: number;
};