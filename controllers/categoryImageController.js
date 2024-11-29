import Validator from "validatorjs";
import reply from "../common/reply.js";
import CategoryImage from "../models/categoryImageModel.js";

export default {
  async submitCategoryImage(req, res) {
    try {
      let request = req.body;
      request.image =
        req?.file == undefined
          ? null
          : req?.file?.filename != undefined && req?.file?.filename;
      if (Object.keys(request).length == 0) {
        return res.json(reply.failed("All input is required!"));
      }
      let validation = new Validator(request, {
        title: "required|string",
      });
      if (validation.fails()) {
        let err_key = Object.keys(Object.entries(validation.errors)[0][1])[0];
        return res.json(reply.failed(validation.errors.first(err_key)));
      }
      let exist = await CategoryImage.findOne({ title: request.title });
      if (exist) {
        return res
          .status(403)
          .send({ message: "This category is already exists!" });
      }
      // const user = await USER.create(request);
      // let nrequest = { ...request, user_id: user._id };
      let categoryImageAdd = await CategoryImage.create(request);
      return res.status(201).send({
        status_code: 201,
        categoryImage: categoryImageAdd,
        message: "Catergory Image submit successfully",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  },
  async getCatergoryImageList(req, res) {
    try {
      const catergory = await CategoryImage.find();
      return res.status(200).json(catergory);
    } catch (err) {
      return res.status(500).send({ message: "Internal Server Error" });
    }
  },
};
