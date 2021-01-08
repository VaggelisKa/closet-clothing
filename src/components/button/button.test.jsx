import React from 'react';
import { shallow } from 'enzyme';
import Button from './button.component';

it('Should render button component', () => {
  expect(shallow(<Button />)).toMatchSnapshot();
});
