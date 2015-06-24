jBlock

.match('page', function ()
{
    if (this.param('title'))
        window.document.title = this.param('title')

    if (this.param('lang'))
        jBlock.import.lang = this.param('lang')

    var qpLocale = jBlock.import.queryParam('locale')
    if (qpLocale)
        jBlock.import.lang = qpLocale

    this.tag('body')
        .js()
        .mix(jBlock.import.platform, jBlock.import.lang)
        .defMod({
            bg: '',
            ex: 'false',
            'has-footer': this.has('b_footer')
        })
        .css({
            'background-image': this.param('background')
        })
})

.onLoad(function ()
{
    var body = document.getElementsByTagName('body')[0],
        bodyClass = body.className.split(' ')

    if (bodyClass.indexOf('page') < 0)
        body.className += (body.className ? ' ' : '') + 'page desktop ru'

    if (!/webkit/i.test(navigator.userAgent))
        document.write(
             '<style>body {color:#FFF; background:#000; padding:100px; text-align:center; font-family:sans-serif; font-size:30px}'
            +'</style>Webkit exclusive'
        )

    var favicon = 'url(i/favicon.png)'.substr(4)
    favicon = favicon.substr(0,favicon.length-1)

    $('head').append('<link rel="icon" href="'+ favicon +'"/>')
})
