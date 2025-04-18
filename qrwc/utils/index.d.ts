import { IChange, IComponentChangeGroup, IRequestChanges, IRequestControls, IRequestPoll } from '../index.interface';
export type JSONRPCMessage = ReturnType<typeof createJSONRPCMessage>;
interface IJsonRpcMessage {
    'Component.GetComponents': 'test';
    'Component.GetControls': IRequestControls;
    'Component.Set': IRequestChanges;
    'ChangeGroup.Poll': IRequestPoll;
    'ChangeGroup.AddComponentControl': IComponentChangeGroup;
}
export declare const createJSONRPCMessage: <T extends keyof IJsonRpcMessage, U extends IJsonRpcMessage[T]>(method: T, params: U, id: string | number) => {
    readonly jsonrpc: "2.0";
    readonly method: T;
    readonly params: U;
    readonly id: string | number;
};
export declare function isValidControlChange(control: IChange): control is IChange;
export {};
