jBlock

.match('menu', function ()
{
    this.js()
        .defMod({
            size:'M',
            mode:'',
            type:'',
            'hide-icons':''
        })
        .append(
            this.copy('e_item', 'e_custom'),
            this.copy('e_group'),
            this.copy('e_col')
        )

    if (this.mod('mode'))
        this.mod('type', 'select')
})

.match('menu__col', function()
{
    this.css({
            width: this.param('width')
        })
        .append(
            this.copy('e_item'),
            this.copy('e_group')
        )
})

.match('menu__item', function()
{
    this.mix('link')
        .defMod({
            state:''
        })
        .attr({
            short:this.param('short')
        })

    if (this.param('icon'))
        this.mod('icon', 'yes')
            .css({
                'background-image': this.param('icon')
            })
})

.match('menu__group', function()
{
    this.append(
            this.param('title') && {e_title:this.param('title')},
            this.copy('e_item'),
            this.has('!e_item') && {e_custom:this.copy('!e_item')}
        )
})