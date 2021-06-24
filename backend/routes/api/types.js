// backend/routes/api/types.js
const router = require("express").Router();
const asyncHandler = require("express-async-handler");

const { Type } = require("../../db/models");

// GET / ---> Get all types
router.get(
  "/",
  asyncHandler(async (_req, res, next) => {
    const types = await Type.findAll();
    res.json(types);
  })
);

// GET /:id  ---> Get a type
router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const type = await Type.findByPk(id);
    res.json(type);
  })
);

module.exports = router;
