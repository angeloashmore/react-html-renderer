# react-html-renderer

React component that renders an HTML string as a React component tree.

**Note**: This component uses [`html-react-parser`][html-react-parser] under the
hood but makes no promises about changing the underlying library in a future
release.

## Status

[![npm version](https://flat.badgen.net/npm/v/react-html-renderer)](https://www.npmjs.com/package/react-html-renderer)
[![Build Status](https://flat.badgen.net/travis/angeloashmore/react-html-renderer)](https://travis-ci.com/angeloashmore/react-html-renderer)

## Install

```sh
npm install --save react-html-renderer
```

## Example

```jsx
import React from 'react'
import HTMLRenderer from 'react-html-renderer'

// Components to which elements are mapped
import Heading from './Heading'
import Subheading from './Subheading'
import Link from './Link'

// HTML to render as React components
const html = `
  <h1>React</h1>
  <h2>A JavaScript library for building user interfaces</h2>
  <p>
    <a href="#">Get Started</a>
  </p>
`

// Note that default props can be set using the following pattern:
//
//   `props => <Comp foo="bar" {...props} />`
//
const App = () => (
  <HTMLRenderer
    html={html}
    components={{
      h1: props => <Heading color="red" {...props} />,
      h2: Subheading,
      a: Link,
    }}
  />
)
```

`HTMLRenderer` will render something that looks like the following:

```jsx
;[
  <Heading color="red">React</Heading>,
  <Subheading>A JavaScript library for building user interfaces</Subheading>,
  <p>
    <Link to="#">Get Started</Link>
  </p>,
]
```

## Component overrides

`HTMLRenderer` supports overriding components provided in the `components` prop
as needed. This can be utilized to create a reusable `HTMLRenderer` with a
default set of components throughout your project.

```jsx
// src/components/HTML.js

import { Heading, Subheading, Link } from 'src/components'

export const HTML = props => (
  <HTMLRenderer
    components={{
      h1: props => <Heading color="red" {...props} />,
    }}
    {...props}
  />
)
```

The `HTML` component could be used by passing it an HTML string.

```js
// src/pages/index.js

import { HTML } from 'src/components'

export const IndexPage = ({ html }) => <HTML html={html} />
```

This will render `H1` elements with **red text**.

If individual components need to be overridden, you can provide a mapping using
the `componentOverrides` prop.

```js
// src/pages/index.js

import { HTML } from 'src/components'

export const IndexPage = ({ html }) => (
  <HTML
    html={html}
    componentOverrides={{
      h1: Comp => props => <Comp {...props} color="blue" />,
    }}
  />
)
```

This will render `H1` elements with **blue text**.

Note that `Comp` is the `Heading` component defined in the original `components`
prop. This allows you to keep the existing component and modify it as needed.
Alternatively, you could disregard `Comp` and return a completely different
component.

## Props

| Name                     | Type                                 | Description                                                                                                                                   |
| ------------------------ | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **`html`**               | `PropTypes.string`                   | HTML to render.                                                                                                                               |
| **`components`**         | `PropTypes.objectOf(PropTypes.node)` | An object mapping an HTML element type to anything React can render (numbers, strings, elements, etc.).                                       |
| **`componentOverrides`** | `PropTypes.objectOf(PropTypes.func)` | An object mapping an HTML element type to a function that returns anything React can render. See [Component overrides](#component-overrides). |

## Similar packages

- [markdown-react-renderer][markdown-react-renderer]

[html-react-parser]: https://github.com/remarkablemark/html-react-parser
[markdown-react-renderer]: https://github.com/asyarb/markdown-react-renderer
