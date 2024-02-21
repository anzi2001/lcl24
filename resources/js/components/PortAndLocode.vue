<template>
	<div>
		<select
			v-bind:name="portName"
			v-model="selectedPort"
			v-on:change="getLocode"
			class="main-form-input port"
		>
			<option
				v-for="(item, index) in portData"
				v-bind:key="index"
				v-bind:value="item[portName]"
			>{{item[portName]}}</option>
		</select>
		<input
			type="text"
			v-model="locodeData"
			v-bind:name="locodeName"
			placeholder="Locode"
			class="main-form-input locode"
			required
		/>
	</div>
</template>

<script>
import {defineComponent, ref, inject, onMounted, watch,Ref} from "vue"

export default defineComponent({
	props:{
		portName: {type: String},
		locodeName: {type: String},
		port: {type: String},
		locode: {type: String}
	},
	setup(props,{emit}){
		const portData = ref([])
		const selectedPort = ref("")
		const locodeData = ref("")
		const portEvent = inject(props.portName) ?? ref([])

		const getLocode = async () =>{
			const val = await fetch(`/api/autocomplete/getLocode/${selectedPort.value}`)
			const result = await val.json();
			locodeData.value = result[0].UN_LocodeID;
			emit("update:locode",locodeData.value);
			emit("update:port",selectedPort.value);
		}

		onMounted(()=>{
			watch(portEvent,()=>{
				portData.value = portEvent.value
				selectedPort.value = portData.value[0][props.portName ?? 0]
				getLocode()
			})
		})

		return {
			portData,
			selectedPort,
			locodeData,
			getLocode
		}
	}
});
</script>

<style>
</style>