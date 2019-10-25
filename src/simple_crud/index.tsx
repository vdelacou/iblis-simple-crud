import { Box, List, ListItem } from '@material-ui/core';
import React, { Fragment, FunctionComponent } from 'react';
import { AddForm, IAddFormProps, IAddFormValue } from '../add_form';
import { EditForm, IEditFormProps, IEditFormValue } from '../edit_form';

/**
 * A component with full management of an entity list (add, edit, delete).
 * This component doesn't have a inner state, to refresh element, you need change the property "data"
 */
export const SimpleCrud: FunctionComponent<ISimpleCrudProps> = props => {
  const addData = (form: IAddFormValue) => {
    props.addAction(form);
  };

  const updateData = (form: IEditFormValue) => {
    const dataConverted: IEditFormValue[] = props.data.map(value => {
      return {
        id: readObjectProp(value.entity, props.idFieldName),
        value: readObjectProp(value.entity, props.displayFieldName),
      };
    });
    const indexObjectToUpdate: number = dataConverted.findIndex(entity => entity.id === form.id);
    const objectFound = props.data[indexObjectToUpdate];
    const fieldToUpdate = {
      [props.displayFieldName]: form.value,
    };
    const objectToUpdate = Object.assign({}, objectFound.entity, fieldToUpdate);
    props.editAction(objectToUpdate);
  };

  const deleteData = (id: string | number) => {
    props.deleteAction(id);
  };

  const renderFormList = () => {
    return props.data.map(propsData => {
      // convert to IEditFormValue
      const dataConverted: IEditFormValue = {
        id: readObjectProp(propsData.entity, props.idFieldName),
        value: readObjectProp(propsData.entity, props.displayFieldName),
      };

      return (
        <ListItem disableGutters={true} key={readObjectProp(propsData.entity, props.idFieldName)}>
          <Box width={'100%'}>
            <EditForm
              initValue={dataConverted}
              editLabel={propsData.editFormProps && propsData.editFormProps.editLabel}
              deleteLabel={propsData.editFormProps && propsData.editFormProps.deleteLabel}
              validateFunction={propsData.editFormProps && propsData.editFormProps.validateFunction}
              isLoading={props.isLoading}
              editAction={updateData}
              deleteAction={deleteData}
              hasEdit={propsData.editFormProps && propsData.editFormProps.hasEdit}
              hasDelete={propsData.editFormProps && propsData.editFormProps.hasDelete}
              leftComponent={propsData.editFormProps && propsData.editFormProps.leftComponent}
              rightComponent={propsData.editFormProps && propsData.editFormProps.rightComponent}
              menuAction={propsData.editFormProps && propsData.editFormProps.menuAction}
              componentHeight={propsData.editFormProps && propsData.editFormProps.componentHeight}
            />
          </Box>
        </ListItem>
      );
    });
  };

  const renderAddForm = () => {
    return (
      <AddForm
        isLoading={props.isLoading}
        placeholderAdd={props.addFormProps && props.addFormProps.placeholderAdd}
        buttonLabelAdd={props.addFormProps && props.addFormProps.buttonLabelAdd}
        validateFunction={props.addFormProps && props.addFormProps.validateFunction}
        addAction={addData}
      />
    );
  };

  return (
    <Fragment>
      {renderAddForm()}
      <Box py={2}>
        <List dense={true} disablePadding={true}>
          {renderFormList()}
        </List>
      </Box>
    </Fragment>
  );
};

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
  addAction: (form: IAddFormValue) => void;
  /**
   * The Function to call when click on edit button on item
   */
  editAction: (value: any) => void;
  /**
   * The Function to call when click on delete button on item
   */
  deleteAction: (id: string | number) => void;
}

function readObjectProp(obj: object, key: string) {
  const objectFind = Object.entries(obj).find(entry => entry['0'] === key);
  return objectFind ? objectFind['1'] : undefined;
}
