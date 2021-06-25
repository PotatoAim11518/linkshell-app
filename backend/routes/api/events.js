const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { check } = require("express-validator");
const { requireAuth } = require("../../utils/auth");
const { Event, User, Location, Group } = require('../../db/models');
const { handleValidationErrors } = require("../../utils/validation");

const validateEvent = [
  check("name")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid event name."),
  check("name")
    .isLength({ min: 3, max: 64 })
    .withMessage("Please provide a group name between 3 and 64 characters."),
  check("date")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a date for this event."),
  check("date")
    .isDate("date", {
      format: "MM/DD/YYYY",
      strictMode: true,
    })
    .withMessage("Please provide a valid date format."),
  check("capacity")
    .exists({ checkFalsy: true })
    .withMessage(
      "Please provide a number of guests."),
  check("capacity")
    .isInt({ min: 0, max: 9999 })
    .withMessage(
      "Please provide a number of guests between 0 and 9999."),
  check("locationId")
    .exists({ checkFalsy: true })
    .withMessage("Please select a location for your event."),
  handleValidationErrors,
];

// GET / ---> Get all events
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const { limit } = req.body;
    const events = await Event.findAll({
      include: [
        { model: User, attributes: ["username"] },
        { model: Location, attributes: ["name", "locale"] },
        { model: Group, attributes: ["name"] },
      ],
      order: [
        ['date', 'DESC']
      ],
      limit,
    })
    res.json(events);
  }))

// GET /:id ---> Get one specific event
router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const events = await Event.findAll({
      include: [
      { model: User, attributes: "username" },
      { model: Location, attributes: ["name", "locale"] },
      { model: Group, attributes: ["name"] },
    ]
  })
  res.json(events);
}))

// GET / ---> Get one host's events
router.get(
  '/user/:userId',
  asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const { limit } = req.body;
    const events = await Event.findAll({
      where: {
        hostId: userId
      },
      include: [
        { model: User, attributes: ["username"] },
        { model: Location, attributes: ["name", "locale"] },
        { model: Group, attributes: ["name"] },
      ],
      order: [
        ['date', 'DESC']
      ],
      limit,
    })
    res.json(events);
  }))

// POST /   ---> Create new Event
router.post(
  "/",
  validateEvent,
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const newGroup = await Group.create(req.body);
    return res.json(newGroup);
  })
);
// // PUT /   ---> Update Event
// router.put(
//   "/:id",
//   validateGroup,
//   requireAuth,
//   asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const editGroup = await Group.update(req.body, {
//       where: {
//         id: id,
//       },
//     });
//     return res.json(editGroup);
//   })
// );

  module.exports = router;
