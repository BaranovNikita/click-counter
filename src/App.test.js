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
  return shallow(<App {...props} />)
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
test('renders counter display', () => {
  const wrapper = setup()
  const counter = findByTestAttribute(wrapper, 'counter-display')
  expect(counter.length).toBe(1)
})
test('counter starts at 0', () => {

})
test('clicking button increments counter display', () => {

})
