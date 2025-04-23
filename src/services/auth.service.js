import { prisma } from "../app.js";
import bcrypt from "bcryptjs";
import JwtService from "./jwt.service.js";
import CustomError from "../utils/custom_error.js";
import ValidationService from "./validation.service.js";

export default class AuthService {
    constructor() {
        this.jwtService = new JwtService();
        this.validationService = new ValidationService();
    }

    async register(data) {
        await this.validationService.userRegisterValidation(data);

        const hashedPassword = await bcrypt.hash(data.password, 12);

        data = { ...data, password: hashedPassword };

        const user = await prisma.user.create({
            data,
            select: {
                id: true,
                first_name: true,
                last_name: true,
                username: true,
                password: false,
                created_at: true,
                updated_at: true,
            },
        });

        return user;
    }

    async login(data) {
        await this.validationService.loginValidation(data);

        const { username, password } = data;

        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            throw new CustomError("username or password incorrect", 400);
        }

        const check = await bcrypt.compare(password, user.password);

        if (!check) {
            throw new CustomError("username or password incorrect", 400);
        }

        const token = this.jwtService.generate(user.id);

        return token;
    }
}
