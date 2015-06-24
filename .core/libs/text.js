(function() {
    'use strict';

    var units = [
        [-12, 'pico'], [-9, 'nano'], [-6, 'micro'], [-3, 'milli'], [-2, 'centi'], [-1, 'deci'],
        [0, 'one'],
        [1, 'ten'], [2, 'hundred'], [3, 'thousand'], [6, 'million'], [9, 'billion'], [12, 'trillion']
    ].reverse();

    var locales = {
        ru: {
            pluralize: function(units, n) {
                if (typeof units === 'string') {
                    return units;
                } else if (n % 10 === 1 && n % 100 !== 11) {
                    return units.one;
                } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14))  {
                    return units.few;
                } else if (n % 10 === 0 || (n % 10 >= 5 && n % 10 <= 9) || (n % 100 >= 11 && n % 100 <= 14)) {
                    return units.many;
                } else {
                    return units.other;
                }
            },

            units: {
                numbers: {
                    trillion: 'трлн',
                    billion: 'млрд',
                    million: 'млн',
                    thousand: 'тыс.',
                    one: ''
                },

                length: {
                    trillion: 'млрд км',
                    billion: 'млн км',
                    million: 'тыс. км',
                    thousand: 'км',
                    one: 'м',
                    deci: 'дм', 
                    centi: 'см',
                    milli: 'мм',
                    micro: 'мкм',
                    nano: 'нм',
                    pico: 'пм'
                },

                lengthFull: {
                    trillion: {
                        one: 'миллиард километров',
                        few: 'миллиарда километров',
                        many: 'миллиардов километров',
                        other: 'миллиарда километров'
                    },
                    billion: {
                        one: 'миллион километров',
                        few: 'миллиона километров',
                        many: 'миллионов километров',
                        other: 'миллиона километров'
                    },
                    million: {
                        one: 'тысяча километров',
                        few: 'тысячи километров',
                        many: 'тысяч километров',
                        other: 'тысячи километров'
                    },
                    thousand: {
                        one: 'километр',
                        few: 'километра',
                        many: 'километров',
                        other: 'километра'
                    },
                    one: {
                        one: 'метр',
                        few: 'метра',
                        many: 'метров',
                        other: 'метра'
                    },
                    deci: {
                        one: 'дециметр',
                        few: 'дециметра',
                        many: 'дециметров',
                        other: 'дециметра'
                    },
                    centi: {
                        one: 'сантиметр',
                        few: 'сантиметра',
                        many: 'сантиметров',
                        other: 'сантиметра'
                    },
                    milli: {
                        one: 'миллиметр',
                        few: 'миллиметра',
                        many: 'миллиметров',
                        other: 'миллиметра'
                    },
                    micro: {
                        one: 'микрометр',
                        few: 'микрометра',
                        many: 'микрометров',
                        other: 'микрометра'
                    },
                    nano: {
                        one: 'нанометр',
                        few: 'нанометра',
                        many: 'нанометров',
                        other: 'нанометра'
                    },
                    pico: {
                        one: 'пикометр',
                        few: 'пикометра',
                        many: 'пикометров',
                        other: 'пикометра'
                    }
                },

                weight: {
                    trillion: 'млн т',
                    billion: 'тыс. т',
                    million: 'т',
                    thousand: 'кг',
                    one: 'г',
                    milli: 'мг',
                    micro: 'мкг'
                },

                weightFull: {
                    trillion: {
                        one: 'миллион тонн',
                        few: 'миллиона тонн',
                        many: 'миллионов тонн',
                        other: 'миллиона тонн'
                    },
                    billion: {
                        one: 'тысяча тонн',
                        few: 'тысячи тонн',
                        many: 'тысяч тонн',
                        other: 'тысячи тонн'
                    },
                    million: {
                        one: 'тонна',
                        few: 'тонны',
                        many: 'тонн',
                        other: 'тонны'
                    },
                    thousand: {
                        one: 'килограмм',
                        few: 'килограмма',
                        many: 'килограммов',
                        other: 'килограмма'
                    },
                    one: {
                        one: 'грамм',
                        few: 'грамма',
                        many: 'граммов',
                        other: 'грамма'
                    },
                    milli: {
                        one: 'миллиграмм',
                        few: 'миллиграмма',
                        many: 'миллиграммов',
                        other: 'миллиграмма'
                    },
                    micro: {
                        one: 'микрограмм',
                        few: 'микрограмма',
                        many: 'микрограммов',
                        other: 'микрограмма'
                    }
                }
            }
        },

        en: {
            pluralize: function(units, n) {
                if (typeof units === 'string') {
                    return units;
                } if (n === 1) {
                    return units.one;
                } else {
                    return units.other;
                }
            }
        },

        tr: {
            pluralize: function(units) {
                if (typeof units === 'string') {
                    return units;
                } else {
                    return units.other;
                }
            }
        }
    };

    function pluralize(locale, units, n) {
        if (isNaN(n) || !isFinite(n)) {
            throw new Error('N is NaN or Infinity');
        }

        return locale.pluralize(units, n);
    }

    function startsWith(pattern, str) {
        return str.slice(0, pattern.length) === pattern;
    }

    function endsWith(pattern, str) {
        return str.slice(str.length - pattern.length, str.length) === pattern;
    }

    function numberToHuman(n, opts) {
        if (isNaN(n) || !isFinite(n)) {
            throw new Error('N is NaN or Infinity');
        }

        var options = merge({
            precision: 0,
            separator: ',',
            delimiter: '\u2009', // thin space
            format: '%n %u',
            units: locales.ru.units.numbers,
            locale: 'ru'
        }, opts || {});

        var expParts = n.toExponential().split('e');
        var mantissa = parseFloat(expParts[0]);
        var exponent = parseInt(expParts[1]);

        var definedUnits = units.filter(function(u) {
            return options.units[u[1]] !== void 0;
        });

        var unit = definedUnits.filter(function(u) {
            return u[0] <= exponent;
        })[0] || definedUnits[definedUnits.length - 1];

        var roundedNumber = Math.round(mantissa * Math.pow(10, exponent - unit[0] + options.precision)) /
                Math.pow(10, options.precision);

        var strNumber = numberWithDelimiter(roundedNumber, {delimiter: options.delimiter, separator: options. separator});

        var suffix = locales[options.locale].pluralize(options.units[unit[1]], roundedNumber);

        return options.format
            .replace('%n', strNumber)
            .replace('%u', suffix)
            .trim();
    }

    function numberWithDelimiter(n, opts) {
        if (isNaN(n) || !isFinite(n)) {
            throw new Error('N is NaN or Infinity');
        }

        var options = merge({
            delimiter: '\u2009', // thin space
            separator: ','
        }, opts);
        
        var nParts = n.toString().split('.');
        var intPart = nParts[0];
        var fracPart = nParts[1] ? options.separator + nParts[1] : '';

        if (intPart.length < 5) {
            return intPart + fracPart;
        } else {
            return intPart.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + options.delimiter) + fracPart;
        }
    }

    window.Text = {
        numberToHuman: numberToHuman,
        numberWithDelimiter: numberWithDelimiter,
        startsWith: startsWith,
        endsWith: endsWith,
        locales: locales,
        pluralize: pluralize
    };

    // Helpers

    function merge(to, from) {
        var result = {};
        for (var t in to) {
            result[t] = to[t];
        }
        for (var f in from) {
            result[f] = from[f];
        }
        return result;
    }
})();
