jBlock

.match('input', function ()
{
    this.js()
        .tag('span')
        .defMod({
            size:'M',
            type:'normal',
            state:'release',
            pin:'',
            disable:'',
            readonly:'',
            align:'',
            shadow:false,
            mode:'',
            focus:'',
            hover:'',
        })
        .css({
            width: this.param('width')
        })

    if (this.param('iconleft'))
        this.append({e_icon:'', m_type:this.param('iconleft'), m_side:'left'})

    if (this.param('iconright'))
        this.append({e_icon:'', m_type:this.param('iconright'), m_side:'right'})

    this
        .append({
            e_input:'',
            tag:'input',
            attr: {
                size:1,
                autocomplete:'off',
                placeholder:this.param('hint'),
                value: this.param('value'),
                readonly: this.param('readonly') && 'yes',
                spellcheck: 'false'
            }
        })
        .append(
            {e_clear:''},
            {e_ground:''},
            this.copy()
        )
})
