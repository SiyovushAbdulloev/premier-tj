interface Class {
    [key: string]: boolean
}
export const className = (cls: string, classes?: Class): string => {
    let str = cls
    if (classes) {
        str += ' ' + Object.keys(classes).filter((cl: string) => classes[cl]).join(' ')
    }
    return str
}