import User from "../models/userModel.js";
import RESUME from "../models/resumeModel.js";
import Validator from "validatorjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import reply from "../common/reply.js";
import Token from "../models/tokenModel.js";
import crypto from "crypto";
import Mail from "../common/Mail.js";
import Resume from "../models/resumeModel.js";

function makeid() {
  return crypto.randomBytes(20).toString("hex");
}

export default {
  async submitResume(req, res) {
    try {
      let request = req.body;
      if (Object.keys(request).length == 0) {
        return res.json(reply.failed("All input is required!"));
      }
      request.resume =
        req?.file == undefined
          ? req.body.file
          : req?.file?.filename != undefined && req?.file?.filename;
      let validation = new Validator(request, {
        full_name: "required|string",
        email: "required|email",
        primary_contact: "required",
        address: "required",
      });
      if (validation.fails()) {
        let err_key = Object.keys(Object.entries(validation.errors)[0][1])[0];
        return res.json(reply.failed(validation.errors.first(err_key)));
      }
      // let exist = await RESUME.findOne({ email: request.email });
      // if (exist) {
      //   return res
      //     .status(403)
      //     .send({ message: "This resume is already exists!" });
      // }
      // const user = await USER.create(request);
      // let nrequest = { ...request, user_id: user._id };
      let resume = await RESUME.create(request);
      return res.status(201).send({
        status_code: 200,
        resume: resume,
        message: "Resume submit successfully",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  },
  async getResumeList(req, res) {
    try {
      const resume = await RESUME.find();
      return res.status(200).json(resume);
    } catch (err) {
      return res.status(500).send({ message: "Internal Server Error" });
    }
  },
  async getResumeByIdList(req, res) {
    try {
      const resume = await RESUME.find({ user_id: req.body.id });
      return res.status(200).json(resume);
    } catch (err) {
      return res.status(500).send({ message: "Internal Server Error" });
    }
  },
};
