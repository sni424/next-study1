import Image from 'next/image';
import styles from './page.module.scss';
import MapSection from './component/common/home/MapSection';

export default function Home() {
    return (
        <main style={{ width: '100%', height: '100%' }}>
            <MapSection />
        </main>
    );
}
