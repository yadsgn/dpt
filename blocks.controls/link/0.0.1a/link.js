jBlock

.match('link', function()
{
    this.tag('a')
        .attr({
            href: this.param('href'),
            target: this.param('target')
        })

    var icon = this.param('icon')

    if (icon) {
        this.mod('icon', true)
            .css('background-image', 'url(' + icon + ')')
    }
},
{
    init: function ()
    {
        if (this.domElem.attr('href')) {
            if (this.domElem.is('.link_pseudo'))
                this.bindTo('click', this.proceedPseudo)
            else if (this.domElem[0].tagName !== 'A')
                this.bindTo('click', this.proceed)
        }
    },

    proceed: function () {
        console.log('proceed')
        var href = this.domElem.attr('href')
        if (this.domElem.attr('target') === '_blank')
            window.open(href, '_blank')
        else
            document.location = href
    },

    proceedPseudo: function () {
        window.history.pushState(
            null, null, this.domElem.attr('href')
        )
        return false
    }
})
