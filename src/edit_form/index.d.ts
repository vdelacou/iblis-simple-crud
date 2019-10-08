import React, { FunctionComponent } from 'react';
/**
 * A component for update or delete an entity
 * If no edit or delete button asked, then the menu is not displayed
 */
export declare const EditForm: FunctionComponent<IEditFormProps>;
export interface IEditFormValue {
    /**
     * The id of the entity
     */
    id: string | number;
    /**
     * The value to display and edit for the entity
     */
    value: string;
}
export interface IEditFormProps {
    /**
     * The initial form value
     */
    initValue: IEditFormValue;
    /**
     * The text to display on edit menu button
     * @default Edit
     */
    editLabel?: string;
    /**
     * The text to display on delete menu button
     * @default Delete
     */
    deleteLabel?: string;
    /**
     * The text to display on tooltip on icon for confirm edit
     * @default Edit
     */
    editConfirmLabel?: string;
    /**
     * The text to display on tooltip on icon for cancel edit
     * @default Cancel
     */
    editCancelLabel?: string;
    /**
     * The text to display on tooltip on icon for confirm delete
     * @default Delete
     */
    deleteConfirmLabel?: string;
    /**
     * The text to display on tooltip on icon for cancel delete
     * @default Cancel
     */
    deleteCancelLabel?: string;
    /**
     * The message to show to confirm to really delete a entity
     * @default Do you confirm you want to delete this?
     */
    confirmDeleteLabel?: string;
    /**
     * To show in the menu the edit button
     * @default true
     */
    hasEdit?: boolean;
    /**
     * To show in the menu the deletee button
     * @default true
     */
    hasDelete?: boolean;
    /**
     * To show to user that the action is loading
     * @default false
     */
    isLoading?: boolean;
    /**
     * A component to display if needed at the left of the form
     */
    leftComponent?: React.ReactNode;
    /**
     * The height of the component
     * @default 60
     */
    componentHeight?: number;
    /**
     * A list of label and action to add to the menu
     */
    menuAction?: IMenuAction[];
    /**
     * Label to show as error if validation function is not satisfied when edit, if no error must return undefined, if error return the error description
     */
    validateFunction?(form: IEditFormValue): string | undefined;
    /**
     * The Function to call when click on edit button
     */
    editAction(form: IEditFormValue): void;
    /**
     * The Function to call when click on delete button
     */
    deleteAction(id: string | number): void;
}
export interface IMenuAction {
    /**
     * The label to display on the menu
     */
    label: string;
    /**
     * If the menu is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * The Function to call to when click on menu
     */
    action(id: string | number): void;
}
