import { Application } from "../models/application.model";
import { Job } from "../models/job.model";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "Invalid job id",
        success: false,
      });
    }
    const existingApllication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApllication) {
      return res.status(400).json({
        message: "You have alreaday applied for this job",
        success: false,
      });
    }
    // check if the job exists or not
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    // create new application
    const application = new Application({
      job: jobId,
      applicant: userId,
    });
    job.applications.push(newApplication._id);
    return res.status(201).json({
      message: "Application submitted",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Sever error",
      success: false,
    });
  }
};

export const getApplication = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await Application.find({
      applicant: userId,
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: { path: "company", options: { sort: { createdAt: -1 } } },
      });
    if (!applications) {
      return res.status(404).json({
        message: "No applicatoins found",
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Sever error",
      success: false,
    });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId=req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: { path: "applicant", options: { sort: { createdAt: -1 } } },
    });
    if(!job){
        return res.status(404).json({
          message: "Job not found",
          success: false,
        });
    }
    return res.status(200).json({job,success:true})
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Sever error",
      success: false,
    });
  }

};


export const updateStatus = async(req,res)=>{
  try {
    const {status}= req.params;
    const applicationId = req.params.id;
    if(!status){
      return res.status(400).json({
        message:"Invalid status",
        success: false
      })
    }
    // find the application by applicant id
    const application = await Application.findById({
      _id: applicationId
    })
    if(!application){
      return res.status(404).json({
        message:"Application not found",
        success: false
      })
    }
    //update the status 
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Application status updated",
      success: true
    })
  } catch (error) {
     console.error(error);
     res.status(500).json({
       message: "Sever error",
       success: false,
     });
  }
}
