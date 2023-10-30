const User = require("../model/User");

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res
                .status(400)
                .json({ msg: "Please provide necessary information" });
        }
        const user = await User.create(req.body);
        const token = user.createJWT();
        res.status(200).json({
            msg: "user created",
            token,
            username: user.username,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ msg: "Something went wrong, try later!" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({ msg: "Please provide necessary informations" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(400).json({ msg: "Invalid email!" });
    }
    //compare password
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        return res.status(400).json({ msg: "Invalid password!" });
    }
    const token = user.createJWT();
    res.status(200).json({ msg: "user found", token, username: user.username });
};

const dashboard = async (req, res) => {
    res.status(200).json({ msg: "success" });
};

module.exports = { register, login, dashboard };
