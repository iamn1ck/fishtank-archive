export {}

declare module '*.module.css';

declare global {
    interface Window { [key: string]: any }
}
