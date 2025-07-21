export async function getPackages() {
    try {
        const res = await fetch (`${process.env.HOST_API}/api/catering-packages`, {
            method: "GET",
            cache: "no-cache"
        })
        return res.json()
    } catch (error){
        return error
    }
}


export async function getPackageDetails(packageSlug: string) {
    try {
        const res = await fetch (`${process.env.HOST_API}/api/catering-package/${packageSlug}`, {
            method: "GET",
            cache: "no-cache"
        })
        return res.json()
    } catch (error){
        return error
    }
}
