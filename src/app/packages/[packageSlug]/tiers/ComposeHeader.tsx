"use client"

import Header from "@/components/header"

function ComposeHeader() {
  return (
    <Header appendClassName="pt-16 bg-gray3 pb-20"
    title="Tier Package"
    back={{historyBack: true}}
    thumbsUp={{display: false}}
    more={{display: true, onClick:()=>{}}}
    />
  );
}

export default ComposeHeader