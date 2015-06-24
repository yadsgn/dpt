jBlock

.match('check', function()
{
    this.tag('span')
        .js()
        .defMod({
            state:'',
            size:'M',
            disable:'',
            mode:'',
            group:'',
            type:'normal'
        })
        .append(
            {
                b_button:'',
                m_mode: this.mod('mode') || 'check',
                m_size: this.mod('size'),
                m_type: this.mod('type'),
                m_state: this.mod('state'),
                m_group: this.mod('group'),
                m_disable: this.mod('disable')
            },
            this.has()
                && {e_label:this.copy(), tag:'span'}
        )
})