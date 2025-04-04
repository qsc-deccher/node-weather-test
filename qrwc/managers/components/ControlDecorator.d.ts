import { IControl, IControlUpdate } from '../../index.interface';
/**
 * ControlDecorator class
 *
 * This class is used to decorate an Control object, providing getters and setters for its properties.
 * The decorator pattern allows us to add new behavior or responsibilities to objects without modifying their code.
 * This class also provides a method to update the control using a provided function and a method to handle events.
 *
 * The updateQsysDesign method is used to update a property on the control and triggers an update request of the parent component.
 * The getMetaProperty method returns the value of a requested property, or undefined if the property does not exist.
 * If the property does not exist, an error event is also emitted.
 */
export declare class ControlDecorator {
    private control;
    private setComponent;
    private emit;
    /**
     * ControlDecorator constructor
     * @param control - The control to decorate
     * @param setComponent - The function to use to update the control
     * @param emit - The function to handle events
     */
    constructor(control: IControl, setComponent: (componentName: string, controlToUpdate: IControlUpdate) => void, emit: (event: string, message?: string) => void);
    /**
     * Getters and setters for the properties of the control.
     * These getters and setters allow users to access and update the properties of the control.
     */
    get Name(): string;
    get Component(): string;
    get Value(): string | number | boolean;
    set Value(value: string | number | boolean);
    get String(): string;
    set String(string: string);
    get Position(): number;
    set Position(position: number);
    get Choices(): string[];
    /**
     * Getter for Bool. Bool is a facade, as it does not exist on QRC controls.
     * We're providing this getter to allow users easier access to Qsys Booleans.
     * This getter checks if the Position is 0.5 or greater and returns true if it is, false otherwise.
     * This follows the Q-SYS convention
     * @returns {boolean} True if Position is 0.5 or greater, false otherwise.
     */
    get Bool(): boolean;
    /**
     * Setter for Bool. Bool is a a facade, as it does not exist on QRC controls.
     * We're providing this setter to allow users easier access to Qsys Booleans.
     * It also converts true to 1 and false to 0, for compatibility with Q-SYS.
     * @param {boolean} value - The new value for the Position property.
     */
    set Bool(value: boolean);
    get Type(): string;
    /**
     * Updates a property on the control and triggers an update request of the parent component.
     * This private method is used by the setters to update the control and trigger an update request of the parent component.
     *
     * @param value - The new value for the control.
     */
    private updateQsysDesign;
    /**
     * Returns a deep copy of all the properties of the control.
     *
     * This method uses JSON.parse and JSON.stringify to create a deep copy of the control object.
     * This ensures that modifications to the returned object do not affect the original control.
     * This is provided as a convenience method to allow users to access all the properties of the control.
     *
     * @returns A deep copy of the control's properties.
     * @example
     * const properties = controlDecorator.getProperties();
     * console.log(properties);
     * // { Name: 'Control Name', Component: 'Component Name', Value: 'Control Value', String: 'Control String', Position: 1, Type: 'Control Type' }
     */
    getProperties(): IControl;
    /**
     * Gets a property from the control that is not defined in the IControl interface.
     *
     * If the property does not exist, an error event is emitted and the function execution ends.
     * This is provided as a convenience method to allow users to access properties that are not defined in the IControl interface.
     *
     * @param propertyName - The name of the property to get.
     * @returns The value of the property, or undefined if the property does not exist.
     * @example
     * const valueMin = controlDecorator.getMetaProperty('ValueMin');
     * console.log(valueMin);
     * // Output: The minimum value of the control, or undefined if the 'ValueMin' property does not exist.
     */
    getMetaProperty(propertyName: string): string | number | boolean | string[] | undefined;
}
