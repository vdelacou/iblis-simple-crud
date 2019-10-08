import { FunctionComponent } from 'react';
/**
 * Simple form with only one value to add
 */
export declare const AddForm: FunctionComponent<IAddFormProps>;
export interface IAddFormValue {
    /**
     * The value of the field in the form
     */
    value: string;
}
export interface IAddFormProps {
    /**
     * The button label to launch main action
     * @default Add
     */
    buttonLabelAdd?: string;
    /**
     * The placeholder label for the entityName field
     */
    placeholderAdd?: string;
    /**
     * To show to user that the action is loading (default false)
     * @default false
     */
    isLoading?: boolean;
    /**
     * Label to show as error if validation function is not satisfied, if no error must return undefined, if error return the error description
     */
    validateFunction?(form: IAddFormValue): string | undefined;
    /**
     * The Function to call when click on button
     */
    addAction(form: IAddFormValue): void;
}
