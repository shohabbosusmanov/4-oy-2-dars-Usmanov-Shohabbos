import Joi from "joi";
import CustomError from "../utils/custom_error.js";

export default class ValidationService {
    async userRegisterValidation(data) {
        try {
            const validate = Joi.object({
                first_name: Joi.string().max(32).required(),
                last_name: Joi.string().max(32).required(),
                username: Joi.string().max(32).required(),
                password: Joi.string().min(6).max(96).required(),
            });

            await validate.validateAsync(data);
        } catch (error) {
            throw new CustomError(error.message, 400);
        }
    }

    async loginValidation(data) {
        try {
            const validate = Joi.object({
                username: Joi.string().required(),
                password: Joi.string().required(),
            });

            await validate.validateAsync(data);
        } catch (error) {
            throw new CustomError(error.message, 400);
        }
    }

    async bookValidation(data) {
        try {
            const validate = Joi.object({
                title: Joi.string().max(128).required(),
                author: Joi.string().max(64).required(),
                user_id: Joi.string().uuid().required(),
            });

            await validate.validateAsync(data);
        } catch (error) {
            throw new CustomError(error.message, 400);
        }
    }
}
