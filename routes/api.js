import express from "express";
import UserController from "../controllers/userController.js";
import ResumeController from "../controllers/resumeController.js";
import CategoryController from "../controllers/categoryController.js";
import CategoryImageController from "../controllers/categoryImageController.js";
import Authentication from "../middleware/auth.js";
import multer from "multer";
import bodyParser from "body-parser";

const Router = express.Router();
Router.use(bodyParser.json());

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
const cpUpload = upload.fields([
  { name: "photo", maxCount: 1 },
  { name: "cv", maxCount: 1 },
]);

// ##### User-Router #####

//USER CREATE
Router.post("/userCreate", upload.single("file"), UserController.userRegister);

//USER LOGIN
Router.post("/userLogin", UserController.userLogin);

//LOGOUT
Router.delete("/logout", Authentication, UserController.logout);

//Forgot-Password
Router.put("/forget-password", UserController.forgetPassword);

//Profile Update
Router.put("/userProfileUpdate", Authentication, UserController.updateProfile);

//Get user by id
Router.post("/getUserById", Authentication, UserController.getUserById);

//Get users
Router.get("/getUsers", Authentication, UserController.getUsers);

Router.post(
  "/createResume",
  upload.single("file"),
  ResumeController.submitResume
);

Router.get("/getResume", ResumeController.getResumeList);
Router.post("/getResumeById", ResumeController.getResumeByIdList);

Router.post(
  "/createCategory",
  Authentication,
  CategoryController.submitCategory
);
Router.get("/getCategory", CategoryController.getCatergoryList);

Router.post(
  "/create-category-image",
  Authentication,
  upload.single("image"),
  CategoryImageController.submitCategoryImage
);
Router.get("/getCategoryImage", CategoryImageController.getCatergoryImageList);
Router.post("/getCategoryImageById", CategoryImageController.getCatergoryImageByIdList);

export default Router;
