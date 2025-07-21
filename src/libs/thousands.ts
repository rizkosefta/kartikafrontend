type TLocaes = "en-US" | "id-ID";

interface Number{
    thousands: (locales?: TLocaes) => string;
}

Number.prototype.thousands = function(locales: TLocaes = "id-ID"): string{
    return new Intl.NumberFormat(locales || "id-ID").format(Number(this));
}