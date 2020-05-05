const margin = {
    top: 20,
    right: 20,
    bottom: 40,
    left: 40
};

const width = screen.width/2 - margin.left - margin.right;
const height = screen.height/2 - margin.top - margin.bottom;


d3.json("revenues.json").then((data)=>{
   data.forEach(d=> {d.revenue = +d.revenue;
d.profit = +d.profit});

  //console.log(data);
  //attach svg
  var svg = d3.select('#chart-area')
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

                //scales
                const extent = d3.extent(data.map(d=>d.revenue));
                console.log(extent);
                const y_s = d3.scaleLinear()
                                .domain(extent)
                                .range([height, -10]);

                const x_s = d3.scaleBand()
                              .domain(data.map(d=>d.month))
                              .rangeRound([0, width])
                              .paddingInner(0.4)
                              .paddingOuter(0.3);
                          
                //axes
                const yAxis = d3.axisLeft(y_s)
                                .ticks(10);
                                svg.append('g')
                                .attr('class', 'y-Axis')
                                .call(yAxis);

                                

                const xAxis = d3.axisBottom(x_s);
                              svg.append('g')
                              .attr('class', 'x axis')
                              .attr('transform', `translate(0, ${height})`)
                              .call(xAxis)
                              .selectAll('text')   
                              .attr('x', '-5')
                              .attr('y', '10')
                              .attr('text-anchor', 'end')
                              .attr('transform', 'rotate(-40)');          
                                
               
                //select rectangles of the bar chart
                const rects = svg.selectAll('rects')
                                .data(data);

                //data join
                rects.enter()
                .append('rect')
                .attr('x', ((d,i)=>x_s(d.month)))
                .attr('y', (d=>y_s(d.revenue)))
                .attr('width', x_s.bandwidth)
                .attr('height', ((d,i)=>height-y_s(d.revenue)))
                .attr('fill', 'dodgerblue');
       

}).catch(error=>console.log(error));
