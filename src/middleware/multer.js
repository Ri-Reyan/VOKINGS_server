import multer from "multer";

const storage = multer.diskStorage({});
const uploads = multer({ storage });

export default uploads;
