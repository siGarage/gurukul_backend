import RESUME from "../models/resumeModel.js";
import Validator from "validatorjs";
import reply from "../common/reply.js";
import Category from "../models/categoryModel.js";

export default {
  async submitCategory(req, res) {
    try {
      let request = req.body;
      if (Object.keys(request).length == 0) {
        return res.json(reply.failed("All input is required!"));
      }
      let validation = new Validator(request, {
        name: "required|string",
      });
      if (validation.fails()) {
        let err_key = Object.keys(Object.entries(validation.errors)[0][1])[0];
        return res.json(reply.failed(validation.errors.first(err_key)));
      }
      let exist = await Category.findOne({ name: request.name });
      if (exist) {
        return res
          .status(403)
          .send({ message: "This category is already exists!" });
      }
      // const user = await USER.create(request);
      // let nrequest = { ...request, user_id: user._id };
      let categoryAdd = await Category.create(request);
      return res.status(201).send({
        status_code: 201,
        category: categoryAdd,
        message: "Catergory submit successfully",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  },
  async getCatergoryList(req, res) {
    try {
      const catergory = await Category.find();
      return res.status(200).json(catergory);
    } catch (err) {
      return res.status(500).send({ message: "Internal Server Error" });
    }
  },
};
