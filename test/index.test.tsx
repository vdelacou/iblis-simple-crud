import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import { IAddFormValue, SimpleCrud } from '../src';

interface IMyPokemon {
  idPokemon: number;
  pokemonName: string;
}

export const BasicUsage: FunctionComponent = () => {
  const data = [{ entity: { idPokemon: 1, pokemonName: 'Pikachu' } }];

  const addAction = (_form: IAddFormValue) => {
    // do what you need with the form.value and change data properties if needed
  };
  const editAction = (_value: IMyPokemon) => {
    // do what you need with your object (displayFieldName has been updated ) and change data properties if needed
  };
  const deleteAction = (_id: string | number) => {
    // do what you need with the id and change data properties if needed
  };

  return <SimpleCrud data={data} idFieldName="idPokemon" displayFieldName="pokemonName" addAction={addAction} editAction={editAction} deleteAction={deleteAction} />;
};

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BasicUsage />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
