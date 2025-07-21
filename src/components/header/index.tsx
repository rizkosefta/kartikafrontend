"use client"

import ArrowCircleLeft from '@/assets/images/arrow-circle-left.svg'
import ThumbsUp from '@/assets/images/thumbsup.svg'
import Dots4 from '@/assets/images/dots4.svg'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MouseEventHandler } from 'react'
import Image from 'next/image'

type TBack = {
    historyBack: boolean
} & (
        | {
            historyBack: true;
        }
        | {
            historyBack: false,
            url: string
        }
    );

type TMore = {
    display: boolean;
} & (
        | {
            display: false;
        }
        | {
            display: true;
            onClick: MouseEventHandler<HTMLSpanElement>
        }
    );

type Props = {
    title?: string;
    appendClassName: string;
    back: TBack;
    thumbsUp: TMore;
    more: TMore;
};

function Header({
    title, appendClassName, back, thumbsUp, more }: Props) {
    const router = useRouter();
    return (
        <header
            className={["flex items-center justify-between px-4 w-full gap-x-4", appendClassName].join(" ")}
        >
            {
                back.historyBack ? (
                    <span onClick={router.back} className="flex items-center justify-center bg-white rounded-full w-[52px] aspect-square text-color2 cursor-pointer">
                        <Image src={ArrowCircleLeft} alt="Notes" className="w-6 h-6" />
                    </span>
                ) : (
                    <Link
                        href={back.url}
                        className="flex items-center justify-center bg-white rounded-full w-[52px] aspect-square text-color2"
                    >
                        <Image src={ArrowCircleLeft} alt="Notes" className="w-6 h-6" />
                    </Link>
                )}
            {
                !!title ? (
                    <>
                        <h1 className="mx-auto text-lg font-semibold">{title}</h1>
                        {
                            !more.display && !thumbsUp.display &&
                            <span className="ml-auto"></span>
                        }
                    </>
                ) : (<span className="mx-auto"></span>
                )}
            {
                thumbsUp.display && <span className=
                    "flex items-center justify-center bg-white rounded-full w-[52px] aspect-square text-color2"
                    onClick={thumbsUp.onClick}>
                    <Image src={ThumbsUp} alt="Notes" className="w-6 h-6" />
                </span>
            }
            {
                more.display && <span className=
                    "flex items-center justify-center bg-white rounded-full w-[52px] aspect-square text-color2"
                    onClick={more.onClick}>
                    <Image src={Dots4} alt="Notes" className="w-6 h-6" />
                </span>
            }
        </header>
    );
}

export default Header;