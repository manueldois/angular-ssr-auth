"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const data_1 = require("./data");
const SERVER_SECRET = '2728iudskjcçapodw72';
const app = express_1.default();
app.use('/static', express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use(body_parser_1.default.json());
app.get('/api/users', (req, res) => {
    res.json(data_1.users.map(hideUserPrivateFields));
});
app.get('/api/users/:username', parseAccessToken, (req, res) => {
    const queryUsername = req.params['username'];
    const user = req['user'];
    if (!queryUsername) {
        res.status(400).send('No username in request');
        return;
    }
    // User is querying himself
    if (user && user === queryUsername) {
        res.json(data_1.users.find(u => u.username === user));
        return;
    }
    res.json(hideUserPrivateFields(data_1.users
        .find(u => u.username === queryUsername)));
});
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (typeof username !== 'string') {
        res.status(400).send('No username on request');
        return;
    }
    if (typeof password !== 'string') {
        res.status(400).send('No password on request');
        return;
    }
    const user = data_1.users.find(u => u.username === username);
    if (!user) {
        res.status(400).send('User not found');
        return;
    }
    if (user.password !== password) {
        res.status(400).send('Wrong password');
        return;
    }
    // Make a JWT with username as payload, and sign it with server secret
    const accessToken = jsonwebtoken_1.default.sign({
        username
    }, SERVER_SECRET);
    // Send the token as json
    res.json({ accessToken });
});
app.listen(3000, () => {
    console.log("Server started in http://localhost:3000/");
});
function hideUserPrivateFields(u) {
    delete u.password;
    return u;
}
/**
 * Middleware to grab accessToken jwt from request headers, verify it, and put
 * the username in the request
 */
function parseAccessToken(req, res, next) {
    var _a;
    const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!accessToken) {
        next();
        return;
    }
    ;
    jsonwebtoken_1.default.verify(accessToken, SERVER_SECRET, (err, decoded) => {
        if (err || !decoded.username) {
            next();
            return;
        }
        req['user'] = decoded.username;
        next();
    });
}
//# sourceMappingURL=server.js.map