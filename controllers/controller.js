const path = require('path')
const products = require('../models/products')

exports.getView = async (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'))
}

exports.postProducts = async (req, res) => {
    try {
        console.log('hi');
        const category = req.body.category;
        const description = req.body.description;
        const amount = req.body.amount;
        console.log(req);
        const data=await products.create({
            category: category,
            description: description,
            amount: amount
        })
        res.json({ data: data })
    }
    catch (err) {
        console.log(err);
    }
}

exports.getProducts = async (req, res) => {
    try {
        const data = await products.findAll();
        res.json({ data: data })
    }
    catch (err) {
        console.log(err);
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        const resp = await products.destroy({ where: { id: id } })
        res.status(204).json({ resp });
    }
    catch (err) {
        console.log(err);
    }
}

exports.getProduct = async (req, res) => {
    try {
        const id = req.params.id
        const resp = await products.findByPk(id)
        res.json({ data: resp })
    }
    catch (err) {
        console.log(err);
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const date = req.body.date;
        const category = req.body.category;
        const description = req.body.description;
        const amount = req.body.amount;
        const resp1 = await products.upsert({
            id: id,
            category: category,
            description: description,
            amount: amount
        })
        res.json({
            data: {
                id: id,
                category: category,
                description: description,
                amount: amount
            }
        })

    }
    catch (err) {
        console.log(err);
    }
}