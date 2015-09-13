var Dom = function( conf ) {
    var gradient      = conf.gradient;
    var mainContainer = conf.mainContainer;
    var time          = conf.time;
    var colorDisplay  = conf.color;
    var colorMap      = conf.colorMap;

    var setGradient = function( start, end ) {
        gradient.css({                
            "background": "-moz-linear-gradient(left,  "+ start +" 0%,  "+ end +"  100%)", /* FF3.6+ */
            "background": "-webkit-gradient(linear, left top, right top, color-stop(0%,"+ start +"), color-stop(100%, "+ end +" ))", /* Chrome,Safari4+ */
            "background": "-webkit-linear-gradient(left,  "+ start +" 0%, "+ end +"  100%)", /* Chrome10+,Safari5.1+ */
            "background": "-o-linear-gradient(left,  "+ start +" 0%, "+ end +"  100%)", /* Opera 11.10+ */
            "background": "-ms-linear-gradient(left,  "+ start +" 0%, "+ end +"  100%)", /* IE10+ */
            "background": "linear-gradient(to right,  "+ start +" 0%, "+ end +"  100%)" /* W3C */
        });
    }

    var setBackgroundColor = function( color ) {
        mainContainer.css("background-color", color);
    }

    var setTime = function(formattedTime) {
        time.text( formattedTime )
    }

    var setColor = function( color ) {
        colorDisplay.text( color.hex );
        colorMap.find(".colorMapR").css("background-color", "#"+ color.red +"0000").text( color.red   );
        colorMap.find(".colorMapG").css("background-color", "#00"+ color.green +"00").text( color.green );
        colorMap.find(".colorMapB").css("background-color", "#0000"+ color.blue +"").text( color.blue  );
    }

    return {
        setGradient: setGradient,
        setBackgroundColor: setBackgroundColor,
        setTime: setTime,
        setColor: setColor
    }   
};