import React from 'react'
import parse from 'html-react-parser'
import domToReact from 'html-react-parser/lib/dom-to-react'

export const HTMLRenderer = ({
  html = '',
  components = {},
  componentOverrides = {},
}) => {
  const resolvedComponents = Object.keys(componentOverrides).reduce(
    (acc, key) => {
      const Comp = components[key] || (props => React.createElement(key, props))

      acc[key] = componentOverrides[key](Comp)

      return acc
    },
    components,
  )

  const parserOptions = {
    replace: ({ name, attribs, children: nodeChildren }) => {
      const children = nodeChildren
        ? domToReact(nodeChildren, parserOptions)
        : null

      const Comp = resolvedComponents[name]

      if (!Comp) return

      return React.createElement(Comp, { name, ...attribs }, children)
    },
  }

  return parse(html, parserOptions)
}
