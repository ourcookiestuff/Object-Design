import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({
    origin: ['http://localhost:5173', 'http://client:5173'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

app.get('/api/products', (req, res) => {
    res.json([
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
        { id: 3, name: 'Product 3', price: 30 },
    ]);
});

app.post('/api/payments', (req, res) => {
    const { items, total } = req.body;
    console.log('Received payment request:', { items, total });
    res.json({ success: true, message: 'Payment processed successfully' });
});

app.listen(3001, () => { console.log('Server is running on http://localhost:3001'); });