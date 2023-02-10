const Job = require("../models/Job");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json(jobs);
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(StatusCodes.NOT_FOUND);
  }
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new NotFoundError(StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json({ job, user });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  console.log(req.body);

  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json(job);
};

const updateJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
    body: { company, position },
  } = req;

  if (company === "" || position === "") {
    throw new BadRequestError();
  }
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError();
  }
  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findByIdAndRemove({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job found by this id ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ msg: `Job with ${jobId} id deleted` });
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
