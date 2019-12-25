import { Box, FormHelperText, Grid, IconButton, makeStyles, Menu, MenuItem, TextField, Theme, Tooltip, Typography } from '@material-ui/core';
import { Cancel, DeleteForever, Done, MoreVert } from '@material-ui/icons';
import { FormikErrors, useFormik } from 'formik';
import React, { Fragment, FunctionComponent, useEffect, useState } from 'react';

/**
 * A component for update or delete an entity
 * If no edit or delete button asked, then the menu is not displayed
 */
export const EditForm: FunctionComponent<IEditFormProps> = props => {
  const classes = useStyles();

  // On which element show the menu. if undefined the menu is not show
  const [element, setElement] = useState<null | HTMLElement>(null);
  // When we display the form to allow edit
  const [editItem, setEditItem] = useState(false);
  //  When we display the button to confirm delete
  const [deleteItem, setDeleteItem] = useState(false);

  const submitForm = (form: IEditFormValue) => {
    props.editAction(form);
    setEditItem(false);
  };

  const validateForm = (form: IEditFormValue): Promise<FormikErrors<IEditFormValue>> => {
    const errors: FormikErrors<IEditFormValue> = {};
    if (props.validateFunction) {
      const errorLabel = props.validateFunction(form);
      if (errorLabel) {
        errors.value = errorLabel;
      }
    }
    return new Promise(resolve => {
      resolve(errors);
    });
  };

  const { getFieldProps, getFieldMeta, handleSubmit, resetForm, isSubmitting } = useFormik<IEditFormValue>({
    initialValues: props.initValue,
    validate: validateForm,
    onSubmit: (form: IEditFormValue) => {
      submitForm(form);
    },
  });

  useEffect(() => {
    if (!props.isLoading && deleteItem) {
      resetForm();
    }
  }, [props.isLoading, deleteItem, resetForm]);

  const valueFieldProps = getFieldProps({ name: 'value', type: 'text' });
  const valueFieldMeta = getFieldMeta('value');

  const renderMenu = () => {
    const setElementNull = () => {
      setElement(null);
    };
    return (
      <Menu elevation={1} anchorEl={element} open={Boolean(element)} disableEnforceFocus={true} onClose={setElementNull}>
        {renderEditMenuItem()}
        {renderDeleteMenuItem()}
        {renderOptionalMenuItem()}
      </Menu>
    );
  };

  const renderEditMenuItem = () => {
    if (props.hasEdit) {
      const menuClicked = () => {
        setElement(null);
        setEditItem(true);
      };
      return <MenuItem onClick={menuClicked}>{props.editLabel}</MenuItem>;
    } else {
      return null;
    }
  };

  const renderDeleteMenuItem = () => {
    if (props.hasDelete) {
      const menuClicked = () => {
        setElement(null);
        setDeleteItem(true);
      };
      return <MenuItem onClick={menuClicked}>{props.deleteLabel}</MenuItem>;
    } else {
      return null;
    }
  };

  const renderOptionalMenuItem = () => {
    if (props.menuAction && props.menuAction.length !== 0) {
      return props.menuAction.map((menu, index) => {
        if (props.initValue && props.initValue.id) {
          const id = props.initValue.id;
          const menuClicked = () => {
            setElement(null);
            menu.action(id);
          };
          return (
            <MenuItem disabled={menu.disabled} key={index} onClick={menuClicked}>
              {menu.label}
            </MenuItem>
          );
        } else {
          return null;
        }
      });
    } else {
      return null;
    }
  };

  const renderValue = () => {
    if (deleteItem) {
      return (
        <Box display="flex" flexDirection="column" justifyContent="space-between" height={'100%'}>
          <Box display="flex" alignItems="center" height={'100%'}>
            <Typography variant="subtitle1" color="primary">
              {props.confirmDeleteLabel}
            </Typography>
          </Box>
          <FormHelperText>&nbsp;</FormHelperText>
        </Box>
      );
    }
    if (!editItem) {
      return (
        <Box display="flex" flexDirection="column" justifyContent="space-between" height={'100%'}>
          <Box display="flex" alignItems="center" height={'100%'}>
            <Typography variant={'body1'} color={props.isLoading ? 'textSecondary' : 'inherit'} noWrap={true}>
              {props.initValue && props.initValue.value}
            </Typography>
          </Box>
          <FormHelperText>&nbsp;</FormHelperText>
        </Box>
      );
    } else {
      return (
        <Box width={'100%'}>
          <TextField
            disabled={isSubmitting || props.isLoading}
            error={valueFieldMeta.error !== undefined}
            helperText={valueFieldMeta.error ? valueFieldMeta.error : ' '}
            autoFocus={true}
            fullWidth={true}
            InputProps={{
              classes: { input: classes.TextFieldRoot },
            }}
            {...valueFieldProps}
          />
        </Box>
      );
    }
  };

  const renderIconMenu = () => {
    if (deleteItem) {
      const onClickIcon = () => {
        setDeleteItem(false);
      };

      const deleteForm = () => {
        if (props.initValue && props.initValue.id) {
          props.deleteAction(props.initValue.id);
          setDeleteItem(false);
        }
      };

      return (
        <div>
          <Tooltip title={props.deleteConfirmLabel}>
            <IconButton disabled={props.isLoading} onClick={deleteForm} color={'inherit'}>
              <DeleteForever color={'primary'} />
            </IconButton>
          </Tooltip>
          <Tooltip title={props.deleteCancelLabel}>
            <IconButton disabled={props.isLoading} onClick={onClickIcon}>
              <Cancel />
            </IconButton>
          </Tooltip>
        </div>
      );
    }
    if (editItem) {
      const onClickIcon = () => {
        setEditItem(false);
      };
      return (
        <div>
          <Tooltip title={props.editConfirmLabel}>
            <IconButton disabled={props.isLoading} type="submit">
              <Done color={'primary'} />
            </IconButton>
          </Tooltip>
          <Tooltip title={props.editCancelLabel}>
            <IconButton disabled={props.isLoading} onClick={onClickIcon}>
              <Cancel />
            </IconButton>
          </Tooltip>
        </div>
      );
    }
    if (props.hasEdit || props.hasDelete || (props.menuAction && props.menuAction.length > 0)) {
      const onClickIcon = (event: React.MouseEvent<HTMLButtonElement>) => {
        setElement(event.currentTarget);
      };
      return (
        <div>
          <IconButton disabled={props.isLoading} onClick={onClickIcon}>
            <MoreVert />
          </IconButton>
        </div>
      );
    }
    return null;
  };

  const renderLeftComponent = () => {
    if (props.leftComponent) {
      return (
        <Box height={props.componentHeight} pr={props.leftComponent ? 2 : 0}>
          <Box display="flex" flexDirection="column" justifyContent="space-between" height={'100%'}>
            <Box display="flex" alignItems="center" height={'100%'}>
              {props.leftComponent}
            </Box>
            {props.leftComponent && <FormHelperText>&nbsp;</FormHelperText>}
          </Box>
        </Box>
      );
    }
    return null;
  };

  const renderRightComponent = () => {
    if (props.rightComponent && !editItem && !deleteItem) {
      return (
        <Box height={props.componentHeight} pl={props.rightComponent ? 2 : 0} width={'100%'}>
          <Box display="flex" flexDirection="column" justifyContent="space-between" height={'100%'}>
            <Box display="flex" alignItems="center" height={'100%'}>
              {props.rightComponent}
            </Box>
            {props.rightComponent && <FormHelperText>&nbsp;</FormHelperText>}
          </Box>
        </Box>
      );
    }
    return null;
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit} noValidate={true}>
        <Box height={props.componentHeight}>
          <Box height={'100%'} display={'flex'} alignItems="center">
            <Grid container={true} alignItems="center">
              <Grid item={true} xs={8} sm={10}>
                <Box display={'flex'} flexDirection="row" alignItems="center">
                  {renderLeftComponent()}
                  {renderValue()}
                  {renderRightComponent()}
                </Box>
              </Grid>
              <Grid item={true} xs={4} sm={2}>
                <Box display="flex" flexDirection="column" justifyContent="space-between" height={'100%'}>
                  <Box display="flex" alignItems="center" justifyContent="flex-end" height={'100%'}>
                    {renderIconMenu()}
                  </Box>
                  <FormHelperText>&nbsp;</FormHelperText>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </form>

      {/* Render Menu */}
      {renderMenu()}
    </Fragment>
  );
};

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
   * A component to display if needed at the right of the form, disapear on edit or delete mode
   */
  rightComponent?: React.ReactNode;
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
  validateFunction?: (form: IEditFormValue) => string | undefined;
  /**
   * The Function to call when click on edit button
   */
  editAction: (form: IEditFormValue) => void;
  /**
   * The Function to call when click on delete button
   */
  deleteAction: (id: string | number) => void;
}

EditForm.defaultProps = {
  editLabel: 'Edit',
  deleteLabel: 'Delete',
  editConfirmLabel: 'Edit',
  editCancelLabel: 'Cancel',
  deleteConfirmLabel: 'Delete',
  deleteCancelLabel: 'Cancel',
  confirmDeleteLabel: 'Do you confirm you want to delete this?',
  hasEdit: true,
  hasDelete: true,
  isLoading: false,
  componentHeight: 60,
};

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

const useStyles = makeStyles((theme: Theme) => {
  return {
    TextFieldRoot: {
      ...theme.typography.body1,
    },
  };
});
