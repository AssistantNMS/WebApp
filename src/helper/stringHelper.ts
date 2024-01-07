export const itemNameUrlMapper = (orig: string) => {
    return (orig ?? '').replace(/\s/g, '-');
}

export const removeXmlTags = (orig: string) => {
    return (orig ?? '').replace(/(<\w*>)/g, ' ');
}


export const lowercaseAllButCapitaliseFirstChar = (name: string): string => {
    const firstLetter = name.slice(0, 1).toUpperCase();
    const rest = name.slice(1).toLowerCase();
    return firstLetter + rest;
}
