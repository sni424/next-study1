import Link from 'next/link';
import stlye from './header.module.scss';
import Image from 'next/image';

export default function Header() {
    return (
        <header className={[stlye.header].join('')}>
            <div className={[stlye.flexItem].join('')}>
                <Link href="/" className={[stlye.box].join('')}>
                    <Image
                        src="/inflearn.png"
                        width={110}
                        height={20}
                        alt="인프런 로고"
                        loading="lazy"
                        // placeholder="blur"
                    />
                </Link>
            </div>
        </header>
    );
}
