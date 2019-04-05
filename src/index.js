import React from 'react'
import Parser from 'html-react-parser'
import domToReact from 'html-react-parser/lib/dom-to-react'

export const HTMLRenderer = ({ html = '', components = {} }) => {
  const parserOptions = {
    replace: ({ name, attribs, children: nodeChildren }) => {
      let children = null
      if (nodeChildren) children = domToReact(nodeChildren, parserOptions)

      const Comp = components[name]

      if (!Comp) return

      return React.createElement(Comp, { name, ...attribs }, children)
    },
  }

  return Parser(html, parserOptions)
}
