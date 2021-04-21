import hasPrefix from "./hasPrefix";

export default function normalize(str): string {
    const url: string = !hasPrefix(str) ? "/" + str : str;
    return url;
}
