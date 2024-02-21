<template>
	<div>
	<picture>
		<source class="background-image" srcset="/images/quotesBack.webp" type="image/webp">
		<img class="background-image" src="/images/quotesBack.jpg">
	</picture>
	<div class="pure-g">
		<div class="pure-u-1-24"></div>
		<div id="mainSlide" class="pure-u-1 pure-u-md-22-24">
			<div class="pure-g">
				<div class="pure-u-1-1 main-table">
					<h3 v-html="texts['contactTitle'] ?? ''"></h3>
					<p v-html="texts['contactText'] ?? ''"></p>
				</div>
			</div>
		</div>
		<div class="pure-u-1-24"></div>
	</div>
	</div>
</template>
<script>
import { ref } from 'vue';
export default {
	setup(){
		var texts = ref({});
		fetch("/api/texts").then(response => response.json()).then(data => texts.value = data);
		return {
			texts
		}
	}
}
</script>
<style>
@import url("../../css/quotes.css");
</style>