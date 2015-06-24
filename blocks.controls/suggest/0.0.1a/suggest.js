require('./suggest.jblock.js');

jBlock.match('suggest',
{
    init: function () {
        var that = this
        this.block('fog').bindTo('mousedown', function () {
            that.setMod('state', 'release')
        })
    },
    onSetMod: {
        state: {
            release: function () {
                this.block('fog').hide()
                BEM.DOM.win.trigger('suggest:release', this)
            },
            active: function () {
                if (this.hasMod('theme', 'layer')) {
                    this.block('fog').show()
                }
                BEM.DOM.win.trigger('suggest:active', this)
            }
        }
    },
    onElemSetMod: {
        item: {
            state: {
                selected: function (item) {
                    this.setMod(
                        this.getItems().not(item), 'state', 'release'
                    )
                    BEM.DOM.win.trigger('suggest:item-select', this)
                }
            },
            current: {
                yes: function (item) {
                    this.delMod(
                        this.getItems().not(item), 'current'
                    )
                }
            }
        }
    },
    bindToElem: {
        item: {
            mouseover: function (e) {
                this.setMod($(e.currentTarget), 'state', 'selected')
            },
            mouseout: function (e) {
                this.setMod($(e.currentTarget), 'state', 'release')
                if (!this.getSelectedItem().length)
                    BEM.DOM.win.trigger('suggest:no-item-select', this)
            },
            click: function () {
                this.select()
            },
        }
    },
    bindToWin: {
        keydown: function (e) {
            var key = jBlock.import.key,
                targetFocus = $(e.target).is(':focus')

            if (e.keyCode === key.enter)
                targetFocus && this.selectedText() !== ''
                    ? this.select()
                    : this.setMod('state', 'release')

            if (targetFocus && this.hasMod('state', 'active')) {
                if (e.keyCode === key.up)
                    this.selectDirection(0)
                if (e.keyCode === key.down)
                    this.selectDirection(1)
            }
        },
        scroll: function (e) {
            if (document.body.scrollTop > 0)
                this.setMod('bottom', 'yes')
            else
                this.delMod('bottom')
        },
        'arrow:focus': function (e, arrow) {
            if (this.hasMod('state', 'release')) {
                this.setMod('state', 'active')
                this.apiRequest(arrow.getQuery())
            }
        },
        'tableau:active': function () {
            //this.setMod('state', 'release')
        },
        'arrow:submit arrow:submit-press': function () {
            this.setMod('state', 'release')
        },
        'arrow:empty': function () {
            this.setMod('for', 'history')
        },
        'arrow:has-text': function () {
            this.setMod('for', 'current')
        },
        'arrow:input': function (e, arrow) {
            this.apiRequest(arrow.getQuery())
        },
        'arrow:focused-input': function () {
            this.setMod('state', 'active')
        },
        'home:release': function () {
            this.setMod('state', 'release')
        },
        'filters:active': function () {
            this.setMod('state', 'release')
        }
    },
    bindWithInput: function (input)
    {
        var that = this

        this.setMod('for', 'current')

        input
            .on('input', function () {
                if (that.hasMod('state', 'release')) {
                    that.setMod('state', 'active')
                }

                if (input.val() !== '') {
                    that.setMod('state', 'active')
                } else {
                    that.setMod('state', 'release')
                }

                that.apiRequest(input.val())
            })
            .on('keydown', function (e) {
                if (e.keyCode == jBlock.import.key.enter) {
                    that.setMod('state', 'release')
                }
            })
            .on('focus', function () {
                if (that.hasMod('state', 'release') && input.val() !== '') {
                    that.setMod('state', 'active')
                    that.apiRequest(input.val())
                }
            })
            .on('blur', function () {
                that.setMod('state', 'release')
            })

    },
    select: function () {
        var href = this.getSelectedItem().attr('href'),
            isFilter = this.getSelectedItem().is('.suggest__item_filter')

        if (href) {
            document.location = href
        } else {
            this.setMod('state', 'release')

            if (isFilter) {
                BEM.DOM.win.trigger('suggest:filter', this)
            } else {
                BEM.DOM.win.trigger('suggest:select', this)
            }
        }
    },
    selectedText: function () {
        return this.getSelectedItem().attr('text') || ''
    },
    selectDirection: function (down)
    {
        var current = this.getSelectedItem()

        if (!current.length) {
            var next = down ? this.getFirstItem() : this.getLastItem()
        } else {
            var next = down ? current.next() : current.prev()
            if (!next.length) {
                next = down ? this.getFirstItem() : this.getLastItem()
            }
        }

        this.setMod(next, 'state', 'selected')
        this.setMod(next, 'current', 'yes')

        if (!next.is('.suggest__item_filter'))
            BEM.DOM.win.trigger('suggest:item-select-keyboard', this)
    },
    getItems: function () {
        return this.elem('content').find('> .suggest__'+ this.getMod('for') +' > .suggest__item')
    },
    getSelectedItem: function () {
        return this.getItems().filter('.suggest__item_state_selected, .suggest__item_current_yes')
    },
    getFirstItem: function () {
        return this.getItems().first()
    },
    getLastItem: function () {
        return this.getItems().last()
    },
    apiRequest: function (text) {
        var that = this

        if (this._ajaxRequest)
            this._ajaxRequest.abort()

        // this._ajaxRequest = $.ajax({
        //     url:'http://suggest.yandex.net/suggest-ya.cgi',
        //     data: {
        //         v:4,
        //         n:5,
        //         fact:1,
        //         yu: $.cookie('yandexuid') || '1296211411393944845',
        //         uil:jBlock.import.lang,
        //         part:text,
        //     },
        //     crossDomain:true,
        //     dataType:'jsonp',
        // })
        this._ajaxRequest = $.ajax({
            url:'http://proxy.tools.serp.yandex.ru',
            data: {
                nosearch:1,
                mixflags:'kusto_suggest',
                v:4,
                n:5,
                fact:1,
                yu: $.cookie('yandexuid') || '1296211411393944845',
                uil:jBlock.import.lang,
                part:text,
            },
            crossDomain:true,
            dataType:'jsonp',
        })
        .done(function (data) {
            that.say2win('suggest:refresh')

            var json = data2bem(data),
                html = jBlock.json2html(json)

            that.elem('content').empty().append(
                $(html).find('.suggest__content').find('> *')
            )

            that.reinit('bindToElem')
            jBlock.domInit(that.domElem.find('.snippet'))

            var ahead = data[2]['continue']
            if (ahead)
                BEM.DOM.win.trigger('suggest:ahead', ahead)
        })

        function data2bem (data) {
            return {
                b_suggest:items(data[1]),
                m_theme:that.getMod('theme')
            }
        }

        function items (ctx) {
            return ctx.map(function (ctx)
            {
                var item = {e_item:''}

                if (typeof ctx === 'string') {
                    item.text = ctx
                } else {
                    if (!ctx[1])
                        return

                    item.text = ctx[1]

                    if (ctx[0] === 'fact')
                        item.fact = ctx[2]

                    if (ctx[0] === 'nav') {
                        item.text = ctx[2]
                        item.href = '//'+ ctx[3]
                        item.content = {b_snippet:[
                            {e_title: ctx[2]},
                            {e_url: ctx[3]},
                            // {e_text: richData.snippet},
                        ], m_expandable:true}
                    }

                    if (ctx[1] === 'rich_kusto' && !that.hasMod('theme', 'popup')) {
                        var richData = ctx[2]

                        if (richData.template === 'wiki') {
                            item.text = richData.title
                            item.href = '//'+ richData.url
                            item.content = {b_snippet:[
                                {e_title: richData.title},
                                {e_url: richData.url},
                                {e_text: richData.snippet},
                                richData.image && {e_userpic: richData.image.url},
                            ], m_expandable:true}
                        }

                        if (richData.template === 'nav') {
                            item.text = richData.title
                            item.href = '//'+ richData.url
                            if (richData.thumb && richData.thumb[0]) {
                                item.navThumb = richData.thumb[0].resources.logo_main
                                item.navColor = richData.thumb[0].bgcolor
                            } else {
                                item.content = {b_snippet:[
                                    {e_title: richData.title},
                                    {e_url: richData.url},
                                    // {e_text: richData.snippet},
                                ], m_expandable:true}
                            }
                        }
                    }
                }

                return item
            })
        }
    },
})
