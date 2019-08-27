import React from 'react'
import renderer, { act } from 'react-test-renderer'

import { HTMLRenderer } from '.'

const html = `<h1>React</h1><h2>A JavaScript library for building user interfaces</h2><p><a href="#">Get Started</a></p>`

const components = {
  h1: props => <marquee data-replaced={true} {...props} />,
}

const componentOverrides = {
  h1: Comp => props => <Comp data-overridden={true} {...props} />,
}

test('renders the provided HTML', () => {
  let tree
  act(() => {
    tree = renderer.create(<HTMLRenderer html={html} />)
  })
  const json = tree.toJSON()

  expect(json).toMatchInlineSnapshot(`
    Array [
      <h1>
        React
      </h1>,
      <h2>
        A JavaScript library for building user interfaces
      </h2>,
      <p>
        <a
          href="#"
        >
          Get Started
        </a>
      </p>,
    ]
  `)
})

test('replaces HTML elements using the components map', () => {
  let tree
  act(() => {
    tree = renderer.create(<HTMLRenderer html={html} components={components} />)
  })
  const json = tree.toJSON()

  expect(json).toMatchInlineSnapshot(`
    Array [
      <marquee
        data-replaced={true}
        name="h1"
      >
        React
      </marquee>,
      <h2>
        A JavaScript library for building user interfaces
      </h2>,
      <p>
        <a
          href="#"
        >
          Get Started
        </a>
      </p>,
    ]
  `)
})

test('allows component overrides', () => {
  let tree
  act(() => {
    tree = renderer.create(
      <HTMLRenderer
        html={html}
        components={components}
        componentOverrides={componentOverrides}
      />,
    )
  })
  const json = tree.toJSON()

  expect(json).toMatchInlineSnapshot(`
    Array [
      <marquee
        data-overridden={true}
        data-replaced={true}
        name="h1"
      >
        React
      </marquee>,
      <h2>
        A JavaScript library for building user interfaces
      </h2>,
      <p>
        <a
          href="#"
        >
          Get Started
        </a>
      </p>,
    ]
  `)
})

test('uses standard HTML element if override does not have a matching component', () => {
  let tree
  act(() => {
    tree = renderer.create(
      <HTMLRenderer html={html} componentOverrides={componentOverrides} />,
    )
  })
  const json = tree.toJSON()

  expect(json).toMatchInlineSnapshot(`
    Array [
      <h1
        data-overridden={true}
        name="h1"
      >
        React
      </h1>,
      <h2>
        A JavaScript library for building user interfaces
      </h2>,
      <p>
        <a
          href="#"
        >
          Get Started
        </a>
      </p>,
    ]
  `)
})
