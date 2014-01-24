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

    // Define a pie chart wedge
    me.customAttributes.wedge = function(startAngle, endAngle){
        var large_arc_flag = (endAngle - startAngle) > 180;
        var sweep_flag = 1;
        var color = (endAngle - startAngle) / 360;

        // convert angles from degrees to radians
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
            fill: "90-" + Raphael.hsb(color,0.3,0.8) + "-" + Raphael.hsb(color,1,0.8),
            stroke: "white",
            "stroke-width": "2px"
        };
    };

    me.total = function(){
        var total = 0;
        me.sectors.forEach(function(sector){
            total += +sector.value;
        });
        return total;
    };

    me.add_sector = function(label, value) {

        // Add a new sector of zero angle (make the new sector the first one,
        // or the animation looks weird)
        me.sectors.unshift({
            label: label,
            value: value,
            wedge: me.path().attr({wedge: [0, 0]})
        });

        // recalculate all sector angles and animate them to their new positions
        var startAngle = 0;
        var total = me.total();
        me.sectors.forEach(function(sector){
            var endAngle = startAngle + (sector.value / total * 360);
            sector.wedge.animate({wedge: [startAngle, endAngle]}, 500, "ease-in-out");
            startAngle = endAngle;
        });

    };

    // Initialize
    Object.keys(data).forEach(function(label){
        me.add_sector(label, data[label]);
    });

    return me;

};

