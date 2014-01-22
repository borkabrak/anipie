Raphael.fn.pieChart = function(data){

    // Create a piechart.
    //
    // USAGE:
    // pieChart({
    //      label1: value1,
    //      label2: value2,
    //      . . .
    //      });
    
    'use strict';

    var me = this;
    me.data = data || {};
    me.sectors = me.set();
    me.cx = 200;
    me.cy = 200;
    me.radius = 100; 
    me.total_value = function(){
        var values = Object.keys(me.data).map(function(x){ return me.data[x] });
        var total = values.reduce(function(x,y){ return +x + +y });
        log("Total: " + total);
        return total;
    };

    me.customAttributes.sector = function(startAngle, endAngle){
        // convert angles from degrees to radians
        startAngle = (startAngle % 360) * (Math.PI / 180);
        endAngle = (endAngle % 360) * (Math.PI / 180);
        var flag = (endAngle - startAngle) > 180;
        
        return {   
            path:[ 
                ["M", me.cx, me.cy],
                ["l", me.radius * Math.cos(startAngle), me.radius * Math.sin(startAngle) ],
                ["A", me.radius, me.radius, 0, +flag, 1, me.cx + me.radius * Math.cos(endAngle), me.cy + me.radius * Math.sin(endAngle)],
                ["z"]
            ],
            fill: "red"
        };
    };

    me.add_sector = function(label, value){
        log("add_sector(\"" + label + "\" ," + value + ")");
        me.data[label] = value;

        // Iterate over sectors, recalculating each one's angles and animating to them.
        // Then add the new sector.
        var startAngle = 0, endAngle = 0;
        me.sectors.forEach(function(sector){
            endAngle = startAngle + (360 / +me.total_value() * +value);
            log("sector from " + startAngle + " to " + endAngle);
            sector.animate({sector: [startAngle, endAngle]}, 1000, "linear");
            startAngle = endAngle;
        });

        endAngle = startAngle + (360 / me.total_value() * value);
        me.sectors.push(
            me.path().attr({sector: [startAngle, endAngle]})
        );

    };

    return me;
};

var log = function(text){
    // log output
    console.log("log('%s')", text);
    document.getElementById("log").innerHTML += text + "<br>";
};

