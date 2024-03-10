const express = require('express');
const router = express.Router();
const Account = require('../models/account.model');
const auth = require('../middlewares/auth');
const { default: mongoose } = require('mongoose');

router.get('/balance', auth, async (req, resp) => {
    const userId = req.userId;

    try {
        const balance = await Account.findOne({ userId });
        return resp.status(200).json(balance);

    } catch (error) {
        console.log("🚀 ~ router.get ~ error:", error)

        resp.status(500).json({
            message: "Error while getting information"
        });
    }
})


router.post('/transfer', auth, async (req, resp) => {
    const { to, amount } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    //Fetch the account within the transactions
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    };

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient Account"
        });
    };

    //perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    //Commit the transactions
    await session.commitTransaction();

    resp.json({
        message: "Transfer successful"
    })
})

module.exports = router;