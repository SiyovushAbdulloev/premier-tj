export const isArray = (item: any): boolean => {
    return typeof item === 'object' && item?.constructor === Array
}
