var gui = require("nw.gui");

var win = gui.Window.get();

if (process.platform === "darwin")
{
	var nativeMenuBar = new gui.Menu(
	{
		type: "menubar"
	});
	nativeMenuBar.createMacBuiltin("Hot Gifs");
	win.menu = nativeMenuBar;
}

//debug
win.showDevTools();

win.on("loaded", function() 
{
    win.capturePage( function(img) 
    {   
        var canvas = win.window.document.getElementById("color").getContext("2d");
        var image = win.window.document.getElementById("colorImage");
        
        image.src = img;
        
        canvas.drawImage(image,0,0);
        
        var pixelData = canvas.getImageData(0, 0, 1, 1).data;
        
        console.log(pixelData);
        
        
    }, "png");
});