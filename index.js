const express = require('express')
const fs = require('fs');
var cors = require('cors');
var bodyParser = require('body-parser');
const app = express();
let data = JSON.parse(fs.readFileSync('./db/data.json'));


app.use(cors()) //네트워크 문제를 해결하기위해


app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())



app.get('/test', function (req, res) {
    res.send(data.test);
})


app.get('/test/:id', function (req, res) {
    const { id } = req.params;
    const findData = data.test.find(obj => obj.id == id)
    res.send(findData);
})



app.post('/test', function (req, res) {

    data.test.push(req.body);
    const body = JSON.stringify(data);
    const dataInsert = fs.writeFileSync('./db/data.json', body);
    res.send(data.test);


})


app.delete('/test/:id', function (req, res) {

    const { id } = req.params;
    data.test = data.test.filter(obj => obj.id != id)

    const body = JSON.stringify(data);
    fs.writeFileSync('./db/data.json', body);

    res.send(data.test);
})


app.put('/test/', function (req, res) {
    const updateBody = req.body;

    data.test = data.test.map(obj => {
        if (obj.id == updateBody.id) {
            obj = updateBody;
        }
        return obj;
    })


    const body = JSON.stringify(data);
    fs.writeFileSync('./db/data.json', body);

    res.send(data.test);
})

app.listen(3030)

//http://localhost:3030/test/:id