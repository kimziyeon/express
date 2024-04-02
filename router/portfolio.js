const testRouter = require('express').Router();
const { MongoClient } = require('mongodb');

const connectUrl = process.env.PORTFOLIO;
const client = new MongoClient(connectUrl);
let collection;

const crud = async (type, info) => {

    await client.connect();
    const db = await client.db('portfolio');
    collection = await db.collection('contact');

    if (type === 'post') {
        await collection.insertOne(info);
    }
    if (type == 'delete') {
        await collection.deleteOne(info);
    }

    const data = await collection.find().toArray();
    return data;
}

testRouter.get('/', async function (req, res) {
    res.send(await crud('get'));
})

testRouter.post('/insert', async function (req, res) {
    res.send(await crud('post', req.body));
})

testRouter.delete('/delete', async function (req, res) {
    res.send(await crud('delete', { num: Number(req.query.num) }));
})

module.exports = testRouter;


