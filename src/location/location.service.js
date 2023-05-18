"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationService = void 0;
const google_maps_services_js_1 = require("@googlemaps/google-maps-services-js");
const dist_1 = require("@googlemaps/google-maps-services-js/dist");
const common_1 = require("@nestjs/common");
const G_MAPS_API_KEY = 'AIzaSyCXE-xMBZPmhOxt0BPbzAf20y9zG3J9n4A';
let LocationService = class LocationService {
    constructor() {
        this.log = new common_1.Logger('LocationService');
        this.gMaps = new google_maps_services_js_1.Client();
    }
    getLatLng(location) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.debug(`Calling GMaps API`);
            const { addressOne, addressTwo, city, zipCode, state } = location;
            const address = `${addressOne}, ${addressTwo ? addressTwo + ' ' : ''}${city} ${state} ${zipCode}`;
            const request = {
                params: { address, key: G_MAPS_API_KEY }
            };
            try {
                if (state !== 'CA') {
                    return null;
                }
                const response = yield this.gMaps.geocode(request);
                if (!response.data.results || !response.data.results.length) {
                    this.log.error(`Failed to find address: ${address}`);
                    return null;
                }
                const result = response.data.results[0];
                let i;
                for (i = 0; i < result.address_components.length; i++) {
                    if (result.address_components[i].types.includes(dist_1.AddressType.postal_code) === true)
                        break;
                }
                if (i === result.address_components.length) {
                    return null;
                }
                console.log(result.address_components[i]);
                console.log(zipCode);
                if (result.address_components[i].short_name !== zipCode) {
                    return null;
                }
                return result.geometry.location;
            }
            catch (error) {
                console.log(error);
                this.log.error(`API failed to find address: ${address}`);
            }
        });
    }
    getAddressFromLatLng(latLng) {
        return __awaiter(this, void 0, void 0, function* () {
            const { lat, lng } = latLng;
            this.log.debug(`[getAddressFromLatLng] lat: ${lat}, lng: ${lng}`);
            const request = {
                params: { latlng: latLng, key: G_MAPS_API_KEY }
            };
            try {
                const response = yield this.gMaps.reverseGeocode(request);
                if (!response.data.results || !response.data.results.length) {
                    this.log.error(`Failed to find lat: ${lat}, lng: ${lng}`);
                    return null;
                }
                const result = response.data.results[0];
                const getValueByType = (type) => {
                    const addressComp = result.address_components.find(item => item.types.includes(type));
                    return addressComp ? addressComp.short_name : null;
                };
                const address = {
                    addressOne: `${getValueByType(google_maps_services_js_1.GeocodingAddressComponentType.street_number)} ${getValueByType(dist_1.AddressType.route)}`,
                    addressTwo: null,
                    city: getValueByType(dist_1.AddressType.locality),
                    state: getValueByType(dist_1.AddressType.administrative_area_level_1),
                    zipCode: getValueByType(dist_1.AddressType.postal_code),
                    lat: result.geometry.location.lat,
                    lng: result.geometry.location.lng,
                };
                return address;
            }
            catch (error) {
                this.log.error(`API failed to find lat: ${lat}, lng: ${lng}`);
                throw new Error('Address not found.');
            }
        });
    }
};
LocationService = __decorate([
    common_1.Injectable()
], LocationService);
exports.LocationService = LocationService;
//# sourceMappingURL=location.service.js.map