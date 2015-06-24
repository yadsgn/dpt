jBlock

.match('button', function ()
{
    if (this.mod('mode')
        || !this.mod('state')
        && !this.mod('focus')
        && !this.mod('hover')
    ) {
        this.js()
    }

    this.tag('button')
        .defMod({
            size: 'M',
            type:'normal',
            mode:'button',
            state:'release',
            name:'',
            align: this.param('width') ? 'center' : '',
            group:'',
            pin:'',
            shape:'',
            'max-width':'',
            disable:'',
            load:'',
            shadow:false,
            focus:false,
            hover:false
        })
        .attr({
            title:this.param('title'),
            href:this.param('href'),
            target:this.param('target'),
        })
        .css({
            width:this.param('width')
        })

    if (this.param('icon') && !this.copy().length)
        this.mod('icon-only', 'yes')

    if (this.param('icon'))
        this.append({
            e_icon:'',
            tag:'span',
            css: {'background-image': this.param('icon')}
        })

    this.append({
            e_label: this.copy(),
            m_empty: this.has() ? '' : 'yes',
            tag:'span'
        })
        .append({
            e_ground:'',
            tag:'span'
        })

    if (this.mod('type') == 'pseudo' || this.mod('type') == 'clear')
        this.append({e_border:'', tag:'span'})

    if (this.mod('mode') == 'radio' || this.mod('mode') == 'check')
        this.append({e_tip:'', tag:'span'})

    if (this.mod('mode') == 'close')
        this.append({e_close:'', tag:'span'})

    if (this.mod('mode'))
        this.append({e_arrow:'', tag:'span'})
})
