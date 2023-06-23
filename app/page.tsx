import DetailSection from './component/common/home/DetailSection';
import MapSection from './component/common/home/MapSection';

export default async function Home() {
    return (
        <main
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
            }}
        >
            <MapSection />
            <DetailSection />
        </main>
    );
}
