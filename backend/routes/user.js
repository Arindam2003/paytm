const express = require('express');
const zod = require('zod');
const { User } = require('../Schema/user.schema');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();
const {Account} = require('../Schema/account.schema')
const bcrypt = require('bcryptjs')

const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
    firstname: zod.string(),
    lastname: zod.string()
})
router.post('/signup', async (req, res) => {
    const body = req.body;
    const { success } = signupBody.safeParse(body);

    if (!success) {
        return res.status(400).json({
            message: "Invaid input"
        })
    }
    else {
        try {
            const user = await User.findOne({
                username: body.username
            })

            if (user) {
                return res.status(409).json({
                    message: "Email already exist"
                })
            }

            const hash = await bcrypt.hash(req.body.password, 10);

            const newUser = await User.create({
                username: body.username,
                password: hash,
                firstname: body.firstname,
                lastname: body.lastname
            });

            const userId = newUser._id;
            const initialAmount = Math.round(1 + Math.random() * 10000);

            await Account.create({
                userId,
                balance: initialAmount
            });

            if (!process.env.JWT_SECRET) {
                throw new Error("JWT_SECRET not set");
            }


            const token = jwt.sign({
                userId: newUser._id
            }, process.env.JWT_SECRET)

            res.json({
                message: "User created Successfully",
                token: token,
                initialAmount: initialAmount
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({
                msg: "Internal Server error"
            });
        }
    }
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})
router.post("/signin", async (req, res) => {
    const body = req.body;
    const { success } = signinBody.safeParse(body);

    if (!success) {
        return res.json({
            message: "Invalid Input"
        })
    }
    try {
        const user = await User.findOne({
            username: body.username
        });

        if (!user) {
            return res.status(401).json({
                message: "Incorrect username or password"
            });
        }

        const match = await bcrypt.compare(req.body.password, user.password);

        if (!match) {
            return res.status(401).json({
                message: "Incorrect username or password"
            });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET not set");
        }


        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET);

        return res.json({
            message: "Signin successfully",
            token: token
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal Server error"
        });
    }
})

const updateBody = zod.object({
    username: zod.string().optional(),
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional()
});
router.put("/update", authMiddleware, async (req, res) => {
    const updateDetails = req.body;

    const { success } = updateBody.safeParse(updateDetails);

    if (!success) {
        return res.status(411).json({
            message: "Error while updating information"
        })
    }

    try {

        if (updateDetails.password) {
            updateDetails.password = await bcrypt.hash(updateDetails.password, 10);
        }

        await User.updateOne({
            _id: req.userId
        }, updateDetails)

        return res.json({
            message: "Updated successfully"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal Server error"
        });
    }
})

router.get("/people", authMiddleware,async (req, res) => {
    const filter = req.query.filter || "";
    const regex = new RegExp(filter, "i");

    const users = await User.find({
        $or: [
            { firstname: regex },
            { lastname: regex }
        ]
    });

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })
})


module.exports = router;