import express from "express";
import authenticationToken from "../middleware/isAuthenticated.js";
import {
  getAdminJob,
  getAllJobs,
  getJobById,
  postJob,
} from "../controllers/job.controller.js";
const router = express.Router();

router.route("/post").post(authenticationToken, postJob);
router.route("/get").get(authenticationToken, getAllJobs);
router.route("/getadminjobs").get(authenticationToken, getAdminJob);
router.route("/get/:id").get(authenticationToken, getJobById);

export default router;
