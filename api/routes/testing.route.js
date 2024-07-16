import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Everything is working. Are you excited?");
});

export default router;
