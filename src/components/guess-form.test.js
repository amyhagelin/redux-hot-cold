import {shallow} from 'enzyme';
import React from 'react';
import { GuessForm } from './guess-form';
import { makeGuess } from '../actions';

it('Dispatches makeGuess from GuessForm', () => {
    const dispatch = jest.fn();
    const value = 12;
    const wrapper = shallow(
        <GuessForm dispatch={dispatch} />
    );
    const instance = wrapper.instance();
    instance.input = { value };
    instance.submitGuess({ preventDefault: () => {} });
    expect(dispatch).toHaveBeenCalledWith(makeGuess(value));
});