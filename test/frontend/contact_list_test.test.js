/**
 * @jest-environment jsdom
 */

import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from '../../src/App'


test('the phonebook is rendered', () => {
  render(<App />)

  const element = screen.getByText('Phonebook')
  expect(element).toBeDefined()

  const numbersElement = screen.getByText('Numbers')
  expect(numbersElement).toBeDefined()
})
