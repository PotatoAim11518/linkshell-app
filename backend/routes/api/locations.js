// backend/routes/api/locations.js
const router = require("express").Router();
const asyncHandler = require("express-async-handler");

const { Location } = require("../../db/models");

// GET / ---> Get all locations
router.get(
  "/",
  asyncHandler(async (_req, res, next) => {
    const locations = await Location.findAll();
    res.json(locations);
  })
);

// GET /:id  ---> Get a location
router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const location = await Location.findByPk(id);
    res.json(location);
  })
);

module.exports = router;
