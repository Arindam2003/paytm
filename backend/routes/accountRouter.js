const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { Account } = require('../Schema/account.schema');
const { default: mongoose } = require('mongoose');
const { User } = require('../Schema/user.schema');
const router = express.Router();

router.get('/balance', authMiddleware, async (req, res) => {
    const account = await Account.findOne({userId: req.userId});
    
    if (!account) {
        return res.status(404).json({ message: "Account not found" });
    }

    res.json({
        balance: account.balance
    })
})

router.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { toUsername, amount } = req.body;

        if (!toUsername || !amount || amount <= 0) {
            return res.status(400).json({ message: "Invalid input..." });
        }

        const toUser = await User.findOne({
            username: toUsername
        }).session(session);

        if (!toUser) {
            throw new Error("Recipient not found");
        }

        if (toUser._id.toString() === req.userId) {
            return res.status(400).json({ message: "Cannot transfer to self" });
        }

        //! sender (me)
        const account = await Account.findOne({ userId: req.userId }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        //! recipent account...(firends)
        const toAccount = await Account.findOne({ userId: toUser._id }).session(session);
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Recipient account not found" });
        }

        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);

        await Account.updateOne({ userId: toUser._id }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();

        res.json({
            message: "Transfer successful"
        });
    } catch (err) {
        await session.abortTransaction();
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    } finally {
        session.endSession();
    }
})

module.exports = router;