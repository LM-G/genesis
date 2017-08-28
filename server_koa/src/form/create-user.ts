import {Contains, Length} from 'class-validator';

export class CreateUserForm {
    @Length(6, 32)
    username : string;

    @Length(8, 64)
    password: string;

    @Contains('toto')
    email: string
}