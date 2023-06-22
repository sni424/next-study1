import { Coordinates } from '@/types/store';
import { useCallback } from 'react';
import useSWR, { mutate } from 'swr';

export const INITIAL_CENTER: Coordinates = [37.5262411, 126.99289439];
export const INITIAL_ZOOM = 10;

export const MAP_KEY = '/map';

const useFocus = () => {
    const { data: map } = useSWR(MAP_KEY);

    const resetMapOptions = useCallback(() => {
        /** https://navermaps.github.io/maps.js.ncp/docs/naver.maps.Map.html#morph__anchor */
        map.morph(new naver.maps.LatLng(...INITIAL_CENTER), INITIAL_ZOOM);
    }, [map]);

    const getMapOptions = useCallback(() => {
        const mapCenter = map.getCenter();
        const center: Coordinates = [mapCenter.lat(), mapCenter.lng()];
        const zoom = map.getZoom();

        return { center, zoom };
    }, [map]);

    return {
        resetMapOptions,
        getMapOptions,
    };
};

export default useFocus;
