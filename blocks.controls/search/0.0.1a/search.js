jBlock

.match('search', function()
{
    this.js()
        .defMod({
            state:'release',
            shadow:false,
            action:false,
            autofocus:false
        })
        .css({
            width:this.param('width')
        })
        .append(
            {
                b_input:'',
                m_size:'head',
                m_type:'button',
                m_pin:'right',
                hint: this.mod('autofocus') ? this.text() : ''
            },
            {
                b_button:'Найти',
                m_size:'head',
                m_pin: this.mod('action') ? 'left' : 'left-border',
                m_type: this.mod('action') ? 'action' : 'normal',
            },
            {
                b_suggest:'',
                m_theme:'popup'
            }
        )
},
{
    init: function () {
        if (this.domElem.is('.search_autofocus')) {
            this.block('input').focus()
        }
        this.block('suggest').bindWithInput(
            this.block('input').elem('input')
        )
    },
    bindToElem: {
        button: {
            click: function () {
                this.findBlockInside('input').focus()
            }
        }
    },
    onBlock: {
        input: {
            focus: function () {
                this.setMod('state', 'focus')
                // this.block('button').setMod('type', 'clear')
            },
            blur: function () {
                this.setMod('state', 'release')
                // this.block('button').setMod('type', 'action')
            }
        }
    }
})
