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
            .selectAll("div")
            .data(data)
            .enter()
            .append("div")
            .style("width", function(d) {
                return d + "px";
            })
            .on("click", () => { count += 10; })
            .on("mouseover", (event,d) => {
                dispatch('hover', d);
            })
            .text(function(d) {
                return d + " - " + count;
            });
    };

    // Called when a prop updates.
    afterUpdate(() => {
        d3.select(el)
            .selectAll("div")
            .data(data)
            .transition().duration(500)
            .style("width", function(d) {
                return d + count + "px";
            })
            .text(function(d) {
                return d + " - " + count;
            });
    });
</script>

<style>
    .chart :global(div) {
        font: 10px sans-serif;
        background-color: steelblue;
        text-align: right;
        padding: 3px;
        margin: 1px;
        color: white;
    }
</style>

<slot name="header"><div>Default header</div></slot>
<div bind:this={el} class="chart"></div>
