// JavaScript Document
document.createScreenshot = function (type) {
	_canvas = this.createElement("canvas");
	render_html_to_canvas(this.documentElement.outerHTML,_canvas,0,0,window.innerWidth,window.innerHeight)
	_image = new Image();
	_image.src = _canvas.toDataURL(type);
	_image.alt = "Screenshot from HTMLDocument " + document.title;
	return _image
}
function render_html_to_canvas(html, ctx, x, y, width, height) {
    var data = "data:image/svg+xml,"+ btoa('<svg xmlns="http://www.w3.org/2000/svg" width="'+width+'" height="'+height+'">' + '<foreignObject width="100%" height="100%">' + html_to_xml(html) + '</foreignObject>' + '</svg>');

    var img = new Image();
    img.onload = function () {
        ctx.drawImage(img, x, y);
    }
    img.src = data;
}

function html_to_xml(html) {
    var doc = document.implementation.createHTMLDocument('');
    doc.write(html);

    // You must manually set the xmlns if you intend to immediately serialize     
    // the HTML document to a string as opposed to appending it to a
    // <foreignObject> in the DOM
    doc.documentElement.setAttribute('xmlns', doc.documentElement.namespaceURI);

    // Get well-formed markup
    html = (new XMLSerializer).serializeToString(doc.body);
    return html;
}
