jBlock

.match('tumbler', function()
{
    this.tag('span')
        .js()
        .defMod({
            size:'M',
            state:'off'
        })
        .append({
            e_track: [
                {e_on:''},
                {b_button:''},
                {e_off:''},
                {e_placeholder:'.'},
            ]
        })
})