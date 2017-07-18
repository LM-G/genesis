import {CONTAINER} from '../../config/Inversify';
import {BaseController} from '../controller/BaseController';
export function Singleton(): Function{
    return function<T extends BaseController>(target: T ){

    }
}