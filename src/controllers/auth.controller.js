import AuthService from "../services/auth.service.js";

export default class AuthController {
    constructor() {
        this.authService = new AuthService();
    }

    async register(req, res, next) {
        try {
            const data = req.body;

            const user = await this.authService.register(data);

            res.status(201).json({ message: "success", user });
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const data = req.body;

            const token = await this.authService.login(data);

            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 2,
            });

            res.status(200).json({ message: "success", token });
        } catch (error) {
            next(error);
        }
    }
}
