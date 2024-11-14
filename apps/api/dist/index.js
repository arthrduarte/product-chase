"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3 = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const clerkWebhookHandler_1 = __importDefault(require("./routes/clerkWebhookHandler"));
const cors_1 = __importDefault(require("cors"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 4000;
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
exports.s3 = s3;
app.use('/api/webhooks', clerkWebhookHandler_1.default);
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/products', product_route_1.default);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
mongoose_1.default
    .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@product-chase.ihtax.mongodb.net/product-chase`)
    .then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})
    .catch((error) => {
    console.log(error);
});
