'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import stlye from './header.module.scss';

import { AiOutlineShareAlt } from 'react-icons/ai';
import { VscFeedback } from 'react-icons/vsc';
import useMap from '@/app/hooks/useMap';
import { useCallback } from 'react';
import useFocus from '@/app/hooks/useFocus';
import copy from 'copy-to-clipboard';

interface Props {
    onClickLogo?: () => void;
    rightElements?: React.ReactElement[];
}

export default function Header({ rightElements }: Props) {
    const pathname = usePathname();

    const { resetMapOptions, getMapOptions } = useFocus();
    const router = useRouter();

    const replaceAndCopyUrl = useCallback(() => {
        const mapOptions = getMapOptions();
        const query = `/?zoom=${mapOptions.zoom}&lat=${mapOptions.center[0]}&lng=${mapOptions.center[1]}`;

        router.replace(query);
        copy(location.origin + query);
    }, [router, getMapOptions]);

    return (
        <header className={[stlye.header].join('')}>
            <div className={[stlye.flexItem].join('')}>
                <Link
                    href="/"
                    className={[stlye.box].join('')}
                    onClick={resetMapOptions}
                >
                    <Image
                        src="/inflearn.png"
                        width={110}
                        height={20}
                        alt="인프런 로고"
                        loading="lazy"
                        // fill
                        // style={{ objectFit: 'cover' }}
                        // placeholder="blur"
                    />
                </Link>
            </div>
            {pathname === '/' && (
                <div className={[stlye.flexItem].join('')}>
                    <button
                        onClick={replaceAndCopyUrl}
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
