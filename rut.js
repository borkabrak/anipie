// Raphael UTilities
//
// Utility toolbox using (and assuming) Raphael

Rut = function(paper){
    'use strict';
    var me = this;

    // Raphael paper object
    me.paper = paper;


    // Draw a line
    //  'from' and 'to' describe points, and should be objects with 'x' and 'y'
    //  properties.
    me.line = function line(from, to, attributes) {

        attributes = attributes || {};
        attributes.stroke = attributes.stroke || "#000";
        attributes['stroke-width'] = attributes['stroke-width'] || "2px";
        var patharr = ["M", from.x, from.y, "L", to.x, to.y];
        return me.paper.path(patharr).attr(attributes);
    };

    // Draw a mark at the point (just to indicate where it is)  Optional text
    // label and color
    me.mark = function(point, label, color) {
        var size = 5; 
        label = label || "";
        color = color || "#833";

        var attributes = {
            stroke: color,
            "stroke-width": "1px"
        };

        return me.paper.set(
            me.line({x: point.x - size, y: point.y }, {x: point.x + size, y: point.y}).attr(attributes),
            me.line({x: point.x, y: point.y - size }, {x: point.x, y: point.y + size}).attr(attributes),
            me.paper.text(point.x - size - 5, point.y, label).attr(attributes)
        );
    };
};

Raphael.fn.showRuler = function(interval){
    var paper = this;
    var elements = paper.set();
    var width = 15;
    var interval = interval || 100;
    console.log("paper:%o", paper);
  
    // vertical
    for(var i = 0; i < paper.height; i += interval){
            var tick_mark = paper.path([
                ["M", 0, i],
                ["l", width, 0],
            ]).attr({ "stroke-width": "2px" });

            var label = paper.text( 0, i - tick_mark.attr("font-size") / 2, i.toString() ).attr({"text-anchor": "start"});

            elements.push(tick_mark, label);
    };

    //horizontal
    for(var i = 0; i < paper.width; i += interval){
            var tick_mark = paper.path([
                ["M", i, 0],
                ["l", 0, width],
            ]).attr({ "stroke-width": "2px" });

            var label = paper.text( i - tick_mark.attr("font-size") / 2, width, i.toString() ).attr({"text-anchor": "end"});

            elements.push(tick_mark, label);
    };

    return elements;

};
