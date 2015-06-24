;(function ($)
{
    $.fn.mousestop = function (timeout)
    {
        var timeoutObject,
            that = this

        if (typeof timeout === 'undefined')
            timeout = 100

        this.on('mousemove', function ()
            {
                timeoutObject && clearTimeout(timeoutObject)
                timeoutObject = setTimeout(
                    function () {
                        that.trigger('mousestop')
                    },
                    timeout
                )
            })
            .on('mouseout', function ()
            {
                timeoutObject && clearTimeout(timeoutObject)
            })
    }

})(jQuery);