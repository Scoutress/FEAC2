import { Request, Response } from "express";
import UserModel from "../../models/UserModel.ts";
import formatAuthResponse from "../helpers/FormatAuthResponse.ts";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: password123
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token
 *                 user:
 *                   $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Incorrect email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Incorrect email or password
 */

dotenv.config();

const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user || !(await user.isCorrectPassword(password))) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const tokenSecret = process.env.TOKEN_SECRET;
    const tokenExpiration = process.env.TOKEN_EXPIRATION || "1h";

    if (!tokenSecret) {
      console.error("JWT secret is not defined in environment variables");
      return res.status(500).json({ message: "Internal server error" });
    }

    const token = jwt.sign({ id: user._id }, tokenSecret, {
      expiresIn: tokenExpiration,
    });

    return res.status(200).json({
      token,
      user: formatAuthResponse(user),
    });
  } catch (error) {
    console.error("Error during login:", error);
    const typedError = error as Error;
    return res.status(500).json({
      message: "An error occurred during login",
      error: typedError.message,
    });
  }
};

export default login;
