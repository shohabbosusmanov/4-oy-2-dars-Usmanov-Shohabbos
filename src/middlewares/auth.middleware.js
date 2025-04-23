import JwtService from "../services/jwt.service.js";
import CustomError from "../utils/custom_error.js";

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return next(new CustomError("invalid token", 401));
    }

    try {
        const jwtService = new JwtService();
        const user_id = jwtService.verify(token, res);

        req.user_id = user_id;
        next();
    } catch (err) {
        next(err);
    }
};
