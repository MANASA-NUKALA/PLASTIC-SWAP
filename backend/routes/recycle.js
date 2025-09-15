router.post("/", auth, async (req, res) => {
  try {
    const { amount, description } = req.body; // amount in kg

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Update user stats
    user.recycledPlastics += amount;
    const pointsEarned = amount; // 1 point per kg (customize rule)
    user.points += pointsEarned;

    // Add activity
    user.activities.unshift({
      description: description || `Recycled ${amount} kg plastics`,
      points: pointsEarned,
    });

    await user.save();

    res.json({
      msg: "Recycle data updated",
      user,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
