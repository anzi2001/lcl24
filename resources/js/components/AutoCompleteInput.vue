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
			required
		/>
		<div class="parent">
			<div v-if="showAutocomplete" class="autocomplete">
				<div
					class="autocompleteEl"
					v-on:click="elementClick(item[inputName])"
					v-bind:key="index"
					v-bind:class="{selected: index === selectedItem}"
					v-for="(item,index) in autocompleteData"
				>{{item[inputName]}}</div>
			</div>
		</div>
	</div>
</template>

<script>
import {onMounted, ref, defineComponent,inject} from "vue"
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
		const port = {
			"Origin_country": "Departure_Port",
			"Destination_country": "Destination_Port"
		}

		const portEvent = inject(port[props.inputName ?? "ERROR"]) ?? ref([])

		const runAutocomplete = ()=>{
			emit("update:modelValue",autocompleteText.value);
			if (autocompleteText.value != "") {
				showAutocomplete.value = true;
				if (timeout.value) {
					clearTimeout(timeout.value);
				}
				timeout.value = setTimeout(async () => {
					const val = await fetch(`/api/autocomplete/${props.inputName}-${autocompleteText.value}`);
					autocompleteData.value = await val.json();
				}, 300);
			} else showAutocomplete.value = false;
		}

		const elementClick = async (elementText) => {
			autocompleteText.value = elementText;
			emit("update:modelValue",autocompleteText.value);
			const val = await fetch(
				`/api/autocomplete/countryForPort/${
					port[props.inputName ?? ""]
				}-${props.inputName}-${autocompleteText.value}`
			);
			const result = await val.json();
			portEvent.value = result
			props.onEntry();
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
				elementClick(autocompleteData.value[selectedItem.value][props.inputName]);
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
			port,
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