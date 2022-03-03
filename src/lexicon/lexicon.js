import lexData from './_data.js'
import { unpack } from 'efrt'
import conjugate from './methods/conjugate.js'

let lexicon = {}

const addWords = function (obj, tag, lex) {
  Object.values(obj).forEach(w => {
    lex[w] = tag
  })
}

Object.keys(lexData).forEach(tag => {
  let wordsObj = unpack(lexData[tag])
  Object.keys(wordsObj).forEach(w => {
    lexicon[w] = tag
    // add conjugations for our verbs
    if (tag === 'Infinitive') {
      // add present tense
      let obj = conjugate.toPresent(w)
      addWords(obj, 'PresentTense', lexicon)
      // add past tense
      obj = conjugate.toPast(w)
      addWords(obj, 'PastTense', lexicon)
      // add future tense
      obj = conjugate.toFuture(w)
      addWords(obj, 'FutureTense', lexicon)
      // add conditional
      obj = conjugate.toConditional(w)
      addWords(obj, 'Verb', lexicon)
    }
  })
})
// console.log(lexicon['llorar'])

export default lexicon