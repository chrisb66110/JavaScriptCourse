'use strict'

const utils = {
  extractTags
}

function extractTags (text) {
  if (text == null) return []
  // It is a function of java script strings that allows you to use regular expressions
  let matches = text.match(/#(\w+)/g)

  // Case where matches is empty because there are not #

  if (matches === null) return []
  // Case where text comes empty or undefined

  matches = matches.map(normalize)

  // Case where there are #
  return matches
}

function normalize (text) {
  text = text.toLowerCase()
  text = text.replace(/#/g, '')
  return text
}

module.exports = utils
