

export class StringUtils {
    public toUpperCase(arg: string) {

        if(!arg) {
            throw new Error("Invalid argument!");
        }

        return toUpperCase(arg);
    }
}

export function toUpperCase(arg: string) {
    return arg.toLocaleUpperCase();
}

export type stringInfo = {
    lowerCase: string,
    upperCase: string,
    characters: string[],
    length: number,
    extraInfo: Object | undefined
}

export function getStringInfo(arg: string): stringInfo {
    return {
        lowerCase: arg.toLocaleLowerCase(),
        upperCase: arg.toLocaleUpperCase(),
        characters: Array.from(arg),
        length: arg.length,
        extraInfo: {}
    }
}