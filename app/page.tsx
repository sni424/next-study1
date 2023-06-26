import DetailSection from './component/common/home/DetailSection';
import MapSection from './component/common/home/MapSection';

const Home = () => {
    return (
        <>
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
        </>
    );
};
export default Home;
