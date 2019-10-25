import { FunctionComponent } from 'react';
import { IAddFormProps, IAddFormValue, IEditFormProps, IEditFormValue, IMenuAction, ISimpleCrudEntityProps } from '../../src';

export const SimpleCrudEntityProps: FunctionComponent<ISimpleCrudEntityProps<object>> = () => {
  return null;
};

export const EditFormProps: FunctionComponent<Omit<IEditFormProps, 'editAction' | 'deleteAction' | 'isLoading'>> = () => {
  return null;
};

export const EditFormValueProps: FunctionComponent<IEditFormValue> = () => {
  return null;
};

export const MenuActionProps: FunctionComponent<IMenuAction> = () => {
  return null;
};

export const AddFormProps: FunctionComponent<Omit<IAddFormProps, 'addAction' | 'isLoading'>> = () => {
  return null;
};

export const AddFormValueProps: FunctionComponent<IAddFormValue> = () => {
  return null;
};
