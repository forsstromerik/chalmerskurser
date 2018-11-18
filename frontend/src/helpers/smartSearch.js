import { getInstitution, getProgramme, getSP } from './parser';

const KEYS = {
  a: 'name',
  b: 'code',
  c: 'examinator',
  d: 'credits',
  e: 'ownerProgram',
  f: 'sp',
  g: 'institution'
}

const smartSearch = (course, value) => {
  let val = smartReduce(value, true);
  return val.every(v => matchQuery(course, v));
}

const matchQuery = (o, v) => {
  let found = false;
  for (const i in KEYS) {
    const reducedVal = 
      i === 'e' ?
        concat(smartReduce(o[KEYS[i]]), smartReduce(getProgramme(o[KEYS[i]]))) :
      i === 'f' ? 
        concat(smartReduce(o[KEYS[i]]), smartReduce(getSP(o[KEYS[i]]))) :
      i === 'e' ?
        smartReduce(getInstitution(o[KEYS[i]])) : 
        smartReduce(o[KEYS[i]]);
    const regexVal = RegExp(v); 
    if(reducedVal) {
      found |= !!reducedVal.match(regexVal);
    } 
  }
  return !!found;
}

const smartReduce = (value, split = false) => {
    if(!value) return null;
    /* 
    * 1) Make query lowercase
    * 2) Separate with respect to divider: #
    * 3) Remove any spaces
    * 4) Make sure that query does not end with just #
    */
   let val = value
            .toLowerCase()
            .split(split ? /#/ : /''/)
            .map(a => a.replace(/\s/gm, ''))
            .filter(b => b !== "")
    return split ? val : val[0];
}

const concat = (a, b) => `${a}${b}`;

export default smartSearch;
