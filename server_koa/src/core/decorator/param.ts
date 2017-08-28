import { ActionParamType } from "../metadata/type/param-type";
import { ParamMetadata } from '../metadata/param';
import { registerParamMetadata } from '../index';

export const Param = (name: string) => {
    return registerParam(name, ActionParamType.PATH_PARAM);
};

export const Body = () => {
    return registerParam(null, ActionParamType.BODY);
};

function registerParam(name: string, type: ActionParamType) {
    // get the decorator function
    return function (target: Object, methodName: string, index: number) {
        // gets the parameter action type
        let paramType = (Reflect as any).getMetadata("design:paramtypes", target, methodName)[index];
        /*
        if (paramType) {
            if (paramType instanceof Function && paramType.name) {
                paramType = paramType.name.toLowerCase();
            } else if (typeof this.targetType === "string") {
                paramType = paramType.toLowerCase();
            }
        }*/

        const meta = new ParamMetadata({
            target: target,
            methodName: methodName,
            paramType: paramType,
            index: index,
            type: type,
            name: name,
            required: true
        });

        registerParamMetadata(meta);
    }
}