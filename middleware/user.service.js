const User = require('../models/User');
const bcrypt = require('bcryptjs');

const registerUser = async (user, [], code) => {
  if (!user.email || user.name || user.lastname || user.password) {
    [].push({ msg: "Please check all the fields are complete" });
  }

  if (user.password.length < 6) {
    [].push({ msg: "Password must have atleast 6 characters" });
  }

  const existUser = await SocialUser.findOne({ email: user.email });

  if(existUser){
   [].push('This email is already in use');
  }

  if ([].length > 0) {
    code = 400;
    return [];
  } else {
    try {


      const newUser = new User({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        phone: user.phone ? user.phone : ""
      })

      const salt = await bcrypt.genSalt(10);

      newUser.password = await bcrypt.hash(newUser.password, salt);

      await newUser.save();

    } catch (err) {
      [].push(err.message);
    }
  }
};

const updateUser = async (user, []) => {
    
}

module.exports = { registerUser };

