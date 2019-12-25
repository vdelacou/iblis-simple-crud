import { Box, Button, FormHelperText, Grid, TextField } from '@material-ui/core';
import { FormikErrors, useFormik } from 'formik';
import React, { FunctionComponent, useEffect } from 'react';

/**
 * Simple form with only one value to add
 */
export const AddForm: FunctionComponent<IAddFormProps> = props => {
  const submitForm = (form: IAddFormValue) => {
    props.addAction(form);
  };

  const validateForm = (form: IAddFormValue): Promise<FormikErrors<IAddFormValue>> => {
    const errors: FormikErrors<IAddFormValue> = {};
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

  const { getFieldProps, getFieldMeta, handleSubmit, resetForm, isSubmitting } = useFormik<IAddFormValue>({
    initialValues: { value: props.defaultValue ? props.defaultValue : '' },
    validate: validateForm,
    onSubmit: (form: IAddFormValue) => {
      submitForm(form);
    },
  });

  useEffect(() => {
    if (!props.isLoading) {
      resetForm();
    }
  }, [props.isLoading, resetForm]);

  const valueFieldProps = getFieldProps({ name: 'value', type: 'text' });
  const valueFieldMeta = getFieldMeta('value');

  return (
    <form onSubmit={handleSubmit} noValidate={true}>
      <Grid container={true}>
        {/* entityName */}
        <Grid item={true} xs={8}>
          <Box pr={2}>
            <TextField
              placeholder={props.placeholderAdd}
              disabled={isSubmitting || props.isLoading}
              error={valueFieldMeta.error !== undefined && valueFieldMeta.touched}
              helperText={valueFieldMeta.error && valueFieldMeta.touched ? valueFieldMeta.error : ' '}
              fullWidth={true}
              {...valueFieldProps}
            />
          </Box>
        </Grid>
        {/* button */}
        <Grid item={true}>
          <Box display="flex" flexDirection="column" justifyContent="space-between" height={'100%'}>
            <Box display="flex" alignItems="center" height={'100%'}>
              <Button variant={'contained'} type="submit" disabled={isSubmitting || props.isLoading}>
                {props.buttonLabelAdd}
              </Button>
            </Box>
            <FormHelperText>&nbsp;</FormHelperText>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

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
   * The value to show on text field
   */
  defaultValue?: string;
  /**
   * To show to user that the action is loading (default false)
   * @default false
   */
  isLoading?: boolean;
  /**
   * Label to show as error if validation function is not satisfied, if no error must return undefined, if error return the error description
   */
  validateFunction?: (form: IAddFormValue) => string | undefined;
  /**
   * The Function to call when click on button
   */
  addAction: (form: IAddFormValue) => void;
}

AddForm.defaultProps = {
  buttonLabelAdd: 'Add',
  isLoading: false,
};
