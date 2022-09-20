import { render, screen } from '@testing-library/react'
import React from 'react'

import App from './App'

test('renders War Game', () => {
  render(<App />)
  const linkElement = screen.getByText(/War Game/i)
  expect(linkElement).toBeInTheDocument()
})
