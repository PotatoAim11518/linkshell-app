// backend/routes/api/groups.js
const router = require('express').Router();
const { check } = require('express-validator');

const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Group, Type, User } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation')

// POST /   ---> Create new Group
router.post(
  '/',
  requireAuth,
  asyncHandler(async (req, res, next) => {
    // const { name, about, typeId, ownerId } = req.body;
})
)

// GET /
router.get(
  '/',
  asyncHandler(async (_req, res, next) => {
    const groups = await Group.findAll({
      include: [
        { model: Type, attributes: ["name"] },
        { model: User, attributes: ["username"] },
      ]
    });
    res.json(groups)
  })
)

// GET /:id
router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const group = await Group.findByPk(id, {
      include: [
        { model: Type, attributes: ["name"] },
        { model: User, attributes: ["username"] },
      ]
    });
    res.json(group)
  })
  )



// DELETE
module.exports = router;
