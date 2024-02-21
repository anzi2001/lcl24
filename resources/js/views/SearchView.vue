<template>
    <div>
    <picture class="background-image">
        <source class="background-image" srcset="images/background.webp" type="image/webp" />
        <img class="background-image" src="images/background-big.jpg" />
    </picture>
    <form id="mainForm" @submit.prevent="toQuotes">
		<div class="pure-g">
			<div class="pure-u-1-24"></div>
			<div class="pure-u-1 pure-u-md-12-24 main-form flex-center">
				<div class="pure-u-1 title">
					<p>ADD SHIPPING DETAILS</p>
				</div>
				<p v-if="errors.length" class="errors">
    				<b>Please correct the following error(s):</b>
  				</p>
				<ul class="errors">
      				<li v-for="(error,index) in errors" :key="index">{{ error }}</li>
    			</ul>
				<div class="pure-g flex-center">
					<div class="pure-u-1 pure-u-sm-11-24">
						<AutoCompleteInput
							v-model="form.originCountry"
							input-name="Origin_country"
							placeholder="Origin country *"
							v-bind:onEntry="onEntry"
						></AutoCompleteInput>
					</div>
					<div class="pure-u-1-24"></div>
					<div class="pure-u-1 pure-u-sm-11-24">
						<AutoCompleteInput
							v-model="form.destinationCountry"
							input-name="Destination_country"
							placeholder="Destination country *"
							v-bind:onEntry="onEntry"
						></AutoCompleteInput>
					</div>
				</div>
				<div class="pure-g flex-center">
					<div class="pure-u-1 pure-u-sm-11-24">
						<PortAndLocode
							v-model:port="form.departurePort"
							v-model:locode="form.departureLocode"
							port-name="Departure_Port"
							locode-name="Departure_UN_Locode"
						></PortAndLocode>
					</div>
					<div class="pure-u-1-24"></div>
					<div class="pure-u-1 pure-u-sm-11-24">
						<PortAndLocode
							v-model:port="form.destinationPort"
							v-model:locode="form.destinationLocode"
							port-name="Destination_Port"
							locode-name="Destination_UN_Locode"
						></PortAndLocode>
					</div>
				</div>
				<div class="pure-g flex-center">
					<div class="pure-u-1 pure-u-sm-11-24 label-wrapper">
						<p>Cargo volume *</p>
						<input
							type="text"
							v-model="form.cargoVolume"
							name="Cargo_volume"
							placeholder="Cargo volume *"
							class="main-form-input"
						/>
					</div>
					<div class="pure-u-1-24"></div>
					<div class="pure-u-1 pure-u-sm-11-24 label-wrapper">
						<p>Cargo gross weight *</p>
						<input
							type="text"
							v-model="form.grossWeight"
							name="Weight"
							placeholder="Gross weight *"
							class="main-form-input"
						/>
					</div>
				</div>
				<div class="pure-g flex-center" v-if="isPickup">
					<div class="pure-u-1 pure-u-sm-23-24 label-wrapper">
						<p>Door pick-up *</p>
						<CityPickupDelivery
							v-model="form.doorPickup"
							type="text"
							name="Pickup"
							placeholder="Door Pickup"
							class="main-form-input"
							required=true
						>
						</CityPickupDelivery>
					</div>
				</div>
				<div class="pure-g flex-center" v-if="isDelivery">
					<div class="pure-u-1 pure-u-sm-23-24 label-wrapper">
						<p>Door Delivery</p>
						<CityPickupDelivery
							v-model="form.doorDelivery"
							input-name="Delivery"
							placeholder="Door delivery *"
							v-bind:onEntry="onEntry"
							required="true"
						></CityPickupDelivery>
					</div>
				</div>
				<div class="pure-g flex-center">
					<div class="pure-u-1 pure-u-sm-1-2 flex end">
						<button
							type="button"
							@click="form.isSelling = true"
							class="importButton"
							:class="{ fill: form.isSelling }"
						>I AM SELLING(EXPORT)</button>
					</div>
					<div class="pure-u-1 pure-u-sm-1-2 flex start">
						<button
							type="button"
							@click="form.isSelling = false"
							class="importButton"
							:class="{ fill: !form.isSelling }"
						>I AM BUYING(IMPORT)</button>
					</div>
				</div>
				<div class="pure-g flex-center" v-if="false">
					<div class="pure-u-1 pure-u-sm-1-2 flex end" style="align-items:end;">
						<button
							type="button"
							@click="form.cargoInsurance = !form.cargoInsurance"
							class="importButton"
							style="height: 70px; "
							:class="{ fill: form.cargoInsurance }"
						> CARGO INSURANCE&nbsp;&nbsp;&nbsp;&nbsp;</button>
					</div>
					<div class="pure-u-1 pure-u-sm-1-2 label-wrapper end">
						<p v-if="form.cargoInsurance">Cargo value</p>
						<input
							v-if="form.cargoInsurance"
							type="text"
							v-model="form.cargoValue"
							name="cargoValue"
							placeholder="Cargo value *"
							class="main-form-input"
						/>
					</div>
				</div>
				<div class="pure-g flex-center">
					<div class="pure-u-1 pure-u-sm-1-2 flex flex-center">
						<p v-if="form.cargoInsurance">INSURANCE PREMIUM: {{ insurancePremium }}</p>
					</div>
				</div>
				<input
					id="queryType"
					:value="form.isSelling ? 'selling' : 'buying'"
					type="hidden"
					name="queryType"
				/>
				<div class="pure-g flex-center">
					<button id="getquote" type="submit" class="importButton fill submit">GET A QUOTE</button>
				</div>
			</div>
			<div class="pure-u-1 pure-u-md-11-24" id="description">
				<p>{{texts["mainTitle"] ?? ""}}</p>
				<p v-html="texts['mainText'] ?? ''"></p>
			</div>
		</div>
	</form>
	</div>
</template>

<script>
import AutoCompleteInput from "../components/AutoCompleteInput";
import CityPickupDelivery from "../components/CityPickupDelivery";
import PortAndLocode from "../components/PortAndLocode";
import {ref,reactive,provide, computed} from "vue"
import router from "../router"
export default {
	name: "SearchView",
	components: { AutoCompleteInput, PortAndLocode, CityPickupDelivery },
	setup(){
		const errors = ref([]);
		const isPickup = ref(false);
		const isDelivery = ref(false);
		const form = reactive({
			originCountry: "",
			destinationCountry: "",
			departurePort: "",
			destinationPort: "",
			departureLocode: "",
			destinationLocode: "",
			doorPickup:"",
			doorDelivery:"",
			cargoVolume: 0,
			grossWeight: 0,
			isSelling: false,
			cargoInsurance: false,
			cargoValue: ""
		})

		const insurancePremium = computed(()=> {
			const cargoValue = parseFloat(form.cargoValue.replace(",","."));
			if(!cargoValue){
				return 0;
			}
			return ((parseFloat(cargoValue) * 0.33) / 100).toFixed(2);
		})
		const texts = ref({});

		fetch("/api/texts").then((raw)=>{
			return raw.json();
		}).then((val)=>{
			texts.value = val;
		})

		const toQuotes = ()=>{
			errors.value = [];
			const bindedObject = {
				Origin_country: form.originCountry,
				Destination_country: form.destinationCountry,
				Departure_Port: form.departurePort,
				Destination_Port: form.destinationPort,
				Departure_UN_Locode: form.departureLocode,
				Destination_UN_Locode: form.destinationLocode,
				Cargo_volume: parseFloat(form.cargoVolume.replace(",",".")),
				Weight: parseFloat(form.grossWeight.replace(",",".")),
				Pickup: form.doorPickup,
				DoorDelivery: form.doorDelivery,
				queryType: form.isSelling ? "selling" : "buying",
				cargoInsurance: form.cargoInsurance,
				cargoValue: parseFloat(form.cargoValue.replace(",",".")) || 0,
				insurancePremium: insurancePremium.value
			}
			if(bindedObject.Cargo_volume <= 0){
				errors.value.push("Cargo volume cannot be empty");
			}

			if(bindedObject.Weight <= 0){
				errors.value.push("Weight cannot be empty");
			}
			if(errors.value.length){
				return;
			}

			router.push({path:"quotes",query: bindedObject})
		}
		const onEntry = async ()=>{
			const temp = await fetch("/api/pickup"+`?Origin_country=${form.originCountry}&Destination_country=${form.destinationCountry}`);
			const parsedJson = await temp.json();
			isPickup.value = parsedJson.pickup;
			isDelivery.value = parsedJson.delivery;
		}

		provide("Departure_Port",ref([]))
		provide("Destination_Port",ref([]))

		return {
			form,
			toQuotes,
			errors,
			isPickup,
			isDelivery,
			insurancePremium,
			onEntry,
			texts
		}
	}
}
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
.errors{
	margin:auto;
	color:red;
	margin-bottom:5px;
}
</style>