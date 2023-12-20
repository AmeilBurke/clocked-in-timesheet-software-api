"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashGivenPassword = void 0;
const bcrypt = require("bcrypt");
const hashGivenPassword = async (unencryptedPassword) => {
    const saltOrRounds = 10;
    return await bcrypt.hash(unencryptedPassword, saltOrRounds);
};
exports.hashGivenPassword = hashGivenPassword;
//# sourceMappingURL=bcrypt.hashPassword.js.map