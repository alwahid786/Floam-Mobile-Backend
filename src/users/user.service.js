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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const payment_service_1 = require("../payment/payment.service");
const communication_service_1 = require("../communication/communication.service");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("typeorm");
const UserNotFoundException_1 = require("./UserNotFoundException");
const stripeTest = require('stripe')('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');
const stripeProd = require('stripe')('sk_test_MEvj1NP7uAlLRMMWukEMnzV5');
const https = require('https');
let UserService = class UserService {
    constructor(userRepository, commsService, paymentService) {
        this.userRepository = userRepository;
        this.commsService = commsService;
        this.paymentService = paymentService;
        this.log = new common_1.Logger('UserService');
    }
    createOrUpdateUser(userData) {
        return this.userRepository.save(userData, { reload: true });
    }
    getUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne(userId);
            if (!user) {
                throw new UserNotFoundException_1.default();
            }
            return user;
        });
    }
    deleteUserAcount(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let rese = yield this.commsService.deleteNotificationPrefrence(id);
            if (rese) {
                try {
                    var resppppp = {};
                    resppppp["first"] = rese;
                    const userDetail = yield this.userRepository.findOne({
                        where: { id },
                    });
                    resppppp["uuser"] = userDetail;
                    if (!userDetail) {
                        return 'userDetail not found';
                    }
                    let deleted = yield this.userRepository.delete(userDetail.id);
                    if (deleted) {
                        resppppp["isDeleted"] = deleted;
                    }
                    else {
                        resppppp["isDeleted"] = false;
                    }
                    resppppp["messagge"] = 'ok data found successflyy!';
                    return resppppp;
                }
                catch (e) {
                    return e;
                }
            }
            else {
                return "we are mot able to delete!";
            }
        });
    }
    getAll() {
        return this.userRepository.find();
    }
    getByLoginInfo(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { email },
            });
            if (!user) {
                throw new UserNotFoundException_1.default();
            }
            const isSamePassword = yield bcrypt.compare(password, user.password);
            if (!isSamePassword) {
                throw new UserNotFoundException_1.default();
            }
            return user;
        });
    }
    registerUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdUser = yield this.createOrUpdateUser(user);
            yield this.commsService.createDefaultNotificationPreferences(createdUser);
            yield this.paymentService.create(user);
            return createdUser;
        });
    }
    registerSocialUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdUser = yield this.createOrUpdateUser(user);
            yield this.commsService.createDefaultNotificationPreferences(createdUser);
            return createdUser;
        });
    }
    getUserFromEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { email },
            });
            if (!user) {
                throw new UserNotFoundException_1.default();
            }
            return user;
        });
    }
    createCustomAccountForUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const account = yield stripeTest.accounts.create({
                    country: 'US',
                    type: 'custom',
                    email: data.email,
                    business_type: 'individual',
                    tos_acceptance: {
                        date: 1609798905,
                        ip: '0.0.0.0'
                    },
                    business_profile: {
                        url: 'soimething.com'
                    },
                    individual: {
                        first_name: data.firstName,
                        last_name: data.lastName,
                        ssn_last_4: 1234,
                        dob: {
                            day: 2,
                            month: 4,
                            year: 1998
                        },
                    },
                    capabilities: {
                        transfers: { requested: true },
                    },
                });
                return account;
            }
            catch (err) {
                if (err.message) {
                    throw err.message;
                }
                throw err;
            }
        });
    }
    sendPush(userID, message, title) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = {
                "app_id": "ccd5c591-07b7-475d-9dd2-8a9d0139a781",
                "contents": { "en": message },
                "heading": title,
                'include_external_user_ids': [userID],
                "included_segments": ["Subscribed Users"],
            };
            const postData = JSON.stringify(data);
            const options = {
                hostname: 'onesignal.com',
                path: '/api/v1/notifications',
                method: 'POST',
                headers: {
                    'Authorization': 'Basic YzU4MDBjMDUtZGJmNy00ZDRmLTgzNzgtYzZiM2IyMmMyN2E1',
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(postData),
                    'Accept': 'application/json'
                }
            };
            const req = https.request(options, (res) => {
                console.log(`statusCode: ${res.statusCode}`);
                res.on('data', (d) => {
                    process.stdout.write(d);
                });
                return res;
            });
            req.on('error', (error) => {
                console.error(error);
                return error;
            });
            req.write(postData);
            req.end();
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        communication_service_1.CommunicationService,
        payment_service_1.PaymentService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map