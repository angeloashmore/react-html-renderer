import React from 'react'
import { render, cleanup } from '@testing-library/react'
import 'jest-dom/extend-expect'

import { HTMLRenderer } from '.'

const html = `<h1>React</h1><h2>A JavaScript library for building user interfaces</h2><p><a href="#">Get Started</a></p>`

const Heading = ({ replacedData, ...props }) => (
  <h1 {...props}>{replacedData}</h1>
)
const Subheading = ({ replacedData }) => <h2>{replacedData}</h2>
const Text = ({ children }) => <p>{children}</p>
const Link = ({ replacedData, href }) => <a href={href}>{replacedData}</a>

afterEach(cleanup)

test('should render the provided HTML', () => {
  const { container, getByText } = render(
    <HTMLRenderer
      html={html}
      components={{
        h1: () => <Heading replacedData="NEW DATA" />,
      }}
    />,
  )

  expect(getByText('NEW DATA')).toBeInTheDocument()
  expect(container.firstChild).toMatchInlineSnapshot(`
    <h1>
      NEW DATA
    </h1>
  `)
})

test('should replace HTML elements using the components map', () => {
  const { container, getByText } = render(
    <HTMLRenderer
      html={html}
      components={{
        h1: props => <Heading replacedData="HEADING" />,
        h2: props => <Subheading replacedData="SUBHEADING" />,
        p: props => <Text {...props} />,
        a: props => <Link {...props} replacedData="LINK" />,
      }}
    />,
  )

  expect(getByText('HEADING')).toBeInTheDocument()
  expect(getByText('SUBHEADING')).toBeInTheDocument()
  expect(getByText('LINK')).toBeInTheDocument()
  expect(container).toMatchInlineSnapshot(`
    <div>
      <h1>
        HEADING
      </h1>
      <h2>
        SUBHEADING
      </h2>
      <p>
        <a
          href="#"
        >
          LINK
        </a>
      </p>
    </div>
  `)
})
