'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import stlye from './header.module.scss';

import { AiOutlineShareAlt } from 'react-icons/ai';
import { VscFeedback } from 'react-icons/vsc';

interface Props {
    rightElements?: React.ReactElement[];
}

export default function Header({ rightElements }: Props) {
    const pathname = usePathname();

    console.log(pathname);

    return (
        <header className={[stlye.header].join('')}>
            <div className={[stlye.flexItem].join('')}>
                <Link href="/" className={[stlye.box].join('')}>
                    <Image
                        src="/inflearn.png"
                        width={110}
                        height={20}
                        alt="인프런 로고"
                        // loading="lazy"
                        // fill
                        // style={{ objectFit: 'cover' }}
                        // placeholder="blur"
                    />
                </Link>
            </div>
            {pathname === '/' && (
                <div className={[stlye.flexItem].join('')}>
                    <button
                        onClick={() => {
                            alert('복사');
                        }}
                        className={[stlye.box].join('')}
                    >
                        <AiOutlineShareAlt size={20} />
                    </button>
                    <Link href="/feedback" className={[stlye.box].join('')}>
                        <VscFeedback size={20} />
                    </Link>
                </div>
            )}
        </header>
    );
}
