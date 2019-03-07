var csv=function()
{
var datacsv=d3.csv("n2016.csv");
datacsv.then(function(data)
{
  console.log("Did work");
  console.log("data",data);
  drawChart(data);
},
function(err)
{
  console.log("Didn't work");
  console.log(err);
})
document.getElementById("button2").disabled = true;
};

var drawChart=function(n2016)
{
  var width=400;
  var height=300;
  var barWidth=width/n2016.length;
  var svg=d3.select("body").append("svg")
            .attr("width",width)
            .attr("height",height)
            .style("margin-right",40)
            .style("background-color","#F7F7F6");

  svg.selectAll("rect")
     .data(n2016)
     .enter()
     .append("rect")
     .attr("x",function(d,i){
       return i*barWidth+2;
     })
     .attr("y",function(d,i){
       //return height-d.num;
       return height-d.Happiness*20;
     })
     .attr("width",barWidth-4)
     .attr("height",function(d){
       return d.Happiness*20;
     })
     .attr("fill",function(d){
       return "red";
     })
     .style("padding",2);

  svg.selectAll("text")
     .data(n2016)
     .enter()
     .append("text")
     .text(function(d){
       return d.Happiness;
     })
     .attr("x",function(d,i){
       return i*barWidth+barWidth/2-4;
     })
     .attr("y",function(d,i){
       return height-d.Happiness*20+15;
     })
     .attr("fill","white")
     .attr("font-size", 14)
     .attr("font-family", "sans-serif");

     legend=svg.append("g")
                  .attr("x",width-65)
                  .attr("y",25)
                  .attr("height", 100)
                  .attr("width", 100);
     legend.selectAll("rect")
           .data(n2016)
           .enter()
           .append("rect")
           .attr("x",width-100)
           .attr("y",function(d,i){
             return i*(100/7)+30;
           })
           .attr("height",10)
           .attr("width",10)
           .attr("fill",function(d){
             return "blue";
           });
     legend.selectAll("text")
        .data(n2016)
        .enter()
        .append("text")
        .text(function(d){
          return d.Country;
        })
        .attr("x",function(d,i){
          return width-85;
        })
        .attr("y",function(d,i){
          return i*(100/7)+40;
        })
        .attr("fill","black")
        .attr("font-size", 14)
        .attr("font-family", "sans-serif");
}
