jBlock

.match('suggest', function()
{
    this.js()
        .defMod({
            demo:'',
            state:'release',
            history: 'on',
            'for': jBlock.import.queryParam('text') ? 'current' : 'history',
            theme:'normal'
        })
        .append(
            {e_content:[
                {e_current:this.copy()},
                {e_history:''},
            ]},
            {b_fog:''}
        )
})

.match('suggest__item', function()
{
    // Зачем нужен был этот костыль?
    //    if (this.index() > 5)
    //        return this.replaceWith()

    this.append(this.copy());

    this.mod({
            state: 'release',
            type: this.param('type') || ''
        })
        .attr({text: this.param('text')})

    if (!this.copy().length) {
        this.append({e_text:this.param('text')})
    }

    if (this.blockMod('theme') == 'popup') {
        return
    }

    if (this.param('icon'))
        this.append({e_icon:'', m_type:this.param('icon')})

    if (this.param('hint'))
        this.append({e_hint:this.param('hint')})

    if (this.param('fact'))
        this.append({e_fact:this.param('fact')})

    if (this.param('vert'))
        this.append({e_hint:jBlock.import.commonLocale().service[this.param('vert')].toLowerCase()})

    if (this.param('type') === 'history')
        this.append(
                {e_hint:' — вы искали'},
                {
                    l_link:'Удалить',
                    m_ghost:true,
                    m_minor:true,
                    mix:'suggest__delete'
                }
            )

    if (this.param('navThumb')) {
        this.append({
                e_navthumb:'',
                css:{
                    'background-image':this.param('navThumb'),
                    'background-color':this.param('navColor'),
                },
                m_border: this.param('navColor').toLowerCase() === '#ffffff'
            })
    }

    if (this.param('href'))
        this.mod('type', 'nav')
            .attr({href:this.param('href')})
})

.match('suggest__history', function()
{
    var history = $.cookie('serp-query-history')

    if (history) {
        history = history.split('|')
        for (var i = 0, ii = history.length; i < ii; i++)
            if (history[i].replace(/\s+/, '') !== '')
                this.append({e_item:'', text:history[i]})
    }
})

.match('suggest__group', function()
{
    this.append(
        this.param('title') && {e_title:this.param('title')},
        {e_items:this.copy('e_item')}
    )
})

.match('suggest__b', function()
{
    this.tag('b');
})
