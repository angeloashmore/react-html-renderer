import React from 'react'
import parse from 'html-react-parser'
import domToReact from 'html-react-parser/lib/dom-to-react'

export const HTMLRenderer = ({ html = '', components = {}, ...props }) => {
  const parserOptions = {
    replace: ({ name, attribs, children: nodeChildren }) => {
      let children = null
      if (nodeChildren) children = domToReact(nodeChildren, parserOptions)

      const Comp = components[name]

      if (!Comp) return

      return React.createElement(Comp, { name, ...attribs }, children)
    },
  }

  const reactElement = parse(html, parserOptions)

  return React.cloneElement(reactElement, props)
}
