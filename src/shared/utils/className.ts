export const className = (cls: string, classes?: any, other?: Array<string>): string => {
    let str = cls
    if (classes) {
        str += ' ' + Object.keys(classes).filter((cl: string) => classes[cl]).join(' ')
    }
    if (other && other.length) {
        other.forEach((cl) => {
            str += ' ' + cl
        })
    }
    return str
}
