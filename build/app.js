"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT || 3001;
app.get('/ping', (_req, res) => {
    console.log('ping');
    res.send('pong');
});
app.listen(PORT, () => {
    console.log(`listen on port: ${PORT} backend BitGol`);
    console.log(`Swagger route: http://localhost:${PORT}/swagger`);
});
//# sourceMappingURL=app.js.map