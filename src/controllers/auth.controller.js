const UserModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function registerUser (req, res) {
    const { fullName: { firstName, lastName }, email, password } = req.body;
    
    const UseralreadyExists = await UserModel.findOne({ email });

    if (UseralreadyExists) {
        return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
        email,
        fullName: { firstName, lastName },
        password: hashedPassword
    })
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully", user: {
            email: user.email,
            _id: user._id,
            fullName: user.fullName
    } })

}


async function LoginUser (req, res) {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" })
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token)
    res.status(200).json({
        message: "User logged in successfully", user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })
}
module.exports = {
    registerUser, LoginUser
}