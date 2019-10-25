import React, { FunctionComponent, useState } from 'react';
import { AddForm, IAddFormValue } from '../../../src';

export const Simple: FunctionComponent = () => {
  const [loading, setLoading] = useState(false);

  const addAction = (form: IAddFormValue) => {
    // tslint:disable-next-line: no-console
    console.log(JSON.stringify(form));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return <AddForm isLoading={loading} addAction={addAction} />;
};

export const WithLoading: FunctionComponent = () => {
  const validateFunction = (form: IAddFormValue) => {
    return form.value && form.value.trim() !== '' ? undefined : 'Required';
  };

  const addAction = (form: IAddFormValue) => {
    // tslint:disable-next-line: no-console
    console.log(JSON.stringify(form));
  };
  return <AddForm isLoading={true} validateFunction={validateFunction} addAction={addAction} />;
};

export const Required: FunctionComponent = () => {
  const [loading, setLoading] = useState(false);

  const validateFunction = (form: IAddFormValue) => {
    return form.value && form.value.trim() !== '' ? undefined : 'Required';
  };

  const addAction = (form: IAddFormValue) => {
    // tslint:disable-next-line: no-console
    console.log(JSON.stringify(form));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return <AddForm isLoading={loading} placeholderAdd="Name" validateFunction={validateFunction} addAction={addAction} />;
};

export const ValidateEmail: FunctionComponent = () => {
  const [loading, setLoading] = useState(false);

  const validateFunction = (form: IAddFormValue) => {
    return form.value && form.value.trim() !== '' && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(form.value) ? undefined : 'Email not valid';
  };

  const addAction = (form: IAddFormValue) => {
    // tslint:disable-next-line: no-console
    console.log(JSON.stringify(form));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return <AddForm isLoading={loading} placeholderAdd="New Member Email" buttonLabelAdd="Invite" validateFunction={validateFunction} addAction={addAction} />;
};

export const WithDefaultValue: FunctionComponent = () => {
  const [loading, setLoading] = useState(false);

  const addAction = (form: IAddFormValue) => {
    // tslint:disable-next-line: no-console
    console.log(JSON.stringify(form));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return <AddForm isLoading={loading} addAction={addAction} defaultValue={'Celestra'} />;
};
