const express = require('express');
const router = express.Router();
const zod = require('zod');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
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
        return resp.status(411).json({ message: "Email already taken / Incorrect inputs" });
    }

    const existingUser = await User.findOne({ username, password, firstName, lastName });

    if (existingUser) {
        return resp.status(411).json({ message: "Email already taken/Incorrect input" });
    }

    const user = await User.create(req.body);

    const token = jwt.sign({ id: user._id, email: user.username }, process.env.ACCESS_TOKEN_SECRET);

    resp.json({
        message: "User created successfully",
        token: token
    })
});

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

router.get('/', async (req, resp) => {
    const filter = req.query.filter;
    try {
        const users = await User.find({
            $or: [{
                firstName: {
                    "$regex": filter
                }
            }, {
                lastName: {
                    "$regex": filter
                }
            }]
        }).select('-password');;


        resp.status(200).json(users);

    } catch (error) {
        console.log("🚀 ~ router.put ~ error:", error);
        resp.status(500).json({
            message: "Error while searching users"
        });
    }
})

module.exports = router;


