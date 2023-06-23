interface Params {
    id: string;
}

interface Iname {
    name: string;
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

    return <>{nameData ? <div>{nameData.name}</div> : '안녕'}</>;
};

export async function generateStaticParams() {
    const res = await fetch('http://localhost:3001/profile').then((res) =>
        res.json()
    );
    return res.map((data: any) => ({
        params: { id: encodeURIComponent(data.name) },
    }));
}

export default DetailId;
