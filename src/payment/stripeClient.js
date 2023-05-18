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
exports.Stripe = exports.createUserInStripe = void 0;
const common_1 = require("@nestjs/common");
const stripe_1 = require("stripe");
exports.Stripe = stripe_1.default;
require("dotenv/config");
const { STRIPE_SECRET_KEY } = process.env;
const stripeClient = new stripe_1.default(STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
});
const log = new common_1.Logger('StripeClient');
function createUserInStripe(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const { location, email, firstName, lastName, phone } = user;
        const customerCreateParams = {
            address: {
                city: location.city || null,
                country: 'US',
                line1: location.addressOne || null,
                line2: location.addressTwo || null,
                postal_code: location.zipCode || null,
                state: location.state || null,
            },
            email,
            name: `${firstName} ${lastName}`,
            phone,
        };
        try {
            const customer = yield stripeClient.customers.create(customerCreateParams);
            log.log(`[createUserInStripe] user successfully created!`);
            return customer.id;
        }
        catch (e) {
            log.error(`[createUserInStripe][error] Failed to create the customer.`);
            log.error(e);
        }
    });
}
exports.createUserInStripe = createUserInStripe;
exports.default = stripeClient;
//# sourceMappingURL=stripeClient.js.map