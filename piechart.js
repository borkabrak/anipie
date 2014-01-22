var log = function(text){
    // log output
    console.log("log: %s", text);
    document.getElementById("log").innerHTML += text + "<br>";
};

Raphael.fn.pieChart = function(data){

    // Create a piechart.
    //
    // data = {
    //      label: value,
    //      . . .
    //      }
    
    'use strict';
    var me = this;
    var total_value = Object.keys(data).map(function(e){ return data[e]}).reduce(function(x,y){ return x +y });

    me.elements = me.set();
    me.base = me.circle(200, 200, 100); 

    me.customAttributes.sector = function(angle1, angle2){
        // Give angle in degrees
        
        var r = me.base.attrs.r,
            cx = me.base.attrs.cx,
            cy = me.base.attrs.cy,
            flag = (angle2 - angle1) > 180,
            color = Math.random(); 

        // convert to radians
        angle1 = (angle1 % 360) * (Math.PI / 180);
        angle2 = (angle2 % 360) * (Math.PI / 180);
        
        return {   
            path:[ 
                ["M", cx, cy],
                ["l", r * Math.cos(angle1), r * Math.sin(angle1) ],
                ["A", r, r, 0, +flag, 1, cx + r * Math.cos(angle2), cy + r * Math.sin(angle2)],
                ["z"]
            ],
            fill: "hsb(" + color + ", .75, .8)"
        };
    };

    // Draw sectors
    var angle1 = 0;
    Object.keys(data).forEach(function(label){
        var value = data[label];

        var angle2 = angle1 + (360 / total_value * value);
        log( "angle1: " + angle1 + " angle2: " + angle2 );

        me.elements.push(me.path().attr({sector: [angle1, angle2]}));
        angle1 = angle1 + angle2;
    });

    return me;
};
