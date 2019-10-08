const express = require("express");
const cookieSession = require("cookie-session");
const config = require("config");
const passport = require('passport');

const passportSetup = require('./config/passport.setup');
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth/auth.route");
const profileRoutes = require("./routes/profiles/profile.route");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.get("session.cookieKey")]
  })
);

//init passport
app.use(passport.initialize());
app.use(passport.session());

// Define Routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.get("/", (req, res) => {
  res.send("Hello there");
});

// Serve static assets in production

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
