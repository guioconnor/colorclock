var audioContext = new (window.AudioContext || window.webkitAudioContext || window.audioContext);

var beeper          = new Beeper(audioContext, {duration: 100});
var clock           = new Clock();
var colorCalculator = new ColorCalculator();
var dom             = new Dom({
    gradient: $("#gradient"),
    mainContainer: $("body"),
    time: $("#time"),
    color: $("#color"),
    colorMap: $("#colorMap")
});

var audio = false;
var resolution = 1000;// Unit: s/1000

setInterval(function(){
    var date          = new Date();
    var color         = colorCalculator.calculate( date.getTime() );
    var formattedTime = clock.getFormattedDate( date );

    dom.setBackgroundColor( color.hex );
    dom.setTime(  formattedTime.hours + ":" + formattedTime.minutes + ":" + formattedTime.seconds );
    dom.setColor( color );

    if(audio){
        beeper.beep( 10 * (date.getTime()/1000)%6000 + 200 );
    }

    gradient = colorCalculator.getColorRange( date.getTime() );

    dom.setGradient( gradient.lower , gradient.upper  )

}, resolution)

$(document).ready(function(){
    $('#time').on('click', function(){
        audio = !audio;
    }); 
});
