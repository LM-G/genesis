import {ICreateUserForm} from 'genesis-common';
import {IsEmail, Length} from 'class-validator';

export class CreateUserForm implements  ICreateUserForm{
    @Length(6, 32)
    public name : string;

    @Length(8, 64)
    public password: string;

    @IsEmail()
    public email: string
}