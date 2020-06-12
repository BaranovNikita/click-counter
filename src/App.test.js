import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() })

/**
 * Factory function to create ShallowWrapper for the App component
 * @function setup
 * @param {object} props - Component props specific for this setup.
 * @param {any} state - Initial state
 * @returns {ShallowWrapper<React.Component["props"], React.Component["state"], React.Component>}
 */
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />)
  if (state) {
    wrapper.setState(state)
  }
  return wrapper
}

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @function findByTestAttribute
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} value - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
const findByTestAttribute = (wrapper, value) => {
  return wrapper.find(`[data-test='${value}']`)
}

test('renders without error', () => {
  const wrapper = setup()
  const appComponent = findByTestAttribute(wrapper, 'component-app')
  expect(appComponent.length).toBe(1)
})
test('renders increment button', () => {
  const wrapper = setup()
  const button = findByTestAttribute(wrapper, 'increment-button')
  expect(button.length).toBe(1)
})
test('renders decrement button', () => {
  const wrapper = setup()
  const button = findByTestAttribute(wrapper, 'decrement-button')
  expect(button.length).toBe(1)
})
test('renders counter display', () => {
  const wrapper = setup()
  const counter = findByTestAttribute(wrapper, 'counter-display')
  expect(counter.length).toBe(1)
})
test('counter starts at 0', () => {
  const wrapper = setup()
  const initialWrapperState = wrapper.state('counter')
  expect(initialWrapperState).toBe(0)
})
test('clicking button increments counter display', () => {
  const counter = 7
  const wrapper = setup(null, { counter })
  const button = findByTestAttribute(wrapper, 'increment-button')
  button.simulate('click')

  const counterDisplay = findByTestAttribute(wrapper, 'counter-display')
  expect(counterDisplay.text()).toBe(`${counter + 1}`)
})
test('clicking decrement button decrement counter', () => {
  const counter = 7
  const wrapper = setup(null, { counter })
  const button = findByTestAttribute(wrapper, 'decrement-button')
  button.simulate('click')

  const counterDisplay = findByTestAttribute(wrapper, 'counter-display')
  expect(counterDisplay.text()).toBe(`${counter - 1}`)
})
test('error is not exists', () => {
  const wrapper = setup()
  const error = findByTestAttribute(wrapper, 'error')
  expect(error.length).toBe(0)
})
test('error is exists', () => {
  const wrapper = setup(null, { error: 'Test error '})
  const error = findByTestAttribute(wrapper, 'error')
  expect(error.length).toBe(1)
})
test('decrement zero throws error', () => {
  const counter = 0
  const wrapper = setup(null, { counter })
  const button = findByTestAttribute(wrapper, 'decrement-button')
  button.simulate('click')

  const counterDisplay = findByTestAttribute(wrapper, 'counter-display')
  expect(counterDisplay.text()).toBe(`${counter}`)
  const error = findByTestAttribute(wrapper, 'error')
  expect(error.length).toBe(1)
  expect(error.text()).toBe('The counter can\'t go below zero')
})
test('increment clear error', () => {
  const counter = 0
  const wrapper = setup(null, { counter, error: 'The counter can\'t go below zero' })
  const button = findByTestAttribute(wrapper, 'increment-button')
  button.simulate('click')
  expect(wrapper.state('error')).toBeFalsy()
})
