;(function ()
{
    String.prototype.firstLetterUpperCase = function () {
        return this.slice(0,1).toUpperCase() + this.slice(1)
    }

    String.prototype.formatNumber = function () {
        return this.replace(/[,\.]\d*/, '').length > 4
            ? this.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1&thinsp;')
            : this + ''
    }

    Number.prototype.decl = function () //unit: array for 1, 2 and 5 units
    {
       if (Math.floor(this) - this != 0) return arguments[0];
       if (this%100 >= 10 && this%100 <= 20) return arguments[1];
       return arguments[
           [2,0,1,1,1,2,2,2,2,2][this % 10]
       ]
    }

    Number.prototype.formatNumber = function () {
        return this.toString().formatNumber()
    }

    Object.defineProperty(Array.prototype, 'random', {
        enumerable: false,
        get: function () {
            return this[
                Math.round(Math.random() * (this.length-1))
            ]
        }
    })

    var originalPushState = window.history.pushState
    window.history.pushState = function () {
        originalPushState.apply(this, arguments)
        $(window).trigger('pushstate')
    }

    jBlock.import =
    {
        favicon:'http://favicon.yandex.net/favicon/',
        lang:'ru',
        locale:{ru:{},en:{},tr:{},ua:{},de:{}},
        icon:{},
        key: {
            enter:13,
            esc:27,
            up:38,
            down:40,
            left:37,
            right:39,
            space:32,
            backspace:8
        },

        platform: window.navigator.userAgent.indexOf('iPad') >= 0
            ? 'tablet'
            : window.navigator.userAgent.indexOf('iPhone') >= 0
                ? 'mobile'
                : 'desktop',

        queryParam: function (name)
        {
            var values = document.location.search.match(
                new RegExp('(?:\\?|&)'+ name +'=([^&]+)')
            )

            return values ? decodeURI(values.pop()) : ''
        },
        setLocale: function (bemNode, langs) {
            bemNode.param('locale', langs[jBlock.import.lang])
            return bemNode.param('locale')
        },
        commonLocale: function () {
            return jBlock.import.locale[jBlock.import.lang]
        },

        date: function (text, shortMonth) {
            var dmy = text.split(/[.\/-]/).map(function (i) {return parseInt(i)}),
                date = new Date (dmy[2], dmy[1]-1, dmy[0]),
                month = this.commonLocale().month[shortMonth ? 'short' : 'genitive']

            return date.getDate() +' '+ month[date.getMonth()].toLowerCase() +' '+ date.getFullYear()
        },
    }

    var platform = jBlock.import.queryParam('platform')
    if (platform)
        jBlock.import.platform = platform

})();

require('./locale/ru.js');
require('./icon/icon.js');
