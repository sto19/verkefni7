/**
 * Verkefni 7 – Caesar dulmál
 */

const LETTERS = `AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ`;

/**
 * Byrja forrit.
 */
function start() {
  const koda = prompt('Hvort viltu kóða eða afkóða streng?\nSkrifaðu kóða eða afkóða.');

  if (koda === 'kóða' || koda === 'afkóða') {
    const n = prompt('Hversu mikið á að hliðra streng?\nGefðu upp heilstölu á bilinu 1-31.');
    if(n >= 1 && n <= 31) {
      const str = prompt(`Gefðu upp strenginn sem á að ${koda} með hliðrun ${n}:`);
      let ologlegt = loglegurStrengur(str.toLocaleUpperCase());
      if (str === "") {
        alert('Strengur er tómur.');
      } else if (ologlegt.length) {
        villa(`Þú gafst upp stafi sem ekki er hægt að ${koda}: ${ologlegt.join(', ')}. Reyndu aftur.`);
      } else {
        let utkoma = koda === 'kóða' ? encode(str.toLocaleUpperCase(), Number.parseInt(n)) : decode(str.toLocaleUpperCase(), Number.parseInt(n));
        alert(utkoma); 
      }
    } else {
      villa(`${n} er ekki heiltala á bilinu [1, 31]. Reyndu aftur.`);
    } 
  } else {
    villa(`Veit ekki hvaða aðgerð „${koda}“ er. Reyndu aftur.`);
  } 
}
   


  function loglegurStrengur(str) {
    let stafir = [];
    for (let i = 0; i < str.length; i++) {
      if(!LETTERS.includes(str[i])) {
        stafir.push(str[i]);
    }
  }
  return stafir;
}

function villa(skilabod) {
  alert(skilabod);
  confirm('Reyna aftur?');
  start();
}

// Hér er gott að commenta út til að vinna í encode/decode föllum fyrst og síðan „viðmóti“ forrits
start();

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */


function encode(str, n) {
  let strengur = '';

  for (let i = 0; i < str.length; i++) {
    let index = LETTERS.indexOf(str[i]);
    if(index+n <= 31) {
      strengur += LETTERS[index+n];
    } else {
      strengur += LETTERS[index+n-LETTERS.length];
    }
  }

  return strengur;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n) {
  let strengur = '';

  for (let i = 0; i < str.length; i++) {
    let index = LETTERS.indexOf(str[i]);
    if(index-n >= 0) {
      strengur += LETTERS[index-n];
    } else {
      strengur += LETTERS[index-n+LETTERS.length];
    }
  }

  return strengur;
}

// console.assert(encode('AÁB', 3) === 'DÐE', 'kóðun á A með n=3 er D');
// console.assert(decode('DÐEÉFGHIÍ', 3) === 'AÁBDÐEÉFG', 'afkóðun á D með n=3 er A');
// console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 32) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'kóðun með n=32 er byrjunarstrengur');
// console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 3) === 'DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 'kóðun á stafrófi með n=3');
// console.assert(decode('DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 3) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'afkóðun á stafrófi með n=3');
// console.assert(decode(encode('HALLÓHEIMUR', 13), 13) === 'HALLÓHEIMUR', 'kóðun og afkóðun eru andhverf');
