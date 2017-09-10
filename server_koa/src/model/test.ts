import { Document } from '../core/decorator/document';
import {Id} from '../core/decorator/field';

@Document({
    name: 'Test'
})
export class Test {
    @Id()
    idTest: string;
}