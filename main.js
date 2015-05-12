var gui = require("nw.gui");
var tld = require("tldjs");

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
//win.showDevTools();

win.on("document-end", function(frame) 
{

    if (frame && frame.hasOwnProperty("id"))
    {
        if (frame.id === "view")
        {
            setTimeout(function()
            {
                getBarColor();
            },100);
            
        }
    }
});

function getBarColor()
{
    win.capturePage( function(img) 
    {   
        var canvas = win.window.document.getElementById("color").getContext("2d");
        var image = win.window.document.getElementById("colorImage");
        
        image.src = img;
        
        canvas.drawImage(image,0,0);
        
        var pixelData = canvas.getImageData(5, 32, 1, 1).data;
        
        win.window.document.getElementById("bar").style.backgroundColor = 'rgb(' + [pixelData[0],pixelData[1],pixelData[2]].join(',') + ')';
        var inv = idealTextColor({R: pixelData[0], G: pixelData[1], B: pixelData[2]});
        
        
        
        
        win.window.document.getElementById("title").style.color = inv;
        
    
        
    }, "png");
}

function idealTextColor(bgColor) 
{

   var nThreshold = 105;
   var components = bgColor;
   var bgDelta = (components.R * 0.299) + (components.G * 0.587) + (components.B * 0.114);

   return ((255 - bgDelta) < nThreshold) ? "#000000" : "#ffffff";   
}