
const margin ={
    left: 100, 
    right: 10,
    top: 10, 
    bottom: 100
};
var width = 600 - (margin.left+margin.right);
var height = 400 - (margin.top + margin.bottom);

var svg = d3.select("body")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom);

var g = svg.append("g")
        .attr("x", width/2)
        .attr("y", height+140)
        .attr("tranform", "translate("+margin.left+", "+ +margin.top+ +")");

d3.csv("./towers.csv").then(function(data){
    console.log(data)
    data.forEach((d,i)=>{
        d.height=+d.height
        
    });
    

    var y = d3.scaleLinear()
                .domain([0, 828])
                .range([height, 0]);
                
                
                console.log(y(400));

                
    var x = d3.scaleBand()
               .domain(data.map( d=>d.tower))
               .range([0,width])
               .paddingInner(0.9)
               .paddingOuter(0.3);
               
            
               console.log(x("africa"));
               console.log(x("america"));
               console.log(x("australia"));

  

            var xAxis = d3.axisBottom(x);
            g.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0, "+ height + ")")
            .call(xAxis)
            .selectAll("text")
            .attr("x", "-5")
            .attr("y", "10")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-40)");
            var yAxis = d3.axisLeft(y)
                        .ticks(3);
            g.append("g")
            .attr("class", "y-axis")
            .call(yAxis);

    var extent = d3.extent(data,(d=>d.height));
    console.log(extent);


    var rects = g.selectAll("rect")
    .data(data);

    
    rects.enter()
    .append("rect")
    .attr("x", ((d,i)=> x(d.tower)))
    .attr("y", (d=>y(d.height)) )
    .attr("width", x.bandwidth)
    .attr("height", ((d,i)=>height-y(d.height)))
    .attr("fill", ((d,i)=>(d.tower=="africa")?"red":"blue"));

}).catch(function(error){
    console.log(error);
});