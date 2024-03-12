const express = require('express');
const router = express.Router();
const zod = require('zod');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Account = require('../models/account.model');
const auth = require('../middlewares/auth')

//Zod input validations
const userSchema = zod.object({
    username: zod.string().email().nonempty(),
    password: zod.string().min(5, { message: "Must be 5 or more characters long" }).nonempty(),
    firstName: zod.string().nonempty(),
    lastName: zod.string().nonempty()
});

const updateBodySchema = zod.object({
    password: zod.string().min(5, { message: "Must be 5 or more characters long" }),
    firstName: zod.string(),
    lastName: zod.string()
});

const signinBodySchema = zod.object({
    username: zod.string().email().nonempty(),
    password: zod.string().min(5, { message: "Must be 5 or more characters long" }).nonempty(),
});

router.post('/signup', async (req, resp) => {
    const { username, password, firstName, lastName } = req.body;
    const validationResult = userSchema.safeParse(req.body);

    if (!validationResult.success) {
        const errorMessage = validationResult.error.errors.map(error => {
            return {
                field: error.path.join('.'),
                message: error.message
            }
        })
        console.log("🚀 ~ errorMessage ~ errorMessage:", errorMessage)
        return resp.status(411).json({ message: "Email already taken / Incorrect inputs" });
    }

    const existingUser = await User.findOne({ username});
    console.log("🚀 ~ router.post ~ existingUser:", existingUser)

    if (existingUser) {
        return resp.status(411).json({ message: "Email already taken/Incorrect input" });
    }

    const user = await User.create(req.body);

    //Give user some money in their account
    await Account.create({
        userId: user._id,
        balance: (1 + Math.random() * 10000).toFixed(2)
    })

    const token = jwt.sign({ id: user._id, email: user.username }, process.env.ACCESS_TOKEN_SECRET);

    resp.json({
        message: "User created successfully",
        token: token
    })
});


router.get('/detail', auth, async (req, resp) => {
    const userId = req.userId;
    console.log("🚀 ~ router.get ~ userId:", userId);

    try {
        const user = await User.findOne({ _id: userId }).select('-password');

        if (!user) {
            resp.status(400).json({ message: 'User is not available' })
        }
    
        resp.status(200).json(user);
    } catch (error) {
        console.log("🚀 ~ router.get ~ error:", error)
        resp.status(411).json({ message: "Error white fetching user details" });
    }
});

router.post('/signin', async (req, resp) => {
    const { username, password } = req.body;
    const validationResult = signinBodySchema.safeParse(req.body);

    if (!validationResult.success) {
        const errorMessage = validationResult.error.errors.map(error => {
            return {
                field: error.path.join('.'),
                message: error.message
            }
        })
        console.log("🚀 ~ errorMessage ~ errorMessage:", errorMessage)
        return resp.status(411).json({ message: "Email already taken / Incorrect inputs" });
    }

    try {
        const user = await User.findOne({ username });
        console.log("🚀 ~ router.post ~ user:", user)

        if (!user) {
            return resp.status(401).json({ message: "Invalid username or password" });
        }


        if (password != user.password) {
            return resp.status(401).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET);
        resp.json({
            message: "User logged in successfully",
            token: token
        })


    } catch (error) {
        console.log("🚀 ~ router.post ~ error:", error)
        resp.json({ message: 'Error while  login for user' });
    }
})

router.put('/', auth, async (req, resp) => {
    const { password, firstName, lastName } = req.body;
    const { success } = updateBodySchema.safeParse(req.body);

    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    try {
        await User.updateOne({ _id: req.userId }, { $set: { password, firstName, lastName } });
        resp.status(200).resp.json({
            message: "Updated successfully"
        })

    } catch (error) {
        console.log("🚀 ~ router.put ~ error:", error);
        resp.status(500).json({
            message: "Error while updating information"
        });
    }
});

router.get('/bulk', auth , async (req, resp) => {
    const filter = req.query.filter;
    try {
        const users = await User.find({
            $and: [ // Use $and to combine multiple conditions
                {
                    $or: [
                        { firstName: { "$regex": filter } },
                        { lastName: { "$regex": filter } }
                    ]
                },
                { _id: { $ne: req.userId } } // Exclude the currently logged-in user
            ]
        }).select('-password');


        resp.status(200).json(users);

    } catch (error) {
        console.log("🚀 ~ router.put ~ error:", error);
        resp.status(500).json({
            message: "Error while searching users"
        });
    }
})

module.exports = router;


