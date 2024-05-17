declare module '*.module.css' {
    interface Styles {
        [key: string]: string;
    }
    const content: Styles;
    export default content
}