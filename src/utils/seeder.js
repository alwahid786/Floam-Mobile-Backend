"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStudioRegistration = exports.generateAppointment = exports.generateStudio = exports.generateUser = exports.generateLocation = exports.generateAddOns = exports.generateAmenities = exports.generateReview = exports.studioPics = exports.studioPicC = exports.studioPicB = exports.studioPicA = void 0;
const faker = require("faker");
const appointment_entity_1 = require("../appointment/appointment.entity");
const location_utils_1 = require("../location/location.utils");
const review_entity_1 = require("../review/review.entity");
const studio_registration_dto_1 = require("../studio/dto/studio.registration.dto");
const studio_addon_entity_1 = require("../studio/studio.addon.entity");
const studio_status_1 = require("../studio/studio.status");
const moment = require("moment");
exports.studioPicA = 'https://images.unsplash.com/photo-1551710029-607e06bd45ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80';
exports.studioPicB = 'https://images.unsplash.com/photo-1563330232-57114bb0823c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';
exports.studioPicC = 'https://images.unsplash.com/photo-1535406208535-1429839cfd13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80';
exports.studioPics = [exports.studioPicA, exports.studioPicB, exports.studioPicC];
function generateReview(studio, user) {
    const appt = generateAppointment(user, studio);
    return {
        cleanlinessRating: Math.ceil(Math.random() * 5),
        timelinessRating: Math.ceil(Math.random() * 5),
        communicationRating: Math.ceil(Math.random() * 5),
        isExpectations: false,
        isRecommendations: false,
        rating: Math.ceil(Math.random() * 5),
        comment: faker.lorem.sentence(5),
        privateComment: null,
        studioId: studio.id,
        leftByUserId: user.id,
        leftByUserType: review_entity_1.LEFT_BY_TYPES.ARTIST,
        appointment: appt,
        appointmentId: appt.id,
    };
}
exports.generateReview = generateReview;
function generateAmenities() {
    return [
        { isActive: true, description: 'Wifi', iconName: 'wifi' },
        { isActive: true, description: 'Bathroom', iconName: 'toilet' },
        { isActive: true, description: 'Lounge', iconName: 'couch' },
        { isActive: true, description: '420 Friendly', iconName: 'joint' },
        {
            isActive: true,
            description: 'refreshments',
            iconName: 'cookie-bite',
        },
        { isActive: true, description: 'Free Parking', iconName: 'parking' },
    ];
}
exports.generateAmenities = generateAmenities;
function generateAddOns(studioId, count = 3) {
    const addOns = [];
    for (let i = 0; i < count; i++) {
        addOns.push({
            name: faker.name.title(),
            description: faker.lorem.sentence(3),
            price: 100,
            priceOption: studio_addon_entity_1.ADD_ON_PRICE_OPTION.PER_HOUR,
            studioId,
        });
    }
    return addOns;
}
exports.generateAddOns = generateAddOns;
function generateLocation() {
    const index = Math.floor(Math.random() * (location_utils_1.cities.length - 1));
    const { lat, lng } = location_utils_1.cities[index];
    return {
        addressOne: faker.address.streetAddress(),
        addressTwo: null,
        state: faker.address.stateAbbr(),
        city: faker.address.city(),
        zipCode: faker.address.zipCode(),
        lat,
        lng,
    };
}
exports.generateLocation = generateLocation;
function generateUser() {
    const dob = moment().subtract(25, 'years').format('YYYY-MM-DD');
    return {
        docLink: faker.internet.url(),
        password: faker.internet.password(8),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        bio: faker.lorem.words(20),
        location: generateLocation(),
        dateOfBirth: dob,
        gender: 'female',
        isNewUser: false,
        clientConnectId: null
    };
}
exports.generateUser = generateUser;
function generateStudio(user) {
    return {
        name: faker.company.companyName(),
        status: studio_status_1.STUDIO_STATUS.PENDING_APPROVAL,
        description: faker.lorem.sentence(20),
        rejected_reason: faker.lorem.sentence(20),
        rules: [
            faker.lorem.words(5),
            faker.lorem.words(5),
            faker.lorem.words(5),
        ],
        price: Math.floor(Math.random() * 200),
        capacity: 4,
        isLive: true,
        addOns: [],
        depositRequired: false,
        amenities: generateAmenities(),
        location: generateLocation(),
        genres: ['Hip Hop'],
        artistLevels: [studio_registration_dto_1.ARTIST_LEVELS.BEGINNER],
        studioOpen: new Date(),
        studioClose: new Date(),
        user: user || generateUser(),
        hardware: [
            faker.lorem.words(5),
            faker.lorem.words(5),
            faker.lorem.words(5),
        ],
        software: [
            faker.lorem.words(5),
            faker.lorem.words(5),
            faker.lorem.words(5),
        ],
        studioLocation: 'Kitchen',
        minSessionLength: 2,
        userId: user.id,
    };
}
exports.generateStudio = generateStudio;
function generateAppointment(user, studio) {
    const start = moment().subtract(1, 'day');
    return {
        start: start.toDate(),
        end: start.clone().add(3, 'hours').toDate(),
        total: '300',
        user: generateUser(),
        studio: generateStudio(),
        cancelledAt: null,
        cancellationReason: '',
        artistLeftReview: true,
        hostLeftReview: true,
        addOns: [],
        notes: null,
        numOfGuests: 0,
        status: appointment_entity_1.APPT_STATUSES.CONFIRMED,
        userId: user.id,
        studioId: studio.id,
        notificationSent: false,
        isEarning: false,
        floamAmount: 0,
        paymentIntent: null
    };
}
exports.generateAppointment = generateAppointment;
function generateStudioRegistration(user) {
    const manager = user || generateUser();
    return {
        depositRequired: false,
        minSessionLength: 2,
        photos: [
            { uri: exports.studioPicA },
            { uri: exports.studioPicB },
            { uri: exports.studioPicC },
        ],
        studioId: null,
        hardware: [
            faker.lorem.words(5),
            faker.lorem.words(5),
            faker.lorem.words(5),
        ],
        software: [
            faker.lorem.words(5),
            faker.lorem.words(5),
            faker.lorem.words(5),
        ],
        name: faker.company.companyName(),
        description: faker.lorem.sentence(20),
        rules: [
            faker.lorem.words(5),
            faker.lorem.words(5),
            faker.lorem.words(5),
        ],
        price: Math.floor(Math.random() * 200),
        capacity: 40,
        userId: manager.id,
        amenities: generateAmenities(),
        location: generateLocation(),
        addOns: [],
        artistLevels: [studio_registration_dto_1.ARTIST_LEVELS.BEGINNER],
        genres: ['Hip Hop'],
        studioClose: new Date(),
        studioOpen: new Date(),
        studioLocation: 'Kitchen',
    };
}
exports.generateStudioRegistration = generateStudioRegistration;
//# sourceMappingURL=seeder.js.map