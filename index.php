<!DOCTYPE html>
<html>
<head>
    <title>Colour clock</title>
    <script src="jquery-1.10.2.js"></script>
    <script>

        var resolution = <?php echo $_GET["res"] && $_GET["res"] < 1000 ? $_GET["res"] :  1000; ?>; // Unit: 1/s
        

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

            gradient = getColorRange( date.getTime() );

            // setGradient( $("#gradient") , gradient.lower , gradient.upper  )

        }, resolution)

    </script>

    <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:200' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Lato:100' rel='stylesheet' type='text/css'>
    <style type="text/css" media="screen">
        body {
            font-family: 'Lato', 'Source Sans Pro', sans-serif;
            color: #fff;
            text-align: center;
        }

        article {
            position: absolute;
            margin-left: -220px;
            width: 440px;
            left: 50%;            
            top: 50%;
            margin-top: -120px;
        }

        .colorComponent {
            float: left;
            margin-right: 0.5%;
            width: 33%;
            height: 34px;
            font-size: 18px;
            line-height: 34px;
            border-radius: 5px;
        }

        .colorComponent:last-child {
            margin-right: 0;
        }

        .box {
            border-radius: 5px;
            background: rgba(0,0,0,.05);
            margin-bottom: 5px;
        }

        #time {
            height: 120px;
            line-height: 120px;
            font-size: 100px;
        }

        #color {
            font-size: 18px;
            line-height: 34px;
        }

        #gradient {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 25px;
        }
    </style>
</head>
<body>
<article>
    <div id="time" class="box"></div>
    <div id="color" class="box"></div>
    <div id="colorMap">
        <div id="colorMapR" class="colorComponent"></div>
        <div id="colorMapG" class="colorComponent"></div>
        <div id="colorMapB" class="colorComponent"></div>
    </div>
    <div id="gradient"></div>
</article>


</body>
</html>
