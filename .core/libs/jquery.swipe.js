/*
 * by @kovchiy
 */

;(function ($)
{
    $.fn.swipeVertical = function (options)
    {
        var that = this
        var swipeEmitted = false
        var swipeCondition = false
        var timerStarted = false
        var swipeTimeout
        var fromX, fromY, toX, toY
        var deltaX, deltaY, delta
        var $win = $(window)

        options = $.extend({
            onStart: function () {
                that.trigger('swipe-start')
            },
            onEnd: function () {
                that.trigger('swipe-end')
            },
            onSwipeUp: function () {
                that.trigger('swipe-up')
            },
            onSwipeDown: function () {
                that.trigger('swipe-down')
            },
            swipeCondition: function () {
                return true
            },
            startCondition: function () {
                return document.body.scrollTop <= 0
            },
            endCondition: function () {
                return document.body.scrollTop + window.innerHeight >= document.body.offsetHeight
            },
        }, options)

        $win.on('touchstart', function (e) {
                swipeCondition = options.swipeCondition(e)
                if (!swipeCondition) return

                fromX = e.originalEvent.touches[0].clientX
                fromY = e.originalEvent.touches[0].clientY
                swipeEmitted = false
                timerStarted = false
            })
            .on('touchmove', function (e) {
                if (!swipeCondition) return

                toX = e.originalEvent.touches[0].clientX
                toY = e.originalEvent.touches[0].clientY
                deltaX = toX - fromX
                deltaY = toY - fromY

                if (Math.abs(deltaY) > Math.abs(deltaX) && !options.endCondition()) {
                    delta = Math.abs(deltaY)

                    if (deltaY < 0) {
                        options.onSwipeDown()
                    }
                    if (deltaY > 0) {
                        if (!timerStarted) {
                            timerStarted = true
                            swipeEmitted = true
                            swipeTimeout = setTimeout(function () {
                                swipeEmitted = false
                            }, 100)
                        }
                    }
                }
            })
            .on('touchend', function (e) {
                if (!swipeCondition) return

                clearTimeout(swipeTimeout)
                if (swipeEmitted) {
                    options.onSwipeUp()
                }
            })
            .on('scroll', function (e) {
                if (!swipeCondition) return

                if (options.endCondition(e)) {
                    options.onEnd()
                }
                if (options.startCondition(e)) {
                    options.onStart()
                }
            })
    }

    $.fn.swipeHorizontal = function (options)
    {
        var that = this
        var swipeEmitted = false
        var fromX, fromY, toX, toY
        var deltaX, deltaY, delta
        var $win = $(window)
        var swipeCondition = false

        options = $.extend({
            swipeOffset:15,
            onSwipeLeft: function () {
                that.trigger('swipe-left')
            },
            onSwipeRight: function () {
                that.trigger('swipe-right')
            },
            swipeCondition: function () {
                return true
            },
        }, options)

        $win.on('touchstart', function (e) {
                swipeCondition = options.swipeCondition(e)
                if (!swipeCondition) return

                fromX = e.originalEvent.touches[0].clientX
                fromY = e.originalEvent.touches[0].clientY
                swipeEmitted = false
            })
            .on('touchmove', function (e) {
                if (!swipeCondition) return

                toX = e.originalEvent.touches[0].clientX
                toY = e.originalEvent.touches[0].clientY
                deltaX = toX - fromX
                deltaY = toY - fromY

                if (!swipeEmitted && Math.abs(deltaX) > Math.abs(deltaY)) {
                    if (deltaX >= options.swipeOffset) {
                        swipeEmitted = true
                        options.onSwipeRight()
                    }
                    if (deltaX <= -options.swipeOffset) {
                        swipeEmitted = true
                        options.onSwipeLeft()
                    }
                    e.preventDefault()
                }

                fromX = toX
                fromY = toY
            })
    }

    $.fn.pullDown = function (options)
    {
        var that = this
        var fromX, fromY, toX, toY
        var deltaX, deltaY, delta
        var swipeCondition
        var canPull = false
        var success = false

        options = $.extend({
            barrier:100,
            onPullDown: function (e) {
            },
            onSuccess: function () {
            },
            onFail: function () {
            },
            swipeCondition: function () {
                return true
            },
        }, options)

        this.on('touchstart', function (e) {
                swipeCondition = options.swipeCondition(e)
                if (!swipeCondition) return

                canPull = that[0].scrollTop <= 0
                success = false
                fromX = e.originalEvent.touches[0].clientX
                fromY = e.originalEvent.touches[0].clientY
            })
            .on('touchmove', function (e) {
                if (!swipeCondition) return
                if (!canPull) return
                if (success) return

                toX = e.originalEvent.touches[0].clientX
                toY = e.originalEvent.touches[0].clientY
                deltaX = toX - fromX
                deltaY = toY - fromY

                if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) {
                    e.preventDefault()
                    if (deltaY < options.barrier) {
                        options.onPullDown(e, deltaY/options.barrier)
                    } else {
                        success = true
                        options.onSuccess()
                    }
                }
            })
            .on('touchend', function (e) {
                if (!swipeCondition) return
                if (!success) options.onFail()
            })
    }
})(jQuery);
