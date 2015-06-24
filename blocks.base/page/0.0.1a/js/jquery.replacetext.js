/*!
 * jQuery replaceText - v1.1 - 11/21/2009
 * http://benalman.com/projects/jquery-replacetext-plugin/
 *
 * Copyright (c) 2009 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function ($) {

    $.fn.replaceText = function (search, replace, text_only)
    {
        return this.each(function ()
        {
            var node = this.firstChild,
                val,
                new_val,
                remove = []

            if (node) do
            {
                if (node.nodeType === 3) // Only text nodes
                {
                    val = node.nodeValue.replace(/</g, '&lt;')
                    new_val = val.replace(search, replace)

                    if (new_val !== val)
                    {
                        if (!text_only && /</.test(new_val))
                        {
                            $(node).before(new_val)
                            remove.push(node)
                        } else {
                            node.nodeValue = new_val
                        }
                    }
                }

            } while (node = node.nextSibling)

            remove.length && $(remove).remove()
        })
    }

})(jQuery);
