<template>
	<picture>
		<source class="background-image" srcset="/images/quotesBack.webp" type="images/webp">
		<img class="background-image" src="/images/quotesBack.jpg">
	</picture>
	<div class="pure-g">
		<div class="pure-u-1-24"></div>
		<div id="mainSlide" class="pure-u-1 pure-u-md-22-24">
			<div class="pure-g">
				<div class="pure-u-1-1 main-table">
					<h1 v-html="texts['innovationTitle'] ?? ''"></h1>
					<p v-html="texts['innovationText'] ?? ''"></p>
				</div>
			</div>
		</div>
		<div class="pure-u-1-24"></div>
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