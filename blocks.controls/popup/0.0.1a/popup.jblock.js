jBlock

.match('popup', function()
{
    if (this.mod('type') && !this.mod('mode') && !this.param('show-on') && !this.param('hide-on'))
        this.mod('mode', 'tip')

    this.js()
        .defMod({
            show:'bottom-center',
            state:'hidden',
            mode:'click',
            tail:'',
            size:'M',
            'auto-close':'',
            force:'',
            type:'normal',
        })
        .attr({
            offset: this.param('offset'),
            'side-offset': this.param('side-offset'),
            'align-offset': this.param('align-offset'),
            trigger:this.param('trigger'),
            'show-on':this.param('show-on'),
            'hide-on':this.param('hide-on')
        })
        .append(
            {e_tail:''},
            {e_content: this.text() ? {e_line:this.text()} : this.copy()}
        )
})
