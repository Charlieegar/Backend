import multer from "multer";
import paths from "./paths.js";
import { generateNameForFile} from "./random.js"

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log("file", file);
        callback(null, paths.images);
    },
    filename: (req, file, callback) => {
        const filename = generateNameForFile(file.originalname);
        callback(null, filename);

    }
});

const uploader = multer({ storage});
 export default uploader;
