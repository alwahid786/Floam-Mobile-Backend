"use strict";
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
exports.zipToLatLng = exports.isWithinRange = exports.cities = exports.losAngeles = exports.lakeCity = exports.decatur = exports.sandySprings = exports.atlanta = void 0;
const axios_1 = require("axios");
exports.atlanta = { lat: 33.748997, lng: -84.387985 };
exports.sandySprings = { lat: 33.930435, lng: -84.373314 };
exports.decatur = { lat: 33.773560, lng: -84.296562 };
exports.lakeCity = { lat: 30.188650, lng: -82.637154 };
exports.losAngeles = { lat: 34.039, lng: -118.265 };
exports.cities = [exports.atlanta, exports.sandySprings, exports.decatur, exports.lakeCity, exports.losAngeles];
function deg2rad(degrees) {
    return degrees * (Math.PI / 180);
}
function rad2deg(radians) {
    return radians * (180 / Math.PI);
}
function isWithinRange({ lat: lat1, lng: long1 }, { lat: lat2, lng: long2 }, range) {
    const theta = long1 - long2;
    let miles = (Math.sin(deg2rad(lat1))) * Math.sin(deg2rad(lat2)) +
        (Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta)));
    miles = Math.acos(miles);
    miles = rad2deg(miles);
    const resultInMiles = miles * 60 * 1.1515;
    return resultInMiles <= range;
}
exports.isWithinRange = isWithinRange;
function zipToLatLng(zipCode) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'https://public.opendatasoft.com/api/v2/catalog/datasets/us-zip-code-latitude-and-longitude/exports/json';
        const params = { search: zipCode, timezone: 'UTC' };
        try {
            const res = yield axios_1.default.get(url, { params });
            const data = res.data[0];
            return { lat: data.latitude, lng: data.longitude };
        }
        catch (error) {
            console.error(error);
            return exports.losAngeles;
        }
    });
}
exports.zipToLatLng = zipToLatLng;
//# sourceMappingURL=location.utils.js.map