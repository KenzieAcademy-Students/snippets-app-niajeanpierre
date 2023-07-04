import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models";
import { requireAuth } from "../middleware";

const router = express.Router();

router
  .route("/:id")
  .get(async (req, res) => {
    const populateQuery = { 
      path: "posts",
      populate: { path: "author", select: ["username", "profile_image"] }
    }
    const { id } = req.params;
    const user = await User.findOne(
      {
        username: id,
      }
    )
    .populate(populateQuery);
    if (!user) {
    res.status(404).send()}
    else {
      res.status(200).json(user)
    }
  })
  .put(async (req, res) => {
    const { password, currentPassword} = req.body;
    const { id } = req.params;

    const hashedpassword = await bcrypt.hash(password, 12);
    const user = User.findById(id);
    const matchingPasses = await bcrypt.compare(currentPassword, user.passwordHash)
    
    if (!matchingPasses) {
      return res.status(401).json({ error: "Current password does not match"})
    } else if (password.length < 8 || password.length > 20) {
      return res.status(400).json({ error: "Password must be 8 - 20 characters"})
    } else if (password !== confirmPassword) {
      return res.status(400).json({error: "Passwords do not match."})
    }
    try {
      const userUpdate = await User.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          passwordHash: hashedpassword,
        },
        {
          new: true,
        }
      );

      res.json(userUpdate.toJSON());
    } catch (error) {
      res.status(404).end();
    }
  });

router.route("/:id/avatar").put(requireAuth, async (req, res) => {
  const { id } = req.params;
  const { profile_image } = req.body;

  const user = await User.findOne({username: id});

  if (!user) res.status(404).json({ error: "user not found" });

  user.profile_image = profile_image;
  await user.save();
  res.json(user.toJSON());
});

module.exports = router;
