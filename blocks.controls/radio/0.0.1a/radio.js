jBlock

.match('radio', function()
{
    this.replaceWith({
            b_check:this.copy(),
            m_mode:'radio',
            m_type:this.mod('type'),
            m_state:this.mod('state'),
            m_size:this.mod('size'),
            m_group:this.mod('group'),
            m_disable:this.mod('disable'),
        })
})
