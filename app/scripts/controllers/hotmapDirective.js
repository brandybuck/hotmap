/**
 * Created by prianant on 23/06/14.
 */
app.directive('hotmap', function ($parse) {

        var directiveDefinitionObject = {
            //We restrict its use to an element
            //as usually  <hotmap> is semantically
            //more understandable
            restrict: 'E',
            //this is important,
            //we don't want to overwrite our directive declaration
            //in the HTML mark-up
            replace: false,
            //our data source would be an array
            //passed thru map-data attribute
            scope: {data: '=mapData'},
            link: function (scope, element, attrs) {

                //Make an SVG Container
                var svgContainer = d3.select("body").append("svg")
                    .attr("width", 1000)
                    .attr("height", 1000);


                var tooltip = d3.tip()
                    .attr("class", "d3-tip")
                    .offset([0,5])
                    .direction("se")
                    .html(function(d){
                        return "<div class=\"tipText\">Not Started</div>";
                    });

                //Draw the Rectangle

                var number = 50;
                var offset = 10 - (number % 10);
                var newNr = number + offset;
                console.log(newNr);
                var columns = 50;
                var rows = newNr/5;
                console.log(rows);
                var yaxis = 10;
                var yaxisoffset = 12;

                for(var j=0;j<rows;j++){
                    var xaxis = 10;
                    var xaxisoffset = 12;
                    for(var i=0;i<50;i++) {
                        var rectangle = svgContainer.append("rect")
                            .attr("x", xaxis)
                            .attr("y", yaxis)
                            .attr("width", 10)
                            .attr("height", 10)
                            .style("fill","#F0F0F0");
                        xaxis += xaxisoffset;
                    }
                    yaxis += yaxisoffset;
                }

                var s1 = d3.selectAll("rect").call(tooltip);
                d3.select(s1[0][1]).style("fill","orange");
                d3.select(s1[0][1]).on('mouseover', tooltip.show);
                d3.select(s1[0][1]).on('mouseout', tooltip.hide);
                tooltip.html(function(d){
                    return "<div class=\"tipText\">Not yet started</div>";
                });

                d3.select(s1[0][1]).on('mouseover', tooltip.show);

            }
        };
        return directiveDefinitionObject;
    });