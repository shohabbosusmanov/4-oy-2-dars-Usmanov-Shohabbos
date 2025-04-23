import Jwt from "jsonwebtoken";
import CustomError from "../utils/custom_error.js";

export default class JwtService {
    constructor() {
        this.secret = process.env.JWT_SECRET;
    }

    generate(id, expiresIn = "2h") {
        const token = Jwt.sign({ id }, this.secret, { expiresIn });

        return token;
    }

    verify(token, res) {
        try {
            const payload = Jwt.verify(token, this.secret);

            return payload.id;
        } catch (err) {
            res.clearCookie("token");

            throw new CustomError("invalid token", 401);
        }
    }
}
