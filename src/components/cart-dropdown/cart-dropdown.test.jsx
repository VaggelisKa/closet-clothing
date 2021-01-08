/* eslint-disable no-undef */
import React from 'react';
import { shallow, mount } from 'enzyme';

import CartDropdown from './cart-dropdown.component';
import Button from '../button/button.component';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

describe('CartDropdown component', () => {
  let wrapper;
  let mockHistory;
  let mockDispatch;
  const mockCartItems = [{ id: 1 }, { id: 2 }, { id: 3 }];

  beforeEach(() => {
    mockHistory = {
      push: jest.fn()
    };

    mockDispatch = jest.fn();

    const mockProps = {
      cartItems: mockCartItems,
      history: mockHistory,
      dispatch: mockDispatch
    };

    wrapper = shallow(<CartDropdown.WrappedComponent {...mockProps} />);
  });

  it('Should render cart dropdown component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should call history.push when button is clicked', () => {
    wrapper.find(Button).simulate('click');

    expect(mockHistory.push).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(toggleCartHidden());
  });
});
