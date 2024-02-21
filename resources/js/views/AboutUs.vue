<template>
	<div>
	<picture>
		<source class="background-image" srcset="/images/quotesBack.webp" type="images/webp">
		<img class="background-image" src="/images/quotesBack.jpg">
	</picture>
	<div class="pure-g">
		<div class="pure-u-1-24"></div>
		<div id="mainSlide" class="pure-u-1 pure-u-md-22-24">
			<div class="pure-g">
				<div class="pure-u-1-1 main-table">
					<div class="wrapper">
						<p v-html="texts['aboutUsText'] ?? ''"></p>
						<img class="shipImage" src="/images/bigShip.jpg">
						<h3 v-html="texts['aboutUsText'] ?? ''"></h3>
						<p v-html="texts['aboutUsFocusText'] ?? ''"></p>
						<img class="shipImage"  src="/images/hands.jpg">
						<h3 v-html="texts['aboutUsValue'] ?? ''"></h3>
						<p v-html="texts['aboutUsValueText'] ?? ''"></p>
					</div>
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
<style scoped>
@import url("../../css/quotes.css");
	.shipImage{
		width:100%;
		height:auto;
	}
	p{
		padding-top:10px;
		padding-bottom:10px;
	}
	h3{
		padding-top:10px;
	}
</style>