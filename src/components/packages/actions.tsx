"use server";
import { redirect } from "next/navigation"

interface File{
    size: number;
    type: string;
    name: string;
    lastModified: number;
}

export async function getPackages() {
    try {
        const res = await fetch (`${process.env.HOST_API}/api/catering-packages`, {
            method: "GET",
            cache: "no-cache"
        })
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json()
        
        if (!data || !data.data) {
            throw new Error('Data packages tidak ditemukan');
        }
        
        return data
    } catch (error){
        console.error('Error fetching packages:', error);
        throw error
    }
}


export async function getPackageDetails(packageSlug: string) {
    try {
        const res = await fetch (`${process.env.HOST_API}/api/catering-package/${packageSlug}`, {
            method: "GET",
            cache: "no-cache"
        })
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json()
        
        if (!data || !data.data) {
            throw new Error('Data package tidak ditemukan');
        }
        
        return data
    } catch (error){
        console.error('Error fetching package details:', error);
        throw error
    }
}

export async function submitInformation(
    prevState: any,
    formData: FormData
) {
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const started_at = formData.get("started_at");
    const slug = formData.get("slug");
   // const catering_package_id = formData.get("catering_package_id");
    const tierId = formData.get("catering_tier_id");

    if(name === ""){
        return{
            message: "Name tidak boleh kosong",
            field: "name"
        }
    }

    if(email === ""){
        return{
            message: "Email tidak boleh kosong",
            field: "email"
        }
    }

    if(phone === ""){
        return{
            message: "Phone tidak boleh kosong",
            field: "phone"
        }
    }

    if(started_at === ""){
        return{
            message: "pilih tanggal",
            field: "started_at"     
        }
    }


    return {
        message: "berhasil",
        field: "",
        data:{
            slug,
            name,
            email,
            phone,
            started_at,
            tierId,
        },
    };
}
export async function submitShipping(
    prevState: any,
    formData: FormData
) {
    const address = formData.get("address");
    const post_code = formData.get("post_code");
    const notes = formData.get("notes");
    const slug = formData.get("slug");
   // const catering_package_id = formData.get("catering_package_id");
    const tierId = formData.get("catering_tier_id");

    if(address === ""){
        return{
            message: "Address tidak boleh kosong",
            field: "address"
        }
    }

    if(post_code === ""){
        return{
            message: "Post code tidak boleh kosong",
            field: "post_code"
        }
    }

    if(notes === ""){
        return{
            message: "Notes tidak boleh kosong",
            field: "notes"
        }
    }

    return {
        message: "berhasil",
        field: "",
        data:{
            slug,
            address,
            post_code,
            notes,
            tierId,
        },
    };
}
export async function submitPayment(
    prevState: any,
    formData: FormData
) {
    const slug = formData.get("slug") as string;
    const phone = formData.get("phone");
    const proof = formData.get("proof") as File;
   

    if(proof.size === 0){
        return{
            message: "Bukti pembayaran tidak boleh kosong",
            field: "proof"
        };
    }

    try {
        const res = await fetch(
            `${process.env.HOST_API}/api/booking-transaction`,
            {
                method: "POST",
                body: formData
            }
        );

        const data = await res.json();

        return{
            message: "berhasil",
            field: "",
            data:{
                slug,
                phone,
                booking_trx_id: data.data.booking_trx_id,
            }
        }
    } catch (error: any) {
        
    return {
        message: error.message,
        field: "toaster",
       
    };
    }
}
