export const className = (cls: string, classes?: any): string => {
    let str = cls
    if (classes) {
        str += ' ' + Object.keys(classes).filter((cl: string) => classes[cl]).join(' ')
    }
    return str
}