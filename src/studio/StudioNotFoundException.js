"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudioNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class StudioNotFoundException extends common_1.HttpException {
    constructor() {
        super('Studio not found.', common_1.HttpStatus.NOT_FOUND);
    }
}
exports.StudioNotFoundException = StudioNotFoundException;
//# sourceMappingURL=StudioNotFoundException.js.map