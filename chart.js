const margin = {
    top: 20,
    right: 20,
    bottom: 40,
    left: 40
};

const width = screen.width - margin.left - margin.right;
const height = screen.height - margin.top - margin.bottom;


d3.json("revenues.json").then((data)=>{
   data.forEach(d=> d.revenue = +d.revenue);

   const svg = d3.select('#chart-area')
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleBand()
                    .domain(data.map(d=>d.month))
                    .rangeRound([0, width])
                    .paddingInner(0.3)
                    .paddingOuter(0.3);

                    console.log(x("January"));

    const extent = d3.extent(data.map(d=>d.revenue));
    console.log(extent);

    const y = d3.scaleLinear()
                .domain(extent)
                .range([0, 400]);

    const rects = svg.selectAll('rect')
                    .data(data);
                    
   rects.enter()
        .append('rect')
        .attr('x', ((d,i)=>x(d.month)))
        .attr('y', 0)
        .attr('width', x.bandwidth)
        .attr('height', (d=>y(d.revenue)))
        .attr('fill', 'blue');

       

}).catch(error=>console.log(error));
