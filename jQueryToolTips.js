// jQuery ToolTips
// Version: 1.0.0, Last updated: 2/23/2011
//
// GitHub       - https://github.com/thinkdevcode/jQuery-ToolTip
// Contact      - gin4lyfe@gmail.com (Eugene Alfonso)
// 
// See License.txt for full license
// 
// Copyright (c) 2011 Eugene Alfonso,
// Licensed under the MIT license.

(function ($) {

    /*
    *   tooltip() - Applies custom tooltip to jQuery objects using either 'title' attribute or
    *               a custom text provided in parameter.
    *
    *       options [object] [optional]
    *           A map of settings... { container(string or object), text, width, 
									   height, follow, offset { top, left } 
									 }
	*
    */
    $.fn.tooltip = function (options) {

        //this is our html markup for tooltip
        var markup = '<div id="ttContainerDiv" class="ui-corner-all ui-widget-content ui-widget" style="padding:1em;display:none;position:fixed"></div>';

        var defaults = {
			container: undefined,
            text: undefined,
            width: undefined,
            height: undefined,
            follow: undefined,
            offset: { top: 10, left: 15 }
        };
		
		$.extend(defaults, options); //apply any settings the user may have
		
		if (typeof defaults.container === 'string') {
			$(markup).appendTo(defaults.container);
		}
		else if (typeof defaults.container === 'object') {
			defaults.container.append(markup);
		}
		else {
			$(markup).appendTo('body');
		}
		
		var cont = $('#ttContainerDiv'); //quick access to our containter div
		
        //loop through our jquery objects
        this.each(function () {

            var tooltiptext = $(this).attr('title'); //grab the title for future use

            //make sure we have some text to add (what would be a tooltip without text!)
            if (tooltiptext || defaults.text) {
                $(this).hover(
                    function (e) { //mouseenter

                        $(this).attr('title', ''); //remove the title so original alt doesnt show
                        cont.css({ 'width': '', 'height': '' }); //reset the height and width
                        cont.text(((defaults.text) ? defaults.text : tooltiptext));

                        //only change sizes if container is larger than it should be (this is why we reset the height and width)
                        if (defaults.width) { if (cont.width() > defaults.width) { cont.width(defaults.width); } }
                        if (defaults.height) { if (cont.height() > defaults.height) { cont.height(defaults.height); } }

                        if (defaults.follow) {
                            $(this).mousemove(function (e) {
                                cont.css({ 'top': e.clientY + defaults.offset.top, 'left': e.clientX + defaults.offset.left });
                            });
                        }
                        else {
                            cont.css({ 'top': e.clientY + defaults.offset.top, 'left': e.clientX + defaults.offset.left });
                        }
                        cont.show();
                    },
                    function (e) { //mouseexit

                        if (defaults.follow) { $(this).unbind('mousemove'); }
                        cont.hide();
                        cont.text(''); //reset text
                        $(this).attr('title', tooltiptext); //return title to what it was before
                    }
                );
            }
        });
    };
})(jQuery);