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
    me.sectors = [];

    // -- METHODS -------------------------------------------------
    me.labels = function(){
        return me.sectors.map(function(sector){ return sector.label });
    };

    me.values = function(){
        return me.sectors.map(function(sector){ return sector.value });
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
    me.initialize = function(data){
        var startAngle = 0;
        var total = 0;
        Object.keys(data).forEach(function(key){
            total += data[key];
        });

        Object.keys(data).forEach(function(label){
            var value = data[label];
            var angle = value / total * 360;
            me.sectors.push({
                label: label,
                value: value,
                wedge: me.path().attr({wedge: [startAngle, startAngle + angle]})
            });

            startAngle += angle;

        });
    };

    me.initialize(data);

    return me;


};

