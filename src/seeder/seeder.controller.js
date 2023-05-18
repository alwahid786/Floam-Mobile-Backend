"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.SeederController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const typeorm_2 = require("typeorm");
const appointment_service_1 = require("../appointment/appointment.service");
const image_entity_1 = require("../entities/image.entity");
const payment_service_1 = require("../payment/payment.service");
const review_service_1 = require("../review/review.service");
const studio_service_1 = require("../studio/studio.service");
const user_entity_1 = require("../users/user.entity");
const user_service_1 = require("../users/user.service");
const seeder_1 = require("../utils/seeder");
const moment = require("moment");
let SeederController = class SeederController {
    constructor(userService, studioService, reviewService, apptService, paymentService, imageRepo, userRepo) {
        this.userService = userService;
        this.studioService = studioService;
        this.reviewService = reviewService;
        this.apptService = apptService;
        this.paymentService = paymentService;
        this.imageRepo = imageRepo;
        this.userRepo = userRepo;
        this.log = new common_1.Logger('SeederController');
    }
    seedDefaultUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const studio = yield this.seedStudioManager();
            yield this.seedArtist(studio);
            return true;
        });
    }
    genFakeUser() {
        return seeder_1.generateUser();
    }
    genFakeStudio() {
        return this.generateStudioWithManager();
    }
    getFakeStudioReg() {
        return seeder_1.generateStudioRegistration();
    }
    postToSeedDB() {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.log(`**** seeding studios ***`);
            for (let i = 0; i < 10; i++) {
                const manager = yield this.userService.createOrUpdateUser(seeder_1.generateUser());
                let studio = seeder_1.generateStudio(manager);
                studio = yield this.studioService.createOrUpdateStudio(studio);
                studio.addOns = seeder_1.generateAddOns(studio.id);
                const images = seeder_1.studioPics.map((p) => {
                    return {
                        src: p,
                        type: image_entity_1.IMAGE_TYPE.STUDIO,
                        studioId: studio.id,
                    };
                });
                yield this.imageRepo.save(images);
                studio = yield this.studioService.createOrUpdateStudio(studio);
                this.log.log(`Successfully created studio: ${studio.name}`);
            }
            this.log.log(`\n\n **** seeding artists ***`);
            for (let i = 0; i < 10; i++) {
                const artist = yield this.userService.createOrUpdateUser(seeder_1.generateUser());
                this.log.log(`Successfully created artist: ${artist.firstName} ${artist.lastName}`);
            }
            this.log.log(`\n\n **** patching data ***`);
            yield this.patchUserNames();
            return 'data seed successful';
        });
    }
    patchUserNames() {
        return __awaiter(this, void 0, void 0, function* () {
            const studios = yield this.studioService.getAllStudios();
            const usersWithStudio = studios.map((s) => s.user.id);
            const query = usersWithStudio.length
                ? { id: typeorm_2.Not(typeorm_2.In(usersWithStudio)) }
                : undefined;
            const artists = yield this.userRepo.find({ where: query });
            const password = yield bcrypt.hash('password', 10);
            const randomUser = Object.assign(Object.assign({}, artists[0]), { email: 'artist@floam.co', password, firstName: 'Random', lastName: 'Floam User' });
            const mrFoxx = Object.assign(Object.assign({}, artists[1]), { email: 'Mrfoxx@gmail.com', password, firstName: 'Jamie', lastName: 'Foxx' });
            const tBraxton = Object.assign(Object.assign({}, artists[2]), { email: 'f-artist@gmail.com', password, firstName: 'Tamar', lastName: 'Braxton' });
            yield this.userRepo.save([randomUser, mrFoxx, tBraxton]);
        });
    }
    generateStudioWithManager() {
        return __awaiter(this, void 0, void 0, function* () {
            const manager = yield this.userService.createOrUpdateUser(seeder_1.generateUser());
            const studio = seeder_1.generateStudio(manager);
            return this.studioService.createOrUpdateStudio(studio);
        });
    }
    seedStudioManager() {
        return __awaiter(this, void 0, void 0, function* () {
            let manager = {
                password: 'password',
                firstName: 'Jamie',
                lastName: 'Foxx',
                email: 'Mrfoxx@gmail.com',
                phone: '818-222-3333',
                dateOfBirth: '1967-12-13',
                docLink: '',
                gender: 'male',
                bio: 'Eric Marlon Bishop, known professionally as Jamie Foxx, is an American actor, singer, comedian, songwriter, and producer.',
                location: {
                    addressOne: '709 N La Brea Ave',
                    addressTwo: '',
                    state: 'CA',
                    city: 'Los Angeles',
                    zipCode: '90038',
                },
                isNewUser: false,
                clientConnectId: null
            };
            manager = yield this.userService.createOrUpdateUser(manager);
            let studio = seeder_1.generateStudio(manager);
            studio = yield this.studioService.createOrUpdateStudio(studio);
            const image1 = {
                src: 'https://floam-dev.s3.us-east-2.amazonaws.com//studio-images/00F16CD8-6266-4D6A-9476-F58A932AB7EA.jpg',
                type: image_entity_1.IMAGE_TYPE.STUDIO,
                studio,
            };
            const image2 = {
                src: 'https://floam-dev.s3.us-east-2.amazonaws.com//studio-images/0BE6749D-5ED8-4980-AA13-5DC9BD9F6C89.jpg',
                type: image_entity_1.IMAGE_TYPE.STUDIO,
                studio,
            };
            yield this.imageRepo.save([image1, image2]);
            for (let i = 0; i < 4; i++) {
                const reviewUser = yield this.userService.createOrUpdateUser(seeder_1.generateUser());
                const review = seeder_1.generateReview(studio, reviewUser);
                yield this.reviewService.createReview(review);
            }
            return studio;
        });
    }
    seedArtist(studio) {
        return __awaiter(this, void 0, void 0, function* () {
            let artist = {
                docLink: '',
                password: 'password',
                firstName: 'Tamar',
                lastName: 'Braxton',
                email: 'f-artist@gmail.com',
                phone: '818-111-2222',
                dateOfBirth: '1977-03-17',
                gender: 'female',
                bio: 'Tamar Estine Braxton is an American singer, actress, and television personality. Braxton began her career in 1990 as a founding member of The Braxtons, an R&B singing group formed with her sisters. The Braxtons released their debut album, So Many Ways, as a trio in 1996, and disbanded shortly afterward.',
                location: {
                    addressOne: '6060 Wilshire Blvd',
                    addressTwo: '',
                    state: 'CA',
                    city: 'Los Angeles',
                    zipCode: '90036',
                },
                isNewUser: false,
                clientConnectId: null
            };
            artist = yield this.userService.registerUser(artist);
            const futureDate = moment().add(1, 'week').hour(11).minute(0);
            yield this.addAppointment(futureDate, artist, studio);
            const pastDate = moment().subtract(1, 'week').hour(11).minute(0);
            yield this.addAppointment(pastDate, artist, studio);
        });
    }
    addAppointment(date, user, studio) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < 3; i++) {
                const endDateTime = date.clone().add(3, 'h').toISOString();
                const apptDto = {
                    studioId: studio.id,
                    userId: user.id,
                    startDateTime: date.toISOString(),
                    endDateTime,
                    total: `${Math.floor(Math.random() * 300)}.00`,
                    addOns: [],
                    notes: null,
                    numOfGuests: 0,
                    userCardId: null,
                    cardToken: null,
                    floamAmount: 0,
                    paymentIntent: null
                };
                yield this.apptService.createBooking(apptDto, studio, user);
                date.add(1, 'd');
            }
        });
    }
    testSaveCardWorkflow() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield seeder_1.generateUser();
            const registeredUser = yield this.userService.registerUser(user);
            let temp = '';
            const card = {
                userId: registeredUser.id,
                isDefault: false,
                number: '4242424242424242',
                expMonth: '6',
                expYear: '2026',
                cvc: '314',
                location: registeredUser.location,
                name: `${registeredUser.firstName} ${registeredUser.lastName}`,
            };
            const payment = yield this.paymentService.registerCard(card);
            temp = 'other breakpoint';
        });
    }
};
__decorate([
    common_1.Post('/default-users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeederController.prototype, "seedDefaultUsers", null);
__decorate([
    common_1.Post('gen-user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SeederController.prototype, "genFakeUser", null);
__decorate([
    common_1.Post('studio'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SeederController.prototype, "genFakeStudio", null);
__decorate([
    common_1.Post('studio/registration'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SeederController.prototype, "getFakeStudioReg", null);
__decorate([
    common_1.Post('seeddb'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeederController.prototype, "postToSeedDB", null);
__decorate([
    common_1.Post('/seeder/patch'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeederController.prototype, "patchUserNames", null);
__decorate([
    common_1.Post('save-card-workflow'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeederController.prototype, "testSaveCardWorkflow", null);
SeederController = __decorate([
    common_1.Controller('seeder'),
    __param(5, typeorm_1.InjectRepository(image_entity_1.Image)),
    __param(6, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        studio_service_1.StudioService,
        review_service_1.ReviewService,
        appointment_service_1.AppointmentService,
        payment_service_1.PaymentService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SeederController);
exports.SeederController = SeederController;
//# sourceMappingURL=seeder.controller.js.map