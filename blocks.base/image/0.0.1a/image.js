jBlock

.match('image', function()
{
    this.defMod({
            scale:'adaptive',
            type:'',
            'max-width':'',
            active:false,
            'hyper-active':false,
            fade:false,
            shadow:false,
            border:false,
        })

    if (this.mod('scale') === 'adaptive')
    {
        this.append({
            e_img:'',
            tag:'img',
            attr:{
                src:    this.param('src') || this.text(),
                width:  this.param('width'),
                height: this.param('height'),
                border: this.param('border'),
            },
        })
    }
    else
    {
        this.css({
                'background-image': this.param('src') || this.text(),
                width:this.param('width'),
                height:this.param('height'),
            })
            .append(
                this.copy('e_title')
            )
    }
})