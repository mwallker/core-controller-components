<style>
	input {
	  width: 5em;
	}
</style>

<script lang="ts">
	let c: number = 0;
	let f: number = 32;
	let fahrenheit: number = 0;
	let celcius: number = 0;
	$: fahrenheit = parseInt((32 + (9 / 5) * c).toFixed(1), 10);
	$: celcius = parseInt(((5 / 9) * (f - 32)).toFixed(1), 10);

	// this should work! Right?
	function setBothFromC(value: number) {
	  c = +value;
	}

	function setBothFromF(value: number) {
	  f = +value;
	  // c = +((5 / 9) * (f - 32)).toFixed(1);
	}

	const generateRandomNumber = (): string => {
	  let text: string = "";

	  let possible: string = "0123456789";
	  let i: number = 0;

	  for (i = 0; i < 4; i++) {
	    text += possible.charAt(Math.floor(Math.random() * possible.length));
	    console.log(text);
	  }
	  return text;
	};
</script>

<div>C: {celcius}</div>
<div>F: {fahrenheit}</div>
<input value={celcius} on:input="{e => setBothFromC(e.target.value)}" type=number> °c =
<input value={fahrenheit} on:input="{e => setBothFromF(e.target.value)}" type=number> °f