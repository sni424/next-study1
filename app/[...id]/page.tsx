import { useRouter } from 'next/navigation';
import styles from '../../styles/detail.module.scss';
import DetailContent from '../component/common/home/DetailContent';
import DetailHeader from '../component/common/home/DetailHeader';
import useCurrentStore from '../hooks/useCurrentStore';

interface Params {
    id: string;
}

async function getName(name: string) {
    const res = await fetch('http://localhost:3001/profile');
    const data = await res.json();
    const findData = data.find(
        (store: { name: string }) => store.name === name
    );
    return findData || null;
}

const DetailId = async ({ params }: { params: Params }) => {
    const urlName = String(decodeURI(params.id));
    const nameData = await getName(urlName);

    const { setCurrentStore } = useCurrentStore();
    const router = useRouter();

    const goToMap = () => {
        setCurrentStore(nameData);
        router.replace(
            `/?zoom=15&lat=${nameData.coordinates[0]}&lng=${nameData.coordinates[1]}`
        );
    };

    const expanded = true;

    return (
        <div className={`${styles.detailSection} ${styles.expanded}`}>
            <DetailHeader
                currentStore={nameData}
                expanded={expanded}
                onClickArrow={goToMap}
            />
            <DetailContent currentStore={nameData} expanded={expanded} />
        </div>
    );
};

export async function generateStaticParams() {
    const res = await fetch('http://localhost:3001/profile').then((res) =>
        res.json()
    );
    return res.map((data: any) => ({
        slug: data.id,
    }));
}

export default DetailId;
