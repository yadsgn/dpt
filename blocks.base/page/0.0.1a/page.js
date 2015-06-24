require('./page.jblock.js');

$(function () {
    if (typeof jBlock === 'undefined')
        BEM.DOM.init()
})

BEM.DOM.decl('page',
{
    onSetMod:
    {
        js: function ()
        {
            var that = this

            this.bindToWin('keydown', this._onWinKeydown)

            this._head = this.findBlockInside('head')
            this._vert = this.findBlockInside('vert')

            if (this._head && this._head.hasMod('position', 'fixed')) {
                this.setMod('fixed-head', 'yes')
            }
            // this.bindToWin('head:position-fixed', function () {
            //     this.setMod('fixed-head', 'yes')
            // })
            // this.bindToWin('head:position-static', function () {
            //     this.delMod('fixed-head')
            // })

            this.bindToWin('arrow:focus arrow:input head:filters-on', function () {
                // if (this.domElem[0].scrollTop !== 0)
                //     this.domElem.animate({scrollTop:0}, 100)
            })
        }
    },

    _onHeadHeightChange: function (diff, time)
    {
        this.domElem.animate({paddingTop: '+=' + diff}, time)
        this._vert && this._vert.domElem.animate({top: '+=' + diff}, time)
    },

    _onWinKeydown: function (e)
    {
        if (e.keyCode == 9) //tab
            this.domElem.addClass('onkey')

        if (e.keyCode == 27) //esc
            this.domElem.removeClass('onkey')
    }
})
