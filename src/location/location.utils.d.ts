import { LatLngLiteral } from '@googlemaps/google-maps-services-js/dist';
export declare const atlanta: LatLngLiteral;
export declare const sandySprings: LatLngLiteral;
export declare const decatur: LatLngLiteral;
export declare const lakeCity: LatLngLiteral;
export declare const losAngeles: LatLngLiteral;
export declare const cities: LatLngLiteral[];
export declare function isWithinRange({ lat: lat1, lng: long1 }: LatLngLiteral, { lat: lat2, lng: long2 }: LatLngLiteral, range: number): boolean;
export declare function zipToLatLng(zipCode: number): Promise<LatLngLiteral>;
