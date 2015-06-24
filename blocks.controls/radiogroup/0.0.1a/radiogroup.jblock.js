jBlock

.match('radiogroup', function()
{
    this.tag('span')
        .js()
        .defMod({
            'max-width':'',
            mode:'',
            size:'',
            type:'',
            justify:false,
            disable:''
        })
        .param('itemCount', this.copy('e_item').length)
        .append(
            this.copy('e_item')
        )
})

.match('radiogroup__item', function()
{
    this.replaceWith({
        b_button:this.copy(),
        m_mode: this.blockMod('mode') || 'radio',
        m_size: this.blockMod('size'),
        m_type: this.blockMod('type'),
        m_pin: this.mod('pin'),
        m_state:this.mod('state'),
        m_disable:this.blockMod('disable'),
        m_align: (this.blockMod('max-width') || this.blockMod('justify') || this.param('width')) && 'center',
        width: this.param('width') || this.blockMod('max-width')
            && ((100 / this.blockParam('itemCount')) + '%'),
        icon:this.param('icon'),
        target:this.param('target'),
    })
})
