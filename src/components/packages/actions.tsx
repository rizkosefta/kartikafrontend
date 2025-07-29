import { redirect } from "next/navigation"

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
    previousState: any,
    formData: FormData
) {
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const started_at = formData.get("started_at");
    const slug = formData.get("slug");
    const catering_package_id = formData.get("catering_package_id");
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
