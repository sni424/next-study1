'use client';

import useMap from '@/app/hooks/useMap';
import Map from './Map';
import { NaverMap } from '@/types/map';

import Markers from './Markers';
import useStores from '@/app/hooks/useStores';
import { useEffect, useMemo } from 'react';
import useCurrentStore from '@/app/hooks/useCurrentStore';
import { Coordinates } from '@/types/store';
import { INITIAL_CENTER, INITIAL_ZOOM } from '@/app/hooks/useFocus';
import { useSearchParams } from 'next/navigation';

export default function MapSection() {
    const param = useSearchParams();
    const urlString = param.toString();
    const query = useMemo(() => new URLSearchParams(urlString), [urlString]);

    const initialZoom = useMemo(
        () => (query.get('zoom') ? Number(query.get('zoom')) : INITIAL_ZOOM),
        [query]
    );

    const initialCenter = useMemo<Coordinates>(
        () =>
            query.get('lat') && query.get('lng')
                ? [Number(query.get('lat')), Number(query.get('lng'))]
                : INITIAL_CENTER,
        [query]
    );

    const { initializeMap } = useMap();
    const { clearCurrentStore } = useCurrentStore();

    const onLoadMap = (map: NaverMap) => {
        initializeMap(map);
        naver.maps.Event.addListener(map, 'click', clearCurrentStore);
    };

    const { initializeStores } = useStores();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData();
            initializeStores(data);
        };
        fetchData();
    }, [initializeStores]);

    return (
        <>
            <Map
                onLoad={onLoadMap}
                initialZoom={initialZoom}
                initialCenter={initialCenter}
            />
            <Markers />
        </>
    );
}

export async function getData() {
    const res = await fetch('http://localhost:3001/profile');
    const data = await res.json();
    return data;
}
