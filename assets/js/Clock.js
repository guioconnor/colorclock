var Clock = function() {

    var getFormattedDate = function(date) {
        return {
            hours:   ( "00" + date.getHours()   ).slice(-2),
            minutes: ( "00" + date.getMinutes() ).slice(-2),
            seconds: ( "00" + date.getSeconds() ).slice(-2),
        }
    }   

    return {
        getFormattedDate: getFormattedDate
    }   
};