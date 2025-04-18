import { IChange, IComponent, IControl, IControlUpdate } from '../../index.interface';
import { EventManager, ChangeRequestManager } from '..';
import { JSONRPCMessage } from '../../utils';
import { ControlDecorator } from './ControlDecorator';
export default class ControlManager {
    private webSocketSend;
    private eventManager;
    private changeRequestManager;
    components: Record<string, IComponent>;
    constructor(webSocketSend: (message: JSONRPCMessage) => void, eventManager: EventManager, changeRequestManager: ChangeRequestManager);
    decorateControl(control: IControl): ControlDecorator;
    handleControlChanges(changes: IChange[]): void;
    setWebSocketSend(send: (message: JSONRPCMessage) => void): void;
    updateControls(newControl: ControlDecorator): void;
    addComponent(component: IComponent, componentName: string): void;
    setComponent(componentName: string, controlToUpdate: IControlUpdate): void;
    private controlChangeCallback;
    getControl(componentName: string, controlName: string): ControlDecorator | undefined;
    createUpdatedControl(oldControl: IControl, updatedControl: IControl): ControlDecorator;
    getComponentNames(): string[];
    getControlNamesByComponent(componentName: string): string[];
    cleanUp(): void;
}
