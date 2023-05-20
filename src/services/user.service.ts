import UserModel from "../models/user";
import { NotFoundError, BadRequestError } from '../errors';
import dayjs from "dayjs";

const userService = {
    async createUser (
        name: string, 
        lastName: string, 
        email: string, 
        hashedPassword: string, 
        token: string, 
        roleId: number
    ){
        const userData = {
            name,
            last_name: lastName,
            email,
            password: hashedPassword,
            token,
            role_id: roleId,
            status_id: 1,
            deleted: false,
            login_methods: {
                create: [{
                    login_method: {
                        connect: {
                            id: 1
                        }
                    }
                }]
            }
        };
        const newUser = await UserModel.create(userData);
        // await userService.createClient(newUser.id);
        // mailService.sendWelcomeEmailClient(
        //   newUser.email,
        //   newUser.name,
        //   token,
        //   newUser.id
        // );
        return newUser;
    },

    async confirmAccountUser (token: string, userId: string) {
        const user = await UserModel.findById(userId);
        if ( !user || user.deleted ) throw new NotFoundError();
        if (token !== user.token) throw new BadRequestError('Token not valid');
        if (user.status_id !== 1) throw new BadRequestError('User account was already verified');
        const limitDate = dayjs(user.updated_at).add(1, 'hours');
        if (dayjs().isAfter(limitDate)) throw new BadRequestError('Token expired');
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: userId },
            { status_id: 2 },
            { new: true }
        );
        // mailService.sendConfirmEmailSuccess(
        //     updatedUser.email,
        //     updatedUser.name,
        //     process.env.URL_BASE_FRONTEND_CLIENT!
        // );
        return updatedUser;
    },

    async findUserByEmail (email: string) {
        const user = await UserModel.findOne({ email: email });
        if (!user) throw new BadRequestError('Email not registered');
        return user;
    }
}

export default userService;