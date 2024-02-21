<template>
  <input ref="input"
	v-model="loginButtonText"
	v-bind:type="type"
	v-bind:name="inputName"
	class="main-form-input half-width"
	v-on:input="updateValue()"/>
</template>

<script>
import { ref } from 'vue';

export default {
	props:{
		modelValue: String,
		inputName: String,
		type: String
	},
	setup(props,{emit}){
		const loginButtonText = ref("");
		const updateValue = ()=>{
			emit("update:modelValue",loginButtonText.value);
		}
		return {
			updateValue,
			loginButtonText
		}
	}
}
</script>

<style>

</style>