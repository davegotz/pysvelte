<script>
    import D3Chart from './D3Chart.svelte'
    import D3DOMChart from './D3DOMChart.svelte'

	let count = 0;

</script>

<p>Count: {count}</p>
<p>Cut Count: {count/2}</p>
<button on:click={() => {
    return count += 1;
}}>+</button>

<hr>
<D3Chart bind:count on:hover={d => console.log(d)}>
    <div slot="header">D3-based SVG Chart</div>
</D3Chart>
<p/>
<D3DOMChart bind:count on:hover={d => console.log(d)}>
    <div slot="header">DIV-based Chart</div>
</D3DOMChart>
