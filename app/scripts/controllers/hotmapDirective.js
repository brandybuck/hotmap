/**
 * Created by prianant on 23/06/14.
 */
app.directive('hotmap', function ($parse,$interval) {

        var directiveDefinitionObject = {
            //We restrict its use to an element
            //as usually  <hotmap> is semantically
            //more understandable
            //We restrict its use to an attribute
            //as it is compliant across most browsers
            restrict: 'EA',
            //this is important,
            //we don't want to overwrite our directive declaration
            //in the HTML mark-up
            replace: false,
            //our data source would be an array
            //passed thru map-data attribute
            scope: {
                artifacts : '=',
                rows : '=',
                columns : '=',
                refreshURL: '@'
            },
            link: function (scope, element, attrs) {

                //Make an SVG Container
                var svgContainer = d3.select("body").append("svg")
                    .style("padding-left","25px")
                    .style("padding-top","25px")
                    .attr("width", "100%")
                    .attr("height", "100%");

                var tooltip = d3.tip()
                    .attr("class", "d3-tip")
                    .offset([0,5])
                    .direction("se")
                    .html(function(d){
                        return "<div class=\"tipText\">Not Started</div>";
                    });

                var inProgressTooltip = d3.tip()
                    .attr("class", "d3-tip")
                    .offset([0,5])
                    .direction("se")
                    .html(function(d){
                        return "<div class=\"tipText\">In progress</div>";
                    });

                var completedTooltip = d3.tip()
                    .attr("class", "d3-tip")
                    .offset([0,5])
                    .direction("se")
                    .html(function(d){
                        return "<div class=\"tipText\">Completed</div>";
                    });

                //Draw the Rectangle
                var number = scope.artifacts;
                var offset = 10 - (number % 10);
                if(offset == 10) {
                    offset = 0;
                }
                var newNr = number + offset;
                console.log(newNr);
                var columns = newNr/5;
                var rows = 5;
                console.log(columns);
                console.log(rows);
                var yaxis = 10;
                var yaxisoffset = 20; 

                for(var j=0;j<rows;j++){
                    var xaxis = 10;
                    var xaxisoffset = 20;
                    for(var i=0;i<columns;i++) {
                        var rectangle = svgContainer.append("rect")
                            .attr("x", xaxis)
                            .attr("y", yaxis)
                            .attr("width", 10) 
                            .attr("height", 10)
                            .style("fill","#F0F0F0");
                        rectangle.on("mouseover",tooltip.show);
                        rectangle.on("mouseout",tooltip.hide);
                        xaxis += xaxisoffset;
                    }
                    yaxis += yaxisoffset;
                }
                var s1 = d3.selectAll("rect").call(tooltip);

                /**s1.call(inProgressTooltip);
                s1.call(completedTooltip);
                d3.select(s1[0][1]).style("fill","#00B200");
                d3.select(s1[0][1]).on("mouseover",inProgressTooltip.show);
                d3.select(s1[0][1]).on("mouseout",inProgressTooltip.hide);

                d3.select(s1[0][2]).style("fill","#00B200");
                d3.select(s1[0][2]).on("mouseover",completedTooltip.show);
                d3.select(s1[0][2]).on("mouseout",completedTooltip.hide);

	            d3.select(s1[0][5]).style("fill","#00B200");
                d3.select(s1[0][5]).on("mouseover",completedTooltip.show);
                d3.select(s1[0][5]).on("mouseout",completedTooltip.hide); */

                stop = $interval(function() {
                    var filler = Math.floor(Math.random() * scope.artifacts) + 1;
                    d3.select(s1[0][filler]).style("fill","#00B200");
                },500);

        },
        controller: ['$scope',function($scope){

            $scope.stopRefresh = function() {
                if (angular.isDefined(stop)) {
                    $interval.cancel(stop);
                    stop = undefined;
                }
            };
        }]
     }
     return directiveDefinitionObject;

    });
