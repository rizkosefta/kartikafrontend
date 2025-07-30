import React from 'react'

type Request = {
    params:{
        packageSlug: string
    }
    searchParams: {
        "trx-id": string,
        phone: string,
    };
};

function BookingSuccessPage({searchParams, params}: Request) {
  return (
    <div>BookingSuccessPage</div>
  )
}

export default BookingSuccessPage