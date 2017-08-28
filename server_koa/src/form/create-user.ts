import { Contains, IsEmail, Length } from 'class-validator';

export class CreateUserForm {
    @Length(6, 32)
    name : string;

    @Length(8, 64)
    password: string;

    @IsEmail()
    email: string
}