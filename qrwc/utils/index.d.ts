import { IChange, IComponentChangeGroup, IRequestChanges, IRequestControls, IRequestPoll } from '../index.interface';
export type JSONRPCMessage = ReturnType<typeof createJSONRPCMessage>;
export declare const createJSONRPCMessage: (method: string, params: 'test' | IRequestChanges | IRequestControls | IComponentChangeGroup | IRequestPoll, id: string | number) => {
    jsonrpc: string;
    method: string;
    params: IComponentChangeGroup | IRequestChanges | IRequestControls | IRequestPoll | "test";
    id: string | number;
};
export declare function isValidControlChange(control: IChange): control is IChange;
