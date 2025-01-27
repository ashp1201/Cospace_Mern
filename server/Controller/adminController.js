import AdminModel from "../Model/admin.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
//import ENV from '../config.js';
import dotenv from 'dotenv';

export async function adminlogin(req, res) {
    const { email, password } = req.body;

    try {
        // Use async/await with findOne
        const admin = await AdminModel.findOne({ email }).exec();

        if (!admin) {
            return res.status(404).send({ error: "Admin Email not Found" });
        }

        console.log("Retrieved admin:", admin);

        // Ensure password is not empty or undefined
        if (!password) {
            return res.status(400).send({ error: "Password is required" });
        }

        bcrypt.compare(password, admin.password)
            .then(passwordCheck => {
                console.log("Password check result:", passwordCheck);

                if (!passwordCheck) {
                    return res.status(400).send({
                        error: "Incorrect Password"
                    });
                }

                const token = jwt.sign({
                    adminId: admin._id,
                    email: admin.email
                },process.env.JWT_SECRET, { expiresIn: "24h" });

                return res.status(200).send({ msg: "Login Successful..!", email: admin.email, token });
            })
            .catch(error => {
                console.log(error.message);
                return res.status(400).send({ error: error.message, e: error.message });
            });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error });
    }
}
