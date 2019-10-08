import { FunctionComponent } from 'react';
import { IAddFormProps, IAddFormValue } from '../add_form';
import { IEditFormProps } from '../edit_form';
/**
 * A component with full management of an entity list (add, edit, delete).
 * This component doesn't have a inner state, to refresh element, you need change the property "data"
 */
export declare const SimpleCrud: FunctionComponent<ISimpleCrudProps>;
export interface ISimpleCrudEntityProps<T> {
    /**
     * The entity to manage
     */
    entity: T;
    /**
     * The properties for the component EditForm for each entity
     */
    editFormProps?: Omit<IEditFormProps, 'editAction' | 'deleteAction' | 'isLoading' | 'initValue'>;
}
export interface ISimpleCrudProps {
    /**
     * The list of entity to manage. Can be any object format.
     */
    data: Array<ISimpleCrudEntityProps<object>>;
    /**
     * The id field name in the data object that we use to identify the entity in the list
     */
    idFieldName: string;
    /**
     * The field name of the attribute to display and to edit
     */
    displayFieldName: string;
    /**
     * To show to user that the action is loading
     * @default false
     */
    isLoading?: boolean;
    /**
     * The properties for the component AddForm
     */
    addFormProps?: Omit<IAddFormProps, 'addAction' | 'isLoading'>;
    /**
     * The Function to call when click on add button
     */
    addAction(form: IAddFormValue): void;
    /**
     * The Function to call when click on edit button on item
     */
    editAction(value: object): void;
    /**
     * The Function to call when click on delete button on item
     */
    deleteAction(id: string | number): void;
}
