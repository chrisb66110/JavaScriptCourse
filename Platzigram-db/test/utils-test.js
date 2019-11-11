'use strict'

const test = require('ava')
const utils = require('../lib/utils')

test('extracting hashtags from text', t => {
  let tags = utils.extractTags('a #picture with tags #AwEsOmE #Platzi #AVA and #100 ##yes')

  // deepEqual permite comparar 2 arrays, posiciones y valores
  t.deepEqual(tags, ['picture', 'awesome', 'platzi', 'ava', '100', 'yes'])

  tags = utils.extractTags('a picture with tags AwEsOmE Platzi AVA and 100 yes')
  t.deepEqual(tags, [])

  tags = utils.extractTags()
  t.deepEqual(tags, [])

  tags = utils.extractTags(null)
  t.deepEqual(tags, [])
})
/*
//TEST DE PRUEBA
test('this should pass', t => {
  t.pass()
})

test('this should fail', t => {
  t.fail()
})

test('ir should support async/await', async t => {
  const p = Promise.resolve(42)
  const secret = await p
  t.is(secret, 42)
})
*/
