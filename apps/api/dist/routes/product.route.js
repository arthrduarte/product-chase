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
const express_1 = __importDefault(require("express"));
const productModel_1 = __importDefault(require("../models/productModel"));
const index_1 = require("../index");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
router.post('/', upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, url, tags } = req.body;
        if (yield productModel_1.default.findOne({ url })) {
            return res.status(400).json({ message: 'Product with this URL already exists' });
        }
        let imageUrl = null;
        if (req.file) {
            const uploadParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `uploads/${Date.now()}_${req.file.originalname}`,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
            };
            const s3Response = yield index_1.s3.upload(uploadParams).promise();
            imageUrl = s3Response.Location;
        }
        const product = new productModel_1.default({
            title,
            description,
            url,
            tags: JSON.parse(tags),
            imageUrl,
        });
        const savedProduct = yield product.save();
        res.status(201).json(savedProduct);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, tags, minUpvotes, maxUpvotes } = req.query;
        const filter = {};
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }
        if (tags) {
            const tagsArray = tags.split(',');
            filter.tags = { $all: tagsArray };
        }
        if (minUpvotes || maxUpvotes) {
            filter.upvotes = {};
            if (minUpvotes)
                filter.upvotes.$gte = Number(minUpvotes);
            if (maxUpvotes)
                filter.upvotes.$lte = Number(maxUpvotes);
        }
        let products = yield productModel_1.default.find(filter);
        products = products.sort((a, b) => b.upvotes - a.upvotes);
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productModel_1.default.findById(req.params.id);
        if (product)
            res.status(200).json(product);
        else
            res.status(404).json({ message: 'Product not found' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProduct = yield productModel_1.default.findByIdAndUpdate(req.params.id, { $inc: { upvotes: 1 } }, { new: true });
        if (updatedProduct)
            res.status(200).json(updatedProduct);
        else
            res.status(404).json({ message: 'Product not found' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProduct = yield productModel_1.default.findByIdAndDelete(req.params.id);
        if (deletedProduct)
            res.status(200).json(deletedProduct);
        else
            res.status(404).json({ message: 'Product not found' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
