import { IComponent, QrwcEvents } from '../index.interface';
export declare const qrcMethods: {
    components: {
        getComponents: string;
        getControls: string;
        set: string;
    };
    changeGroup: {
        poll: string;
        addControl: string;
        addComponentControl: string;
    };
};
export declare const qrwcEvents: QrwcEvents;
export declare const qrwcPollReset: number;
export declare const qrwcMinPollInterval: number;
export declare const qrwcDefaultPollInterval: number;
export declare const qrwcMockComponentGetResult: IComponent;
