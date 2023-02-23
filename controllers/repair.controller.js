const Repair = require('../models/repair.models');
const User = require('../models/user.models');
const catchAsync = require('../utils/catchAsync');

exports.allMotorcyclePending = catchAsync(async (req, res, next) => {
  const allMotorcycle = await Repair.findAll({
    where: {
      status: 'pending',
    },
    include:[
      {model: User}
    ]
  });

  res.status(200).json({
    status: 'success',
    message: 'Find all Users',
    allMotorcycle,
  });
});

exports.findMotorcyclePending = catchAsync(async (req, res, next) => {
  const { repair } = req;

  res.status(200).json({
    status: 'success',
    message: 'Find Repair successfully',
    repair,
  });
});

exports.newMotorcycleRepair = catchAsync(async (req, res, next) => {
  const { date, userId, status, motorNumber, description } = req.body;

  const newMotorcycle = await Repair.create({
    date,
    status,
    userId,
    motorNumber,
    description
  });
  res.status(200).json({
    status: 'success',
    menssage: 'New motorcycle',
    newMotorcycle,
  });
});

exports.statusMotorcycle = catchAsync(async (req, res, next) => {
  const { repair } = req;

  const { status } = req.body;

  await repair.update({ status });

  res.status(200).json({
    status: 'success',
    message: 'status actualized',
  });
});

exports.cancelRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;

  await repair.update({ status: 'cancelled' });

  res.status(200).json({
    status: 'success',
    message: 'repair cancelled',
  });
});
