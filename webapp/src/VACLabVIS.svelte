<script>
    import {
        Grid, Row, Column
    } from "carbon-components-svelte";
    import { onMount, afterUpdate, createEventDispatcher } from 'svelte';
    import * as d3 from 'd3';

    const dispatch = createEventDispatcher();

    let height=0;
    let width=0;

    afterUpdate(() => {
        // Resize triggers this callback.  This is where we would rescale the D3 visualization if needed.

        // We could also dispatch the resize event up to the parent component if we wanted to.
        dispatch("resize", [width, height]);
    });
</script>

<Grid noGutter="true">
    <Row noGutter="true">
        <Column>The SVG is {width}x{height}</Column>
    </Row>
    <Row noGutter="true">
        <!-- Carbon has aspect ratio options for 2x1, 1x2, 16x9, 9x16, 4x3, 3x4, 1x1 -->
        <!-- See https://carbon-svelte.vercel.app/components/Grid -->
        <Column noGutter="true" aspectRatio="4x3" style="border: 1px solid black;">
            <div style="width:100%; height:100%; border:1px solid red;" bind:clientHeight={height} bind:clientWidth={width}>
                <svg style="border: 1px solid blue; width: 100%; height: 100%;"></svg>
            </div>
        </Column>
    </Row>
</Grid>


