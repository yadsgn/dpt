jBlock

.match('slider', function()
{

    console.log(this.mod('mode'))

    this.tag('span')
        .js()
        .defMod({
            size:'M',
            mode:'offset',
        })
        .css({
            width:this.param('width')
        })
        .append(
            {e_track:''},

            (this.mod('mode') === 'interval' || this.mod('mode') === 'fromto')
                && {e_interval:''},

            this.param('max') && this.param('min')
                && {e_ruler:[
                    {e_min: this.param('min') + (this.param('unit') ? ', '+this.param('unit') : '' ) },
                    {e_max: this.param('max')}
                ]},

            this.mod('mode') === 'fromto'
                ? [{e_from:''}, {e_to:''}]
                : {e_pointer:''}
        )
})

.match('slider__min', 'slider__max', function ()
{
    this.tag('span')
})

.match('slider__from', 'slider__to', 'slider__pointer', function()
{
    this.replaceWith({
        b_button:'',
        mix:this.selector(),
        m_size:this.blockMod('size')
    })
})
