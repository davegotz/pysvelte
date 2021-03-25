<script>
    import D3Chart from './D3Chart.svelte'
    import D3DOMChart from './D3DOMChart.svelte'
    import { Tabs, Tab, TabContent } from "carbon-components-svelte";
    // Theme options: white, g10, g90, g100
    import 'carbon-components-svelte/css/g10.css'
	let count = 0;

</script>

<p>Count: {count}</p>
<p>Half Count: {count/2}</p>
<button on:click={() => {
    return count += 1;
}}>+</button>

<Tabs>
    <Tab label="D3 via SVG"/>
    <Tab label="D3 via DOM"/>
    <div slot="content">
        <TabContent>
            <D3Chart bind:count on:hover={d => console.log(d)}>
                <div slot="header">D3-based SVG Chart</div>
            </D3Chart>
        </TabContent>
        <TabContent>
            <D3DOMChart bind:count on:hover={d => console.log(d)}>
                <div slot="header">DIV-based Chart</div>
            </D3DOMChart>
        </TabContent>
    </div>
</Tabs>
