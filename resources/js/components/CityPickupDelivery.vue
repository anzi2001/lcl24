<template>
	<div>
		<input
			ref="input"
			v-model="autocompleteText"
			type="text"
			v-bind:name="inputName"
			v-bind:placeholder="placeholder"
			class="main-form-input half-width"
			v-on:input="runAutocomplete()"
			v-bind:class="{removeBottomRadius: showAutocomplete}"
			v-on:keydown="keyDown"
			autocomplete="off"
		/>
		<div class="parent">
			<div v-if="showAutocomplete" class="autocomplete">
				<div
					class="autocompleteEl"
					v-on:click="elementClick(item['City_index'])"
					v-bind:key="index"
					v-bind:class="{selected: index === selectedItem}"
					v-for="(item,index) in autocompleteData"
				>{{item["City_index"]}}</div>
			</div>
		</div>
	</div>
</template>

<script>
import {onMounted, ref, defineComponent} from "vue"
export default defineComponent({
	props: {
		modelValue: String,
		inputName: {type: String},
		placeholder: {type: String},
		onEntry: {type: Function}
	},
	setup(props,{emit}){
		const autocompleteData = ref([])
		const autocompleteText = ref("")
		const selectedItem = ref(0)
		const showAutocomplete = ref(false)
		const timeout = ref(0)


		const runAutocomplete = ()=>{
			emit("update:modelValue",autocompleteText.value);
			if (autocompleteText.value != "") {
				showAutocomplete.value = true;
				if (timeout.value) {
					clearTimeout(timeout.value);
				}
				timeout.value = setTimeout(async () => {
					const val = await fetch(`/api/autocomplete/door/${autocompleteText.value}`);
					autocompleteData.value = await val.json();
				}, 400);
			} else showAutocomplete.value = false;
		}

		const elementClick = (elementText) => {
			autocompleteText.value = elementText;
			emit("update:modelValue",autocompleteText.value);
			showAutocomplete.value = false;
			selectedItem.value = 0;
		}
		const keyDown = (event) => {
			if (event.keyCode == 38 && selectedItem.value > 0) {
				//UP
				selectedItem.value--;
			} else if (event.keyCode == 40 && selectedItem.value < autocompleteData.value.length - 1) {
				//DOWN
				selectedItem.value++;
			} else if (event.keyCode == 13) {
				event.preventDefault();
				//input data
				elementClick(autocompleteData.value[selectedItem.value]["City_index"]);
				showAutocomplete.value = false;
				selectedItem.value = 0;
			}
		}
		const input = ref(null)
		const checkContains = (event) =>{
			if (input.value && input.value.contains(event.target)) {
				showAutocomplete.value = false;
			}
		}
		onMounted(()=>{
			document.body.addEventListener("click",checkContains)
		})


		return{
			autocompleteData,
			autocompleteText,
			selectedItem,
			showAutocomplete,
			runAutocomplete,
			elementClick,
			keyDown,
			input
		}
	}
});
</script>

<style>
</style>