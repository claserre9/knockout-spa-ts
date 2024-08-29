"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Serve static files from the 'public' directory
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// Route all requests to the 'index.html' file
app.get('*', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, 'public', 'index.html'));
});
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}/`);
});
