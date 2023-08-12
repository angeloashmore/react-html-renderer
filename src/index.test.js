import React from 'react'
import renderer, { act } from 'react-test-renderer'

import HTMLRenderer from '.'

const html = `<h1 data-foo="bar">React</h1><h2>A JavaScript library for building user interfaces</h2><p><a href="#">Get Started</a></p>`

const components = {
  h1: (props) => <marquee {...props} data-foo="baz" />,
}

const componentOverrides = {
  h1: (Comp) => (props) => <Comp {...props} data-foo="qux" />,
}

test('renders the provided HTML', () => {
  let tree
  act(() => {
    tree = renderer.create(<HTMLRenderer html={html} />)
  })
  const json = tree.toJSON()

  expect(json).toMatchInlineSnapshot(`
[
  <h1
    data-foo="bar"
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

test('replaces HTML elements using the components map', () => {
  let tree
  act(() => {
    tree = renderer.create(<HTMLRenderer html={html} components={components} />)
  })
  const json = tree.toJSON()

  expect(json).toMatchInlineSnapshot(`
[
  <marquee
    data-foo="baz"
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
[
  <marquee
    data-foo="baz"
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
[
  <h1
    data-foo="qux"
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

test('overrides do not affect other HTMLRenderers', () => {
  let tree
  act(() => {
    tree = renderer.create(
      <>
        <HTMLRenderer
          html={html}
          components={components}
          componentOverrides={{
            h1: (Comp) => (props) => <Comp data-bar="baz" {...props} />,
          }}
        />
        ,
        <HTMLRenderer
          html={html}
          components={components}
          componentOverrides={componentOverrides}
        />
      </>,
    )
  })
  const json = tree.toJSON()

  expect(json).toMatchInlineSnapshot(`
[
  <marquee
    data-bar="baz"
    data-foo="baz"
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
  ",",
  <marquee
    data-foo="baz"
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
