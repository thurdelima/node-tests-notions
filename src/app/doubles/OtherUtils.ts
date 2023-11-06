import { v4 } from "uuid";


export type stringInfo = {
    lowerCase: string,
    upperCase: string,
    characters: string[],
    length: number,
    extraInfo: Object
}

type LoggerServiceCallBack = (arg: string) => void;

export function toUpperCase(arg: string) {
    return arg.toUpperCase();
}

export function toLowerCaseWithId(arg: string) {
    return arg.toLocaleLowerCase() + v4();
}




export function calculateComplexity(stringInfo: stringInfo) {
    return Object.keys(stringInfo.extraInfo).length * stringInfo.length;
}


export function toUpperCaseWithCb(arg: string, callBack: LoggerServiceCallBack) {

    if (!arg) {
        callBack('Invalid argument!');
        return;
    }
    callBack(`called function with ${arg}`)
    return arg.toLocaleUpperCase();
}



export class OtherStringUtils {

    public callExternalService() {
        console.log('Calling external service!!!');
    }

    public toUpperCase(arg: string) {
        return arg.toUpperCase()
    }

    public logString(arg: string) {
        console.log(arg);
    }


}