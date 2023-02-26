const { Router } = require('express');
const { check } = require('express-validator');
const {
  allMotorcyclePending,
  findMotorcyclePending,
  newMotorcycleRepair,
  statusMotorcycle,
  cancelRepair,
} = require('../controllers/repair.controller');
const { protect, restrictTo,  } = require('../middlewares/auth.middlewares');
const { validRepairById } = require('../middlewares/repair.middlewares');
const { validateFields } = require('../middlewares/validateField.middlewares');

const router = Router();

router.use(protect)

router.get('/', restrictTo('employee'), allMotorcyclePending);

router.get('/:id', restrictTo('employee'), validRepairById, findMotorcyclePending);

router.post(
  '/',
  [
    check('date', 'The date must be mandatory').not().isEmpty(),
    check('email', 'The date must correct format').not().isDate(),
    check('useId', 'The name must be mandatory').not().isEmpty(),
    check('description', 'The descrption must be mandatory').not().isEmpty(),
    check('motorsNumber', 'The motorsNumber must be mandatory').not().isEmpty(),

    validateFields,
  ],
  newMotorcycleRepair
);

router.patch(
  '/:id',
  [
    check('status', 'The name must be mandatory').not().isEmpty(),
    validRepairById,
    restrictTo('employee'),
  ],
  statusMotorcycle
);

router.delete('/:id', restrictTo('employee'), validRepairById, cancelRepair);

module.exports = {
  repairRouter: router,
};
