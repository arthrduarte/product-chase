import express from 'express';
import Product from '../models/productModel';
import isAuthenticated from './middleware';

const router = express.Router();

router.post('/', isAuthenticated, async (req, res) => {
    try {
        const product = new Product(req.body);

        if (await Product.findOne({ url: product.url })) res.status(400).json({ message: 'Product with this URL already exists' });

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

router.get('/', isAuthenticated, async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) res.status(200).json(product);
        else res.status(404).json({ message: 'Product not found' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (updatedProduct) res.status(200).json(updatedProduct);
        else res.status(404).json({ message: 'Product not found' });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (deletedProduct) res.status(200).json(deletedProduct);
        else res.status(404).json({ message: 'Product not found' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

export default router;
