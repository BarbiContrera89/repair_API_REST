const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/user.models');
const bcrypt = require('bcryptjs')
const generateJWT = require('../utils/jwt');

exports.allUsers = catchAsync(async (req, res, next) => {
  const allUsers = await User.findAll({
    where: {
      status: 'available',
    },
  });
  res.status(200).json({
    status: 'success',
    message: 'Find all Usert',
    allUsers,
  });
});

exports.user = catchAsync(async (req, res, next) => {
  const { user } = req;

  res.status(200).json({
    status: 'success',
    menssage: 'Find user',
    user,
  });
});

exports.newUser = catchAsync(async (req, res, next) => {
  const { name, email, password, status, role } = req.body;

  const user = new User({
    name,
    email: email.toLowerCase(),
    password,
    role,
    status,
  });

  const salt = await bcrypt.genSalt(10)

  user.password = await bcrypt.hash(password, salt)

  await user.save()

  const token = await generateJWT(user.id)

res.status(201).json({
  status: 'success',
  message: 'User created successfully',
  token,
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
})
})

exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  const { name, email } = req.body;

  const updateUser = await user.update({
    name,
    email: email.toLowerCase(),
  });

  res.status(200).json({
    status: 'success',
    menssage: 'Update user',
    updateUser,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: 'unavailable' });

  res.status(200).json({
    status: 'success',
    message: 'The user has been deleted successfully',
  });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
      status: 'available',
    },
  });

  if (!user) {
    return next(new AppError(' the user could not be found', 404));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('incorrect email or password', 401));
  }

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});