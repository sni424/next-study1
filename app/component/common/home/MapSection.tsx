'use client';

import useMap from '@/app/hooks/useMap';
import Map from './Map';
import { NaverMap } from '@/types/map';

import Markers from './Markers';
import useStores from '@/app/hooks/useStores';
import { useEffect, useState } from 'react';
import useCurrentStore from '@/app/hooks/useCurrentStore';

export default function MapSection() {
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
            <Map onLoad={onLoadMap} />
            <Markers />
        </>
    );
}

export async function getData() {
    const res = await fetch('http://localhost:3001/profile');
    const data = await res.json();
    return data;
}
