var ColorCalculator = function() {

    var calculate = function(date) {
        date = Math.floor( date / resolution );
        date = date.toString(16);
        var hex = "#" + date.substring(date.length - 6, date.length)

        var color = {
            hex: hex,
            red: hex.substring(1,3),
            green: hex.substring(3,5),
            blue: hex.substring(5,7)
        };

        return color;
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

    return {
        calculate: calculate,
        getColorRange: getColorRange
    }   
};