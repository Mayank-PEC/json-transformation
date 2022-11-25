import multer from "multer";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from 'url';
// import {GridFsStorage} from "multer-gridfs-storage";
// import Grid from "gridfs-stream";
import mongoose from "mongoose";
const mongoUsername = process.env.DB_USER;
const mongoPassword = process.env.DB_PASS;
const mongoURI = `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.qn9faxx.mongodb.net/?retryWrites=true&w=majority`;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, String(Date.now()) + '-' + file.originalname);
  },
});


export const upload = multer({
  storage,
  fileFilter(req, file, cb) {

    if (!file.originalname.match(/\.(json|csv)$/)) {
      return cb(new Error('File format should be .json/.csv'))
    }

    cb(undefined, true)  // accepting the upload
  }

});


//connection for gfs
// const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
// let gfs;//init gfs
// let gridFSBucket;
// conn.once('open', () => { // fxn that once connection with db is done then do this
//   //init stream
//   gfs = Grid(conn.db, mongoose.mongo);
//   gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: "uploads" });

//   gfs.collection("uploads");
// })


// //create storage engine
// const storage = new GridFsStorage({
//   url: mongoURI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => { // crypto is being used here to generate file name from i/p file
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);

//         const fileInfo = {
//           filename: filename,
//           bucketName: "uploads" // same as collection name
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });

// const upload = multer({ storage });

// export { conn, upload, gfs, gridFSBucket };