import { IComponent } from '../index.interface';
export declare const qrcMethods: {
    readonly components: {
        readonly getComponents: "Component.GetComponents";
        readonly getControls: "Component.GetControls";
        readonly set: "Component.Set";
    };
    readonly changeGroup: {
        readonly poll: "ChangeGroup.Poll";
        readonly addControl: "ChangeGroup.AddControl";
        readonly addComponentControl: "ChangeGroup.AddComponentControl";
    };
};
export declare const QrwcPollReset = 30000;
export declare const QrwcMinPollInterval = 34;
export declare const QrwcDefaultPollInterval = 350;
export declare const qrwcMockComponentGetResult: IComponent;
