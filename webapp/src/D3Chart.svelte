<script>
    import { onMount, afterUpdate, createEventDispatcher } from 'svelte';
    import * as d3 from 'd3';

    const dispatch = createEventDispatcher();

    export let count = 0;

    let data = [];
        fetch("./test")
          .then(response => { return response.json(); })
            .then(json => {
                console.log(data)
                data = json['data'];
                console.log(data)
                init();
            });

    let el;

    onMount(() => {

    });

    function init() {
        d3.select(el)
            .selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
                .attr("x", 0)
                .attr("y", function(d,i) { return i*25; })
                .attr("height", 20)
                .attr("width", function(d) { return d; })
                .style("fill", "red")
                .on("click", () => { count += 10; })
                .on("mouseover", (event,d) => {
                    dispatch('hover', d);
                })

        d3.select(el)
            .selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("x", function(d) { return d + count - 2; })
            .attr("y", function(d,i) { return i*25 + 16; })
            .style("fill", "white")
            .style("text-anchor", "end")
            .text(function(d) {
                return d + " - " + count;
            });
    };

    // Called when a prop updates.
    afterUpdate(() => {
        d3.select(el)
            .selectAll("rect")
            .data(data)
            .transition().duration(500)
            .style("width", function(d) {
                return d + count + "px";
            })
            .text(function(d) {
                return d + " - " + count;
            });

        d3.select(el)
            .selectAll("text")
            .data(data)
            .transition().duration(500)
            .attr("x", function(d) { return d+count - 2; })
            .text(function(d) {
                return d + " - " + count;
            });
    });
</script>

<style>
    .chart :global(div) {
        font: 10px sans-serif;
        background-color: darkred;
        text-align: right;
        padding: 3px;
        margin: 1px;
        color: white;
    }
</style>

<slot name="header"><div>Default header</div></slot>
The current count is {count}.
<br/>
<svg style="border: 1px solid black; height: 300px; width: 1000px;" bind:this={el}></svg>
