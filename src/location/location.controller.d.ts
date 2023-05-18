import { LatLngLiteral } from '@googlemaps/google-maps-services-js';
import { Location } from './location.entity';
import { LocationService } from './location.service';
export declare class LocationController {
    private readonly locationService;
    constructor(locationService: LocationService);
    validateAddress(location: Location): Promise<LatLngLiteral>;
    getAddress(latLng: LatLngLiteral): Promise<Location>;
}
