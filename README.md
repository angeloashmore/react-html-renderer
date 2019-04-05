# react-html-renderer

React component that renders an HTML string as a React component tree.

**Note**: This component uses [`html-react-parser`](html-react-parser) under
the hood but makes no promises about changing the underlying library in a
future release.

## Status

[![npm version](https://badge.fury.io/js/react-html-renderer.svg)](http://badge.fury.io/js/react-html-renderer)
[![Build Status](https://travis-ci.com/angeloashmore/react-html-renderer.svg?branch=master)](https://travis-ci.com/angeloashmore/react-html-renderer)

## Install

```sh
npm install --save react-html-renderer
```

## Example

```jsx
import React from 'react'
import { HTMLRenderer } from 'react-html-renderer'

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

## Props

| Name             | Type                                  | Description                                                                                             |
| ---------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **`html`**       | `PropTypes.string`                    | HTML to render.                                                                                         |
| **`components`** | `PropTypes.objectOf.(PropTypes.node)` | An object mapping an HTML element type to anything React can render (numbers, strings, elements, etc.). |
