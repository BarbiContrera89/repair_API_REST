const { Router } = require('express');
const { check } = require('express-validator');
const {
  allMotorcyclePending,
  findMotorcyclePending,
  newMotorcycleRepair,
  statusMotorcycle,
  cancelRepair,
} = require('../controllers/repair.controller');
const { validRepairById } = require('../middlewares/repair.middlewares');
const { validateFields } = require('../middlewares/validateField.middlewares');

const router = Router();

router.get('/', allMotorcyclePending);

router.get('/:id', validRepairById, findMotorcyclePending);

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
  ],
  statusMotorcycle
);

router.delete('/:id', validRepairById, cancelRepair);

module.exports = {
  repairRouter: router,
};
