<template>
	<picture>
		<source class="background-image" srcset="/images/quotesBack.webp" type="../images/webp">
		<img class="background-image" src="/images/quotesBack.jpg">
	</picture>
	<div class="pure-g">
		<div class="pure-u-1-24"></div>
		<div id="mainSlide" class="pure-u-1 pure-u-md-22-24">
			<div class="pure-g">
				<div class="pure-u-1-1 main-table">
					<table cellpadding="0" cellspacing="0">
						<thead>
							<tr id="header">
								<HeaderLine 
								:key="index" 
								@hide-clicks="orderClick($event),selectedHeader = index"
								v-for="(item,index) in headerArray" :selected="index==selectedHeader">{{item}}</HeaderLine>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<tr class="dataLine" :class="{chosen : selectedItem == index}" @click="selectedItem = index" :key="index" v-for="(item,index) in elementArray">
								<td>{{item.tbl_export_import_land_Operator_carrier}}</td>
								<td v-if="isExport && pickup != ''">{{pickup}}</td>
								<td>{{urlParams.get("Departure_Port")}}</td>
								<td>{{urlParams.get("Destination_Port")}}</td>
								<td v-if="!isExport && pickup != ''">{{pickup}}</td>
								<td v-if="isExport">{{item.tbl_land_tariff_Via}}<br>{{item.tbl_export_import_land_Via}}</td>
								<td v-else>{{item.tbl_export_import_land_Via}}<br>{{item.tbl_land_tariff_Via}}</td>
								<td>{{item.mode}}</td>
								<td>{{item.tbl_export_import_land_TT}}</td>
								<td>{{parseInt(item.tbl_land_tariff_TT)+parseInt(item.tbl_export_import_land_TT)}}</td>
								<td>{{item.fullTaxes}}</td>
								<td>{{item.fullFreightRate}}</td>
								<td>{{item.totalPrice}}</td>
								<td>{{ item.tbl_export_import_land_Currency }}</td>
								<td><p v-if="fastestIndex == index">Fastest</p> <p v-if="cheapestIndex == index">Cheapest</p></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="pure-g center">
				<div class="pure-1-12">
					<button id="detailsButton" @click="sendDetails.submit()">DETAILS</button>
				</div>
			</div>
			<div class="pure-g">
				<a id="deleteButton" href="/"><img id="deleteImage" src="/images/delete.svg"></a>
			</div>
		</div>
		<div class="pure-u-1-24"></div>
	</div>
	<div style="display:none">
		<form ref="sendDetails" action="/details" method="POST">
			<input type="hidden" name="_token" :value="id">
			<input type="text" name="data" :value="sendValues">
			<input name="queryType" value="">
		</form>
	</div>
</template>

<script>
import HeaderLine from "../components/HeaderLine.vue"
import {ref,watch,computed} from "vue"
export default {
	name: "Quotes Detailed",
	components: {HeaderLine},
	setup(){
		const orderHashMap = {
			"OPERATOR": "tbl_export_import_land_Operator_carrier",
			"DOOR PICKUP": "NO",
			"DEPARTURE": "tbl_land_tariff_Departure_port",
			"DESTINATION": "tbl_export_import_land_Destination_Port",
			"SAILING VIA": "tbl_land_tariff_Via",
			"PORT-PORT": "tbl_export_import_land_TT",
			"CFS-CFS": "tbl_land_tariff_TT",
			"BASIC FREIGHT": "calculatedWeight",
		}
		const id = document.getElementById("csrf-token").getAttribute("content");
		const urlParams = new URLSearchParams(window.location.search);
		const isExport = urlParams.get("queryType") == "selling"
		let pickup;
		let headerArray = ["OPERATOR","DEPARTURE","DESTINATION","SAILING VIA","MODE","PORT-PORT","CFS-CFS","PORT TAXES","FREIGHT RATE","TOTAL","CURRENCY","CHEAP/FAST"];
		if(isExport){
			pickup = urlParams.get("Pickup");
			if(pickup != ""){
				headerArray.splice(1,0,"DOOR PICKUP")
			}
		}
		else{
			pickup = urlParams.get("DoorDelivery")
			if(pickup != ""){
				headerArray.splice(3,0,"DOOR DELIVERY")
			}
		}
		
		const elementArray = ref([])
		const selectedItem = ref(0)
		const selectedHeader = ref(0)
		const sendDetails = ref(null)
		const fastestIndex = ref(0)
		const cheapestIndex = ref(0)
		fetch("/api/quotes/detail" + window.location.search+"&_token="+id,{
			headers:{
				"Content-Type":"application/json"
			}
		}).then(json => {
			return json.json();
		}).then(value => {
			elementArray.value = value;
		});
		watch(elementArray,()=>{
			if(elementArray.value.length == 0) return
			let fastestValue = parseInt(elementArray.value[0].tbl_land_tariff_TT)+parseInt(elementArray.value[0].tbl_export_import_land_TT);
			let cheapestValue = elementArray.value[0].totalPrice;
			elementArray.value.forEach((val,i)=>{
				if(fastestValue > parseInt(val.tbl_land_tariff_TT)+parseInt(val.tbl_export_import_land_TT)){
					fastestValue = parseInt(val.tbl_land_tariff_TT) + parseInt(val.tbl_export_import_land_TT);
					fastestIndex.value = i;
				}
				if(cheapestValue > val.totalPrice){
					cheapestValue = val.totalPrice;
					cheapestIndex.value = i;
				}
			})
		})

		const mergeOptions = (obj1,obj2)=>{ 
			const obj3 = {};
			for (const attrname in obj1) { obj3[attrname] = obj1[attrname]; }
			for (const attrname in obj2) { obj3[attrname] = obj2[attrname]; }
			return obj3;
		}

		const sendValues = computed(()=>{
			const entries = Object.fromEntries(new URLSearchParams(location.search))
			return JSON.stringify(mergeOptions(entries,elementArray.value[selectedItem.value]))
		})
		const orderClick = (varArray)=>{
			const orderBy = orderHashMap[varArray[1]]
			elementArray.value.sort((a,b)=>{
				if (a[orderBy] < b[orderBy]) return -1 * varArray[0].value;
				if (a[orderBy] > b[orderBy]) return 1 * varArray[0].value;
				return 0;
			})
		}
		
		return{
			elementArray,
			selectedItem,
			isExport,
			sendDetails,
			sendValues,
			headerArray,
			urlParams,
			selectedHeader,
			orderClick,
			pickup,
			fastestIndex,
			cheapestIndex,
			id
		}
	},
}
</script>

<style>
*{
	box-sizing:border-box;
}
.main-table{
	margin:auto;
	text-align: center;
	padding-bottom: 20px;
	overflow-x:auto;
	
}
#mainSlide{
	background-color: white;
	margin:auto;
	border-radius: 20px;
	position: relative;
	box-shadow: 10px 10px 58px 1px rgba(0,0,0,0.36);
	bottom:250px;
	padding-top:20px;
}
#header th{
	cursor: pointer;
	padding-bottom:10px;
	border-bottom: 1px solid black;
}
#header th p{
	display:inline-block;
	font-size:calc(12px + 0.3vw);
}
#header th img{
	display:inline-block;
	width:20px;
	height:19px;
	position: relative;
	top:2px;
}
.main-table > table{
	width:94%;
	margin:auto;
}
.main-table > table th{
	padding: 30px 0.7vw 0px 0.7vw;
}
.center{
	justify-content: center;
}
.dataLine{
	cursor: pointer;
}
.dataLine td{
	padding-top:20px;
	padding-bottom:20px;
}
.dataLine:nth-child(even) td{
	background-color: #f3f3f3;
}
#detailsButton{
	color:white;
	border:none;
	cursor: pointer;
	background-color: rgb(255, 182, 46);
	font-weight: 100 !important;
	padding: 15px 50px 15px 50px;
	border-radius: 40px;
	margin-left:20px;
	margin-right:20px;
	transition: background-color 0.8s ease;
}
#deleteButton{
	margin-left:10px;
	margin-bottom:10px;
}
#deleteImage{
	width:50px;
	height:50px;
	background-color: rgb(255, 182, 46);
	border-radius: 100px;
}
.chosen td{
	border: 1px solid black;
	border-left:0;
	border-right:0;
}
.chosen td:first-child{
	border-left: 1px solid black;
	border-top-left-radius: 40px;
	border-bottom-left-radius: 40px;
}
.chosen td:last-child{
	border-top-right-radius: 40px;
	border-bottom-right-radius: 40px;
	border-right: 1px solid black;
}

/*Mobile navbar CSS*/
#close{
	display: flex;
	justify-content: flex-end;
}
#close::after{
	content:none;
}
#closeImg{
	cursor: pointer;
	height:50px;
}

#mobileNavbar{
	position: fixed;
	width:0%;
	height:100vh;
	background-color: white;
	z-index: 1;
	transition: width 0.7s ease;
}
.showMobile{
	width:100% !important;

}
.showMobile p{
	padding: 10px;
}
.navElement{
	width:100%;
	font-size: 2em;
	overflow: hidden;
	text-align: center;
	text-decoration: none;
	color:black;
}
.navElement p{
	overflow: hidden;
}
.navElement::after{
	display:block;
	content:"";
	width:20%;
	margin:auto;
	height:1px;
	border-bottom: 1px solid rgba(255, 182, 46,0.7);
}

.logo{
	display:flex !important;
	justify-content: center;
	flex: 1;
}
#hamburger{
	cursor: pointer;
	padding:15px;
}
#hamburgerNav img{
	height: 80px;
}
#hamburgerNav{
	display:none;
	position: sticky;
	top:0;
	background-color: white;
	z-index: 5;
}
#close{
	display: flex;
	justify-content: flex-end;
}
#closeImg{
	cursor: pointer;
	height:50px;
}
</style>