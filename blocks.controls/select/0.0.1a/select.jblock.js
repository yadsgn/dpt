jBlock

.match('select', function()
{
    this.tag('span')
        .js()
        .defMod({
            size:'',
            pin:'',
            type:'',
            mode:'',
            title:'',
            width:'',
            'hide-icons':'',
            'max-width':''
        }).attr({
            title: this.param('title')
        })
        .append({
            b_popup:[
                {
                    e_trigger:{
                        b_button:this.param('title') || ' ',
                        m_mode:'dropdown',
                        'm_max-width': this.mod('max-width'),
                        m_type: this.mod('type'),
                        m_size: this.mod('size'),
                        m_pin: this.mod('pin'),
                        icon: this.param('icon'),
                        width: this.param('width')
                    }
                },{
                    b_menu:this.copy(),
                    m_mode:this.mod('mode') || 'radio',
                    m_size:this.mod('size'),
                    'm_hide-icons':this.mod('hide-icons'),
                    icon: this.param('icon')
                }
            ],
            m_show:'bottom-left'
        })

    if (!this.mod('title'))
        this.mod('title',
            this.param('title') && (this.mod('mode') === 'radio' || !this.mod('mode'))
                ? 'independent'
                : 'dependent'
        )

    if (!this.mod('width') && !this.param('title'))
        this.mod('width', 'fixed')
})
