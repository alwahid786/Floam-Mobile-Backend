"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
class UserNotFoundException extends common_1.HttpException {
    constructor() {
        super('User not found.', common_1.HttpStatus.NOT_FOUND);
    }
}
exports.default = UserNotFoundException;
//# sourceMappingURL=UserNotFoundException.js.map