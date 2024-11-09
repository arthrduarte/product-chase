import express, { Request, Response, Router } from 'express';
import Product from '../models/productModel';

const router: Router = express.Router();

router.post('/', async (req: Request, res: Response): Promise<any> => {
    try {
        const product = new Product(req.body);

        if (await Product.findOne({ url: product.url })) {
            return res.status(400).json({ message: 'Product with this URL already exists' });
        }

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: (error as Error).message });
    }
});

router.get('/', async (req, res) => {
    try {

        const { search, tags, minUpvotes, maxUpvotes } = req.query

        const filter: any = {}

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ]
        }

        if (tags) {
            const tagsArray = (tags as string).split(',')
            filter.tags = { $all: tagsArray }
        }

        if (minUpvotes || maxUpvotes) {
            filter.upvotes = {};
            if (minUpvotes) filter.upvotes.$gte = Number(minUpvotes);
            if (maxUpvotes) filter.upvotes.$lte = Number(maxUpvotes);
        }

        let products = await Product.find(filter);
        products = products.sort((a, b) => b.upvotes - a.upvotes);
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
            { $inc: { upvotes: 1 } },
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
