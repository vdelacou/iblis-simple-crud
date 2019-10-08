import { FunctionComponent } from 'react';
import { IAddFormProps, IAddFormValue, IEditFormProps, IEditFormValue, IMenuAction, ISimpleCrudEntityProps } from '../../src';
export declare const SimpleCrudEntityProps: FunctionComponent<ISimpleCrudEntityProps<object>>;
export declare const EditFormProps: FunctionComponent<Omit<IEditFormProps, 'editAction' | 'deleteAction' | 'isLoading'>>;
export declare const EditFormValueProps: FunctionComponent<IEditFormValue>;
export declare const MenuActionProps: FunctionComponent<IMenuAction>;
export declare const AddFormProps: FunctionComponent<Omit<IAddFormProps, 'addAction' | 'isLoading'>>;
export declare const AddFormValueProps: FunctionComponent<IAddFormValue>;
