// import { World } from "../scripts/World.js"
declare interface Window {
    experience: any;
    AppEvent: {
        subscribers: Record<string, Function[]>;
        dispatch: (event: string, payload?: any) => void;
        listen: (event: string, cb: Function) => () => void;
    };
    loaded: boolean
    audio: HTMLAudioElement & { index: number } | null
}