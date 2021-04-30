"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginInfo = void 0;
class LoginInfo {
    constructor(req, res, details) {
        this.userid = req.userId;
        this.password = req.body.password;
        if (details && details.userid) {
            this.userid = details.userid;
        }
        details && details.password && (() => { this.password = details.password; return true; })();
    }
}
exports.LoginInfo = LoginInfo;
//# sourceMappingURL=Login-info.js.map