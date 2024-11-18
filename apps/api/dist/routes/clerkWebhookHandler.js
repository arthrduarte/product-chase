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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const svix_1 = require("svix");
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userModel_1 = require("../models/userModel");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.post('/', body_parser_1.default.raw({ type: 'application/json' }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
        throw new Error('You need a WEBHOOK_SECRET in your .env');
    }
    // Get the headers and body
    const headers = req.headers;
    const payload = req.body;
    // Get the Svix headers for verification
    const svix_id = headers['svix-id'];
    const svix_timestamp = headers['svix-timestamp'];
    const svix_signature = headers['svix-signature'];
    // If there are no Svix headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        yield res.status(400).json({
            success: false,
            message: 'Error occurred -- no Svix headers',
        });
        return;
    }
    // Create a new Svix instance with your secret.
    const wh = new svix_1.Webhook(WEBHOOK_SECRET);
    let evt;
    try {
        evt = wh.verify(payload, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        });
    }
    catch (err) {
        console.error('Error verifying webhook:', err.message);
        res.status(400).json({
            success: false,
            message: err.message,
        });
        return;
    }
    const { id, first_name, last_name, email_addresses } = evt.data;
    const emailAddress = (_a = email_addresses[0]) === null || _a === void 0 ? void 0 : _a.email_address;
    console.log('Webhook body:', evt.data);
    console.log(`User email: ${emailAddress} fname: ${first_name} lname: ${last_name} id: ${id}`);
    if (evt.type === 'user.created') {
        const user = new userModel_1.User({ clerk_id: id, email: emailAddress, first_name, last_name });
        yield user.save();
    }
    if (evt.type === 'user.updated') {
        const user = yield userModel_1.User.findOneAndUpdate({ clerk_id: id }, { email: emailAddress, first_name, last_name });
    }
    res.status(200).json({
        success: true,
        message: 'Webhook received',
    });
}));
exports.default = app;
