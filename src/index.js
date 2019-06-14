import React from 'react'
import parse from 'html-react-parser'
import domToReact from 'html-react-parser/lib/dom-to-react'

export const HTMLRenderer = ({ html = '', components = {} }) => {
  const parserOptions = {
    replace: ({ name, attribs, children: nodeChildren }) => {
      const children = nodeChildren
        ? domToReact(nodeChildren, parserOptions)
        : null

      const Comp = components[name]

      if (!Comp) return

      return React.createElement(Comp, { name, ...attribs }, children)
    },
  }

  return parse(html, parserOptions)
}
