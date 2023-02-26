const { Router } = require('express');
const { check } = require('express-validator');

const {
  allUsers,
  user,
  newUser,
  updateUser,
  deleteUser,
  loginUser,
} = require('../controllers/users.controller');
const { protect, protectAccountOwner } = require('../middlewares/auth.middlewares');
const { validUserById } = require('../middlewares/user.middlewares');
const { validateFields } = require('../middlewares/validateField.middlewares');

const router = Router();

router.post('/login', loginUser)

router.post(
  '/',
  [
    check('name', 'The name must be mandatory').not().isEmpty(),
    check('email', 'The email must be correct format').isEmail(),
    check('email', 'The email must be correct format').isEmail(),
    check('password', 'The password must be mandatory').not().isEmpty(),
    validateFields,
  ],
  newUser
);

router.use(protect)

router.get('/', allUsers);

router.get('/:id', validUserById, user);

router.patch(
  '/:id',
  [
    check('name', 'The name must be mandatory').not().isEmpty(),
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email must be correct format').isEmail(),
    protectAccountOwner,
    validateFields,
    validUserById,
  ],
  updateUser
);

router.delete('/:id', validUserById, deleteUser, protectAccountOwner);

module.exports = {
  usersRouter: router,
};
