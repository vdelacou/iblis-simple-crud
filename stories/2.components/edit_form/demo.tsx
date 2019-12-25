import { Box, Typography } from '@material-ui/core';
import React, { FunctionComponent, useState } from 'react';
import { EditForm, IEditFormValue } from '../../../src';

export const Simple: FunctionComponent = () => {
  const initDataValue: IEditFormValue = { id: '234234', value: 'Marketing is the best in the world' };
  const [dataValue, setDataValue] = useState<IEditFormValue>(initDataValue);
  const [loading, setLoading] = useState(false);

  const validateFunction = (form: IEditFormValue) => {
    return form.value && form.value.trim() !== '' ? undefined : 'Required';
  };

  const editAction = (form: IEditFormValue) => {
    // tslint:disable-next-line: no-console
    console.log(JSON.stringify(form));
    setLoading(true);
    setDataValue(form);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  const deleteAction = (id: string | number) => {
    // tslint:disable-next-line: no-console
    console.log(id);
    setLoading(true);
    setTimeout(() => {
      setDataValue(initDataValue);
      setLoading(false);
    }, 2000);
  };

  return <EditForm isLoading={loading} initValue={dataValue} validateFunction={validateFunction} editAction={editAction} deleteAction={deleteAction} />;
};

export const WithLoading: FunctionComponent = () => {
  const dataValue: IEditFormValue = { id: '234234', value: 'Marketing is the best in the world' };

  const editAction = (form: IEditFormValue) => {
    // tslint:disable-next-line: no-console
    console.log(JSON.stringify(form));
  };
  const deleteAction = (id: string | number) => {
    // tslint:disable-next-line: no-console
    console.log(id);
  };

  return <EditForm isLoading={true} initValue={dataValue} editAction={editAction} deleteAction={deleteAction} />;
};

export const ChangeLanguage: FunctionComponent = () => {
  const dataValue: IEditFormValue = { id: 1, value: 'Bonjour' };

  const editAction = (form: IEditFormValue) => {
    // tslint:disable-next-line: no-console
    console.log(JSON.stringify(form));
  };
  const deleteAction = (id: string | number) => {
    // tslint:disable-next-line: no-console
    console.log(id);
  };

  return (
    <EditForm
      initValue={dataValue}
      editAction={editAction}
      deleteAction={deleteAction}
      editLabel={'Editer'}
      deleteLabel={'Effacer'}
      editConfirmLabel={'Mettre à jour'}
      editCancelLabel={'Annuler la mise à jour'}
      deleteConfirmLabel={'Supprimer définitivement'}
      deleteCancelLabel={'Annuler la suppression'}
      confirmDeleteLabel={'Voulez-vous vraiment supprimer?'}
    />
  );
};

export const NotEdit: FunctionComponent = () => {
  const initValue = { id: 1, value: 'Test' };
  const editAction = () => {
    // do what you need with the form.id and form.value
  };
  const deleteAction = () => {
    // do what you need with the id
  };
  return <EditForm initValue={initValue} editAction={editAction} deleteAction={deleteAction} hasEdit={false} />;
};

export const NotDelete: FunctionComponent = () => {
  const initValue = { id: 1, value: 'Test' };
  const editAction = () => {
    // do what you need with the form.id and form.value
  };
  const deleteAction = () => {
    // do what you need with the id
  };
  return <EditForm initValue={initValue} editAction={editAction} deleteAction={deleteAction} hasDelete={false} />;
};

export const NoMenu: FunctionComponent = () => {
  const initValue = { id: 1, value: 'Test' };
  const editAction = () => {
    // do what you need with the form.id and form.value
  };
  const deleteAction = () => {
    // do what you need with the id
  };
  return <EditForm initValue={initValue} editAction={editAction} deleteAction={deleteAction} hasEdit={false} hasDelete={false} />;
};

export const WithLeftComponent: FunctionComponent = () => {
  const initValue = { id: 1, value: 'Test' };
  const editAction = () => {
    // do what you need with the form.id and form.value
  };
  const deleteAction = () => {
    // do what you need with the id
  };
  return (
    <EditForm
      initValue={initValue}
      editAction={editAction}
      deleteAction={deleteAction}
      leftComponent={<img src="https://image.freepik.com/free-photo/cute-cat-picture_1122-449.jpg" style={{ maxHeight: '100%' }} />}
    />
  );
};

export const WithRightComponent: FunctionComponent = () => {
  const initValue = { id: 1, value: 'Test' };
  const editAction = () => {
    // do what you need with the form.id and form.value
  };
  const deleteAction = () => {
    // do what you need with the id
  };
  return (
    <EditForm
      initValue={initValue}
      editAction={editAction}
      deleteAction={deleteAction}
      rightComponent={
        <Box width={'100%'} display={'flex'} justifyContent={'center'}>
          <Typography variant={'caption'}>Active</Typography>
        </Box>
      }
    />
  );
};

export const ChangeHeight: FunctionComponent = () => {
  const initValue = { id: 1, value: 'Test' };
  const editAction = () => {
    // do what you need with the form.id and form.value
  };
  const deleteAction = () => {
    // do what you need with the id
  };
  return <EditForm initValue={initValue} editAction={editAction} deleteAction={deleteAction} componentHeight={120} />;
};

export const CustomMenu: FunctionComponent = () => {
  const [disabled, setDisabled] = useState(true);
  const initValue = { id: 1, value: 'Test' };

  const enabledAction = (_id: string | number) => {
    // do what you need with the id
    setDisabled(!disabled);
  };
  const disabledAction = (_id: string | number) => {
    // do what you need with the id
    setDisabled(!disabled);
  };
  const menuAction = [
    { label: 'Enabled', action: enabledAction, disabled: !disabled },
    { label: 'Disabled', action: disabledAction, disabled },
  ];

  const editAction = () => {
    // do what you need with the form.id and form.value
  };
  const deleteAction = () => {
    // do what you need with the id
  };
  return <EditForm initValue={initValue} editAction={editAction} deleteAction={deleteAction} menuAction={menuAction} />;
};

export const OnlyCustomMenu: FunctionComponent = () => {
  const [disabled, setDisabled] = useState(true);
  const initValue = { id: 1, value: 'Test' };

  const enabledAction = (_id: string | number) => {
    // do what you need with the id
    setTimeout(() => {
      setDisabled(!disabled);
    }, 1000);
  };
  const disabledAction = (_id: string | number) => {
    // do what you need with the id
    setTimeout(() => {
      setDisabled(!disabled);
    }, 1000);
  };
  const menuAction = [
    { label: 'Enabled', action: enabledAction, disabled: !disabled },
    { label: 'Disabled', action: disabledAction, disabled },
  ];

  const editAction = () => {
    // do what you need with the form.id and form.value
  };
  const deleteAction = () => {
    // do what you need with the id
  };
  return <EditForm initValue={initValue} editAction={editAction} deleteAction={deleteAction} hasEdit={false} hasDelete={false} menuAction={menuAction} />;
};

export const ValidateEmail: FunctionComponent = () => {
  const initValue = { id: 1, value: 'john.doe@company.com' };

  const validateFunction = (form: IEditFormValue) => {
    return form.value && form.value.trim() !== '' && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(form.value) ? undefined : 'Email not valid';
  };

  const editAction = () => {
    // do what you need with the form.id and form.value
  };
  const deleteAction = () => {
    // do what you need with the id
  };
  return <EditForm initValue={initValue} editAction={editAction} deleteAction={deleteAction} validateFunction={validateFunction} />;
};
