const fs = require('fs');
const cameraRouter = require('express').Router();
const path = require('path');


const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
  }
})

const uploadDir = path.join(path.join(__dirname,'..') + '/uploads/');
const upload = multer({ storage: storage })

cameraRouter.get('/uploads/:img', async function (req, res) {
    res.sendFile(uploadDir + req.params.img)
})



cameraRouter.get('/', async function (req, res) {
  res.send('camera ready...');
})




cameraRouter.post('/save', upload.single('image'), function (req, res) {
  const file = req.file;
  const imageUrl = {fileUrl : file.filename};
  res.send(imageUrl)
})

cameraRouter.delete('/photo/:filename',  function (req, res) {
    const filename = req.params.filename;
    const filePath = path.join(uploadDir, filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.send('지우기성공!!');
    } else {
      res.status(404).send('File not found');
    }
})

module.exports = cameraRouter;



