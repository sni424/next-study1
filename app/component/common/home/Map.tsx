'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';
import { Coordinates } from '@/types/store';
import { NaverMap } from '@/types/map';

type Props = {
    mapId?: string;
    initialCenter?: Coordinates;
    initialZoom?: number;
    onLoad?: (map: NaverMap) => void;
};

export default function Map({ mapId = 'map', onLoad }: Props) {
    const mapRef = useRef<NaverMap | null>(null);

    const initializeMap = () => {
        const mapOptions = {
            // 맵 옵션 설정
        };

        const map = new window.naver.maps.Map(mapId, mapOptions);
        mapRef.current = map;

        if (onLoad) {
            onLoad(map);
        }
    };

    useEffect(() => {
        return () => {
            mapRef.current?.destroy();
        };
    }, []);

    return (
        <>
            <Script
                strategy="afterInteractive"
                type="text/javascript"
                src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}`}
                onReady={initializeMap}
            />
            <div id={mapId} style={{ width: '100%', height: '100%' }} />
        </>
    );
}
