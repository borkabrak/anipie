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
    me.data = data;
    me.sectors = me.set();
    me.base = me.circle(200, 200, 100); 
    me.total_value = Object.keys(me.data).map(function(e){ return me.data[e]}).reduce(function(x,y){ return x +y });

    me.customAttributes.sector = function(startAngle, endAngle){
        // Give angle in degrees
        
        var r = me.base.attrs.r,
            cx = me.base.attrs.cx,
            cy = me.base.attrs.cy,
            flag = (endAngle - startAngle) > 180,
            color = (endAngle - startAngle) / 360;

        // convert to radians
        startAngle = (startAngle % 360) * (Math.PI / 180);
        endAngle = (endAngle % 360) * (Math.PI / 180);
        
        return {   
            path:[ 
                ["M", cx, cy],
                ["l", r * Math.cos(startAngle), r * Math.sin(startAngle) ],
                ["A", r, r, 0, +flag, 1, cx + r * Math.cos(endAngle), cy + r * Math.sin(endAngle)],
                ["z"]
            ],
            fill: "hsb(" + color + ", .75, .8)",
            stroke: "white",
            "stroke-width": "2px"
        };
    };

    // Draw sectors
    me.draw = function(){
        var startAngle = 0;
        me.sectors.remove();
        Object.keys(me.data).forEach(function(label){
            var value = me.data[label];
            var endAngle = startAngle + (360 / me.total_value * value);

            me.sectors.push(me.path().attr({sector: [startAngle, endAngle]}));

            startAngle = startAngle + endAngle;
        });
    };

    // Add sector
    me.add_sector = function(label, value){
        log("add_sector(\"" + label + "\" ," + value + ")");
        me.data[label] = value;
        me.draw();
    };

    me.draw();
    return me;
};

var log = function(text){
    // log output
    console.log("log('%s')", text);
    document.getElementById("log").innerHTML += text + "<br>";
};

