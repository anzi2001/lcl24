<template>
	<th orderIndex="1" @click="orderClick"><p><slot></slot></p><img :class="{hidden: !selected}" :src="imageSrc"></th>
</template>

<script>
import {ref} from "vue"
export default {
	props:{
		selected: {type: Boolean}
	},
	setup(props,{emit}){
		const orderIndex = ref(1)
		const imageSrc = ref("/images/arrowUp.svg")
		const isHidden = ref(true)

		const orderClick = (event)=>{
			emit("hide-clicks",[orderIndex,event.target.textContent])
			if(orderIndex.value == 1){
				imageSrc.value = "/images/arrowUp.svg";
			}
			else{
				imageSrc.value = "/images/arrowDown.svg"
			}
			orderIndex.value *= -1
		}

		return{
			imageSrc,
			orderClick,
			isHidden
		}
	}
}
</script>

<style>
.hidden{
	visibility:hidden;
}
</style>