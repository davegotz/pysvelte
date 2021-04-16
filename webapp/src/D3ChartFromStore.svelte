<script>
    import { Button, Grid, Row, Column } from "carbon-components-svelte";
    import { public_store } from './stores.js';
    import { onMount, afterUpdate, createEventDispatcher } from 'svelte';
    import * as d3 from 'd3';

    const dispatch = createEventDispatcher();

    export let count = 0;

    let storevalue = null;

    let height = 1;
    let width = 1;
    let el;

    /** We can declare the onMount function as follows using a Closure, but then we can't debug well in the browser.
    onMount(() => {
        public_store.subscribe(state => storevalue = state)
    });

     The alternative is to define a function explicitly, then pass that to the onMount function as below:
     */
    function mount() {
        public_store.subscribe(state => storevalue = state)
    }
    onMount(mount);


    function init() {
        // Nothing to do here for this simple vis!
    };

    // Called when a prop updates.
    function update() {
        let data = (storevalue == null ? [] : storevalue.complex_data.values)

        let xscale = d3.scaleLinear().domain([0, 20]).range([0, width]);
        let yscale = d3.scaleLinear().domain([0, data.length]).range([0, height]);


        let rects = d3.select(el)
            .selectAll("rect")
            .data(data);

        rects.enter().append("rect")
            .attr("x", 0)
            .attr("y", function (d, i) {
                return yscale(i);
            })
            .attr("height", yscale(1))
            .attr("width", function (d) {
                return xscale(d);
            })
            .style("fill", "red")
            .on("click", () => {
                count += 10;
            })
            .on("mouseover", (event, d) => {
                dispatch('hover', d);
            })

        rects
            .attr("y", function (d, i) {
                return yscale(i);
            })
            .attr("height", yscale(1) - 2)
            .attr("width", function (d) {
                return xscale(d);
            })

        let labels = d3.select(el)
            .selectAll("text")
            .data(data);

        labels.enter().append("text")
            .attr("x", function (d) {
                return xscale(d) - 2;
            })
            .attr("y", function (d, i) {
                return yscale(i + 1) - 4;
            })
            .style("fill", "white")
            .style("text-anchor", "end")
            .text(function (d) {
                return d;
            });

        labels
            .attr("y", function (d, i) {
                return yscale(i + 1) - 4;
            })
            .attr("x", function (d) {
                return xscale(d) - 2;
            })
    };
    afterUpdate(update);

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

<Grid noGutter="true">
    <Row noGutter="true">
        <Column>
             <Button on:click={() => {public_store.append_value();}}>App Random</Button> The store count is {storevalue==null?"":storevalue.counter} and the store array is {storevalue==null?"":storevalue.complex_data.values}.
        </Column>
    </Row>
    <Row noGutter="true">
        <Column aspectRatio="4x3">
            <div style="height: 100%; width: 100%;" bind:clientHeight={height} bind:clientWidth={width}>
                <svg style="border: 1px solid black; height: 100%; width: 100%;" bind:this={el}></svg>
            </div>
        </Column>
    </Row>
</Grid>