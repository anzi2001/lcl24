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
					<div class="pure-g wrapper">
						<div class="pure-u-1-1">
							<h3 v-html="texts['pricingCustomers'] ?? ''"></h3>
							<p v-html="texts['pricingCustomersText'] ?? ''"></p>
						</div>
					</div>
					<div class="spacer"></div>
					<div class="pure-g">
						<div class="pure-u-1-1">
							<h3 v-html="texts['pricingForwardersTitle'] ?? ''"></h3>
							<p v-html="texts['pricingForwardersText'] ?? ''"></p>
						</div>
					</div>
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
<style>
@import url("../../css/quotes.css");
</style>