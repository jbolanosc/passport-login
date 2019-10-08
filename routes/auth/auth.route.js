const router = require("express").Router();
const passport = require("passport");

const { registerUser } = require("../../middleware/user.service");

//Local Auth
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  function(req, res) {
    res.status(200).send({ msg: "Login succesfull" });
  }
);

router.post("/register", (req, res) => {
  const user = req.body;
  const err = [];

  registerUser(user, err, code);

  if (err > 0) {
    res.status(code).send(err);
  } else {
    res.status(200).send({ msg: "User created succesfully" });
  }
});

//Auth logout
router.get("/logout", (req, res) => {
  req.logOut();
  res.send("user logged out");
});

//auth google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", { failureRedirect: "/google" }),
  (req, res) => {
    res.send(req.user);
  }
);

//Auth Facebook
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["profile"] })
);

router.get(
  "/facebook/redirect",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/facebook"
  })
);

module.exports = router;
