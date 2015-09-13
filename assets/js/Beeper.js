var Beeper = function(audioContext, conf ) {

    if( !audioContext ) {
        throw new Error("No audioContext provided, required parameter");
    }

    if( !conf ) {
        conf = {};
    }

    var duration = conf.duration || 500;
    
    // Based on
    // http://stackoverflow.com/questions/879152/how-do-i-make-javascript-beep

    //duration of the tone in milliseconds. Default is 500
    //frequency of the tone in hertz. default is 440
    //volume of the tone. Default is 1, off is 0.
    //type of tone. Possible values are sine, square, sawtooth, triangle, and custom. Default is sine.
    //callback to use on end of tone
    function beep(frequency, callback) {
        var oscillator = audioContext.createOscillator();
        var gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        if ( conf.volume ){ gainNode.gain.value = conf.volume; };
        if ( conf.type ){ oscillator.type = conf.type; }

        if (frequency){oscillator.frequency.value = frequency;}
        if ( callback ) {oscillator.onended = callback; }

        console.log(frequency);
        console.log(duration);

        oscillator.start();
        setTimeout( function(){oscillator.stop()}, duration );
    };



    return {
        beep: beep        
    }   
};