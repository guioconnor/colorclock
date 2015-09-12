var audio = false;

// Audio
// http://stackoverflow.com/questions/879152/how-do-i-make-javascript-beep
var audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext);

//All arguments are optional:

//duration of the tone in milliseconds. Default is 500
//frequency of the tone in hertz. default is 440
//volume of the tone. Default is 1, off is 0.
//type of tone. Possible values are sine, square, sawtooth, triangle, and custom. Default is sine.
//callback to use on end of tone
function beep(duration, frequency, volume, type, callback) {
    var oscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (volume){gainNode.gain.value = volume;};
    if (frequency){oscillator.frequency.value = frequency;}
    if (type){oscillator.type = type;}
    if (callback){oscillator.onended = callback;}

    oscillator.start();
    setTimeout(function(){oscillator.stop()}, (duration ? duration : 500));
};


var resolution = 1000;// Unit: 1/s


var getFormattedDate = function(date) {
    return {
        hours:   ( "00" + date.getHours()   ).slice(-2),
        minutes: ( "00" + date.getMinutes() ).slice(-2),
        seconds: ( "00" + date.getSeconds() ).slice(-2),
    }
}   

var getColor = function(date) {
    date = Math.floor( date / resolution );
    date = date.toString(16);
    var colour = "#" + date.substring(date.length - 6, date.length)

    return colour;
}

var getColorRange = function(date) {
    var lower,
        upper;

    date = Math.floor( date / resolution );
    lower  = (date - 40).toString(16);
    upper  = (date + 40).toString(16);

    return {
        lower: "#" + lower.substring(lower.length - 6, lower.length),
        upper: "#" + upper.substring(upper.length - 6, upper.length)
    }
}

var setGradient = function(element, start, end) {
    element.css({                
        "background": "-moz-linear-gradient(left,  "+ start +" 0%,  "+ end +"  100%)", /* FF3.6+ */
        "background": "-webkit-gradient(linear, left top, right top, color-stop(0%,"+ start +"), color-stop(100%, "+ end +" ))", /* Chrome,Safari4+ */
        "background": "-webkit-linear-gradient(left,  "+ start +" 0%, "+ end +"  100%)", /* Chrome10+,Safari5.1+ */
        "background": "-o-linear-gradient(left,  "+ start +" 0%, "+ end +"  100%)", /* Opera 11.10+ */
        "background": "-ms-linear-gradient(left,  "+ start +" 0%, "+ end +"  100%)", /* IE10+ */
        "background": "linear-gradient(to right,  "+ start +" 0%, "+ end +"  100%)" /* W3C */
    });
}

setInterval(function(){
    var date          = new Date();
    var color         = getColor( date.getTime() );
    var formattedTime = getFormattedDate( date );
    var colorR = color.substring(1,3);
    var colorG = color.substring(3,5);
    var colorB = color.substring(5,7);

    $("body").css("background-color", color);
    $("#time").text( formattedTime.hours + ":" + formattedTime.minutes + ":" + formattedTime.seconds);
    $("#color").text( color );
    $("#colorMapR").css("background-color", "#"+ colorR +"0000").text( colorR );
    $("#colorMapG").css("background-color", "#00"+ colorG +"00").text( colorG );
    $("#colorMapB").css("background-color", "#0000"+ colorB +"").text( colorB );

    if(audio){
        // beep(100, 20 * Math.pow(2, date.getTime()%7+3));            
        beep(100, 10 * (date.getTime()/1000)%6000 + 200);            
    }

    gradient = getColorRange( date.getTime() );

    // setGradient( $("#gradient") , gradient.lower , gradient.upper  )

}, resolution)

$(document).ready(function(){
    $('#time').on('click', function(){
        audio = !audio;
    }); 
});
