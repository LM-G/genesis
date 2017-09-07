import { Document } from '../core/decorator/document';
import { Field } from '../core/decorator/field';
import {Id} from '../core/decorator/id';

@Document({
    name: 'Test'
})
export class Test {
    @Id()
    idTest: string;
}