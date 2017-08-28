import { ParamType } from "../metadata/type/param-type";
import { ParamMetadata } from '../metadata/param';
import { registerParamMetadata } from '../index';

export const Param = (name: string) => {
    return registerParam(name, ParamType.PATH_PARAM);
};

export const Body = () => {
    return registerParam(null, ParamType.BODY);
};

function registerParam(name: string, type: ParamType) {
    // get the decorator function
    return function (target: Object, methodName: string, index: number) {
        const meta = new ParamMetadata({
            target: target,
            methodName: methodName,
            index: index,
            type: type,
            name: name,
            required: true
        });
        registerParamMetadata(meta);
    }
}