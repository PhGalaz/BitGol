import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'users', timestamps: true } })
class User {
    @prop({ required: true })
    name!: string;
    
    @prop()
    last_name?: string;
    
    @prop({ required: true })
    email!: string;

    @prop({ required: true })
    password!: string;
    
    @prop({ required: true })
    role_id!: number;

    @prop()
    token!: string;

    @prop()
    status_id!: number;

    @prop()
    login_methods: {};

    @prop()
    deleted: boolean;

    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}

const UserModel = getModelForClass(User);
export default UserModel;
