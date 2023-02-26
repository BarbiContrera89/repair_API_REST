const User = require("../models/user.models");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");


exports.protect = catchAsync(async (req, res, next) => {
let token

if(
    req.headers.authorization && req.headers.authorization.startWith('Bearer')
){
    token = req.headers.authorization.split(' ')[1]
}

if (!token) {
    return next(
        new AppError('you are not logged in! Please log in to get access', 401)
    )
}

const decoded = await promisify(jwt.verify)(
    token,
    proccess.env.SECRET_JWT_SEED
)

const user = await User.findOne({
    where: {
        id: decoded.id,
        status: true,
    }
})

if(!user) {
    return next(
        new AppError('The owner of this  token itnot longer available', 401)
    )
}

req.sessionUser = user
next()
})

exports.protectAccountOwner = catchAsync(async (req, res, next ) => {
    const { user, sessionUser} = req

    if(user.id !== sessionUser.id){
        return next(new AppError('You do not own this account', 401))
    }

    next()
})

exports.restrictTo = (...roles) => {

    return (req, res, next) => {
        if (!roles.includes(req.sessionUser.role)){
        return next(
            new AppError('You do not have permission to perform this action', 403)
        )
        }

        next()
    }
}