import { Box, createMuiTheme } from '@material-ui/core';
import { darken, MuiThemeProvider as ThemeProvider } from '@material-ui/core/styles';
import { FlashOff, FlashOn } from '@material-ui/icons';
import React, { FunctionComponent, useState } from 'react';
import { IAddFormValue, IEditFormValue, IMenuAction, ISimpleCrudEntityProps, SimpleCrud } from '../../src';

export const Simple: FunctionComponent = () => {
  interface ISimple {
    id: number;
    name: string;
  }
  const validateFunction = (form: IAddFormValue | IEditFormValue) => {
    return form.value && form.value.trim() !== '' ? undefined : 'Required';
  };

  const initData: Array<ISimpleCrudEntityProps<ISimple>> = [
    { entity: { id: 1, name: 'Celestra' }, editFormProps: { validateFunction } },
    { entity: { id: 2, name: 'Cybele' }, editFormProps: { validateFunction } },
  ];
  const [data, setData] = useState(initData);
  const [loading, setLoading] = useState(false);

  const addAction = (form: IAddFormValue) => {
    setLoading(true);
    setTimeout(() => {
      const newEntity = { id: Math.floor(Math.random() * 1000), name: form.value, active: false };
      data.push({
        entity: newEntity,
        editFormProps: { validateFunction },
      });
      setData([...data]);
      setLoading(false);
    }, 1000);
  };
  const editAction = (value: ISimple) => {
    setLoading(true);
    const objectToUpdate = data.find(objectToFind => objectToFind.entity.id === value.id);
    if (objectToUpdate) {
      objectToUpdate.entity.name = value.name;
      setData([...data]);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };
  const deleteAction = (id: string | number) => {
    setLoading(true);
    const objectToDelete = data.find(objectToFind => objectToFind.entity.id === id);
    if (objectToDelete) {
      setTimeout(() => {
        data.splice(data.indexOf(objectToDelete), 1);
        setData([...data]);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <SimpleCrud
      data={data}
      idFieldName="id"
      displayFieldName="name"
      isLoading={loading}
      addFormProps={{ validateFunction }}
      addAction={addAction}
      editAction={editAction}
      deleteAction={deleteAction}
    />
  );
};

export const ReOrder: FunctionComponent = () => {
  interface IReOrder {
    id: number;
    name: string;
    index: number;
  }
  const initData: IReOrder[] = [
    { id: 1, name: 'Celestra', index: 2 },
    { id: 2, name: 'Cybele', index: 1 },
    { id: 3, name: 'Demetrius', index: 3 },
  ];

  const upAction = (id: string | number) => {
    setLoading(true);
    setTimeout(() => {
      const objectToUpdateIndex = data.findIndex(objectToFind => objectToFind.id === id);
      // swtich
      const currentIndex = data[objectToUpdateIndex].index;
      data[objectToUpdateIndex] = { ...data[objectToUpdateIndex], index: data[objectToUpdateIndex - 1].index };
      data[objectToUpdateIndex - 1] = { ...data[objectToUpdateIndex - 1], index: currentIndex };
      setData([...data]);
      setLoading(false);
    }, 1000);
  };

  const downAction = (id: string | number) => {
    setLoading(true);
    setTimeout(() => {
      const objectToUpdateIndex = data.findIndex(objectToFind => objectToFind.id === id);
      // swtich
      const currentIndex = data[objectToUpdateIndex].index;
      data[objectToUpdateIndex] = { ...data[objectToUpdateIndex], index: data[objectToUpdateIndex + 1].index };
      data[objectToUpdateIndex + 1] = { ...data[objectToUpdateIndex + 1], index: currentIndex };
      setData([...data]);
      setLoading(false);
    }, 1000);
  };

  const getMaxIndex = () => {
    return Math.max.apply(
      data,
      data.map(item => {
        return item.index;
      })
    );
  };

  const getMinIndex = () => {
    return Math.min.apply(
      data,
      data.map(item => {
        return item.index;
      })
    );
  };

  const getEditFormProps = (itemList: IReOrder[]): Array<ISimpleCrudEntityProps<IReOrder>> => {
    return itemList.map(item => {
      const menuAction: IMenuAction[] = [
        { label: 'Up', action: upAction, disabled: item.index === getMinIndex() },
        {
          label: 'Down',
          action: downAction,
          disabled: item.index === getMaxIndex(),
        },
      ];
      return {
        entity: item,
        editFormProps: {
          validateFunction,
          menuAction,
          hasEdit: false,
          hasDelete: false,
        },
      };
    });
  };

  const [data, setData] = useState(initData);
  const [loading, setLoading] = useState(false);

  const validateFunction = (form: IAddFormValue | IEditFormValue) => {
    return form.value && form.value.trim() !== '' ? undefined : 'Required';
  };

  const addAction = (form: IAddFormValue) => {
    setLoading(true);
    setTimeout(() => {
      data.push({ id: Math.floor(Math.random() * 10000), name: form.value, index: getMaxIndex() + 1 });
      setData([...data]);
      setLoading(false);
    }, 1000);
  };
  const editAction = (value: IReOrder) => {
    setLoading(true);
    const objectToUpdate = data.find(objectToFind => objectToFind.id === value.id);
    if (objectToUpdate) {
      objectToUpdate.name = value.name;
      setData([...data]);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };
  const deleteAction = (id: string | number) => {
    setLoading(true);
    const objectToDelete = data.find(objectToFind => objectToFind.id === id);
    if (objectToDelete) {
      setTimeout(() => {
        data.splice(data.indexOf(objectToDelete), 1);
        setData([...data]);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <SimpleCrud
      data={getEditFormProps(data.sort((a, b) => a.index - b.index))}
      idFieldName="id"
      displayFieldName="name"
      isLoading={loading}
      addFormProps={{ validateFunction }}
      addAction={addAction}
      editAction={editAction}
      deleteAction={deleteAction}
    />
  );
};

export const OnOff: FunctionComponent = () => {
  interface IOnOff {
    id: number;
    name: string;
    active: boolean;
  }

  const initData: IOnOff[] = [
    { id: 1, name: 'Celestra', active: true },
    { id: 2, name: 'Cybele', active: true },
  ];

  const toogleAction = (id: string | number) => {
    setLoading(true);
    const objectToUpdate = data.find(objectToFind => objectToFind.id === id);
    if (objectToUpdate) {
      objectToUpdate.active = !objectToUpdate.active;
      setData([...data]);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const getEditFormProps = (itemList: IOnOff[]): Array<ISimpleCrudEntityProps<IOnOff>> => {
    return itemList.map(item => {
      if (item.active) {
        const menuAction: IMenuAction[] = [
          { label: 'On', action: toogleAction, disabled: true },
          { label: 'Off', action: toogleAction },
        ];
        return {
          entity: item,
          editFormProps: {
            validateFunction,
            leftComponent: (
              <Box display="flex" alignItems="center" justifyItems="center" height={'100%'}>
                <FlashOn />
              </Box>
            ),
            menuAction,
          },
        };
      } else {
        const menuAction: IMenuAction[] = [
          { label: 'On', action: toogleAction },
          { label: 'Off', action: toogleAction, disabled: true },
        ];
        return {
          entity: item,
          editFormProps: {
            hasDelete: false,
            hasEdit: false,
            leftComponent: (
              <Box display="flex" alignItems="center" justifyItems="center" height={'100%'}>
                <FlashOff color={'disabled'} />
              </Box>
            ),
            menuAction,
          },
        };
      }
    });
  };

  const [data, setData] = useState(initData);
  const [loading, setLoading] = useState(false);

  const validateFunction = (form: IAddFormValue | IEditFormValue) => {
    return form.value && form.value.trim() !== '' ? undefined : 'Required';
  };

  const addAction = (form: IAddFormValue) => {
    setLoading(true);
    setTimeout(() => {
      data.push({ id: Math.floor(Math.random() * 1000), name: form.value, active: false });
      setData([...data]);
      setLoading(false);
    }, 1000);
  };
  const editAction = (value: IOnOff) => {
    setLoading(true);
    const objectToUpdate = data.find(objectToFind => objectToFind.id === value.id);
    if (objectToUpdate) {
      objectToUpdate.name = value.name;
      setData([...data]);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };
  const deleteAction = (id: string | number) => {
    setLoading(true);
    const objectToDelete = data.find(objectToFind => objectToFind.id === id);
    if (objectToDelete) {
      setTimeout(() => {
        data.splice(data.indexOf(objectToDelete), 1);
        setData([...data]);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <SimpleCrud
      data={getEditFormProps(data)}
      idFieldName="id"
      displayFieldName="name"
      isLoading={loading}
      addFormProps={{ validateFunction }}
      addAction={addAction}
      editAction={editAction}
      deleteAction={deleteAction}
    />
  );
};

export const WithTheming: FunctionComponent = () => {
  interface IOnOff {
    id: number;
    name: string;
  }

  const initData: IOnOff[] = [
    { id: 1, name: 'Celestra' },
    { id: 2, name: 'Cybele' },
  ];

  const validateFunction = (form: IAddFormValue | IEditFormValue) => {
    return form.value && form.value.trim() !== '' ? undefined : 'Required';
  };

  const getEditFormProps = (itemList: IOnOff[]): Array<ISimpleCrudEntityProps<IOnOff>> => {
    return itemList.map(item => {
      return {
        entity: item,
        editFormProps: {
          validateFunction,
        },
      };
    });
  };

  const [data, setData] = useState(initData);
  const [loading, setLoading] = useState(false);

  const addAction = (form: IAddFormValue) => {
    setLoading(true);
    setTimeout(() => {
      data.push({ id: Math.floor(Math.random() * 1000), name: form.value });
      setData([...data]);
      setLoading(false);
    }, 1000);
  };
  const editAction = (value: IOnOff) => {
    setLoading(true);
    const objectToUpdate = data.find(objectToFind => objectToFind.id === value.id);
    if (objectToUpdate) {
      objectToUpdate.name = value.name;
      setData([...data]);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };
  const deleteAction = (id: string | number) => {
    setLoading(true);
    const objectToDelete = data.find(objectToFind => objectToFind.id === id);
    if (objectToDelete) {
      setTimeout(() => {
        data.splice(data.indexOf(objectToDelete), 1);
        setData([...data]);
        setLoading(false);
      }, 1000);
    }
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#1a73e8',
      },
    },
    props: {
      MuiButton: {
        disableRipple: true,
      },
      MuiTextField: {
        variant: 'outlined',
      },
      MuiMenu: {
        PaperProps: {
          square: true,
          elevation: 1,
        },
      },
    },
    overrides: {
      MuiButton: {
        label: {
          textTransform: 'none',
        },
        contained: {
          color: 'white',
          backgroundColor: '#1a73e8',
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
          '&:hover': {
            backgroundColor: darken('#1a73e8', 0.2),
            boxShadow: 'none',
          },
        },
      },
      MuiTypography: {
        root: {
          paddingLeft: '14px',
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <SimpleCrud
        data={getEditFormProps(data)}
        idFieldName="id"
        displayFieldName="name"
        isLoading={loading}
        addFormProps={{ validateFunction }}
        addAction={addAction}
        editAction={editAction}
        deleteAction={deleteAction}
      />
    </ThemeProvider>
  );
};
