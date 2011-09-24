// ==UserScript==
// @name           Showing dropbox images
// @namespace      http://yperevoznikov.com
// @include        https://github.com/*/issues*
// ==/UserScript==

$ = unsafeWindow.jQuery;

$('a[href$=".jpg"], a[href$=".jpeg"], a[href$=".gif"], a[href$=".png"]').each(function() {
	var $link = $(this);
	var $img = $('<img />');
	var $aLink = $('<a />');

	$img
		.css('max-width', '706px')
		.css('max-height', '1800px')
		.attr('src', $link.attr('href'));

	$aLink
		.attr('href', 'javascript: void(0)')
		.click(function($link){return function(e){
			$bigImg = $('<img />');
			$bigImg.attr('src', $img.attr('src'));
			var offset = $link.offset();
			$('body *:first').before(
				$('<div>')
					.css({
						zIndex: '1000', 
						position: 'absolute', 
						border: '2px solid #E6E6E6', 
						left: offset.left, 
						top: offset.top, 
						padding: '3px', 
						background: '#FFF'
					})
					.append($bigImg)
					.click(function(e){
						$(this).remove();
					})
			);
		}}($link))
		.css({'textDecoration': 'none'})
		.append($img)
		.append('<br />')
		.append(
			$('<span />')
				.css({color: '#CCC', fontSize: '10px'})
				.html('Click to zoom in.')
		);

	$link
		.after('<br />')
		.after('<br />')
		.after($aLink)
		.after('<br />')
		.after('<br />');
});