Raphael.fn.pieChart = function(x, y, radius, data){

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
    me.cx = x || 200;
    me.cy = y || 200;
    me.radius = radius || 100; 
    me.data = data || {};
    me.wedges = me.set();

    me.labels = function(){
        return Object.keys(me.data);
    };

    me.values = function(){
        return me.labels().map(function(label){ return me.data[label] });
    };

    // Define a pie chart wedge
    me.customAttributes.wedge = function(startAngle, endAngle){
        // convert angles from degrees to radians
        var large_arc_flag = (endAngle - startAngle) > 180;
        var sweep_flag = 1;
        var color = (endAngle - startAngle) / 360;
        startAngle = (startAngle % 360) * (Math.PI / 180);
        endAngle = (endAngle % 360) * (Math.PI / 180);
      
        var arc = [
            "A",
            me.radius,
            me.radius,
            0,
            +large_arc_flag,
            sweep_flag,
            me.cx + me.radius * Math.cos(endAngle),
            me.cy + me.radius * Math.sin(endAngle) 
        ];

        return {   
            path:[ 
                ["M", me.cx, me.cy],
                ["l", me.radius * Math.cos(startAngle), me.radius * Math.sin(startAngle) ],
                arc,
                ["z"]
            ],
            fill: "hsl(" + color + ", 0.8, 0.8)",
        };
    };

    // Return total value of all data
    me.total = function(){
        return me.values().reduce(function(x,y){ return x + y });
    };

    // Add sectors
    me.initialize = function(){
        var startAngle = 0;
        me.labels().forEach(function(label){
            log(label);
            var value = data[label];
            var angle = value / me.total() * 360;
            var endAngle = startAngle + angle;
            log("Wedge '" + label + ":" + value + "' from " + startAngle + "° to " + endAngle + "°");
            var wedge = me.path().attr({wedge: [startAngle, startAngle + angle]});
            me.wedges.push(wedge);
            startAngle = endAngle;
        });
    };

    me.initialize();
    return me;
};

