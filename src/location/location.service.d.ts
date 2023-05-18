import { LatLngLiteral } from '@googlemaps/google-maps-services-js/dist';
import { Location } from './location.entity';
export declare class LocationService {
    private log;
    private gMaps;
    getLatLng(location: Location): Promise<LatLngLiteral>;
    getAddressFromLatLng(latLng: LatLngLiteral): Promise<Location>;
}
