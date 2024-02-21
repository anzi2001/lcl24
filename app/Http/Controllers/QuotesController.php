<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Controllers\QuotePrice;

class QuotesController extends Controller{
	private function queryImportView($request){
		return DB::table("view_tariff_and_land_tar_IMPORT")
			->where("tbl_export_import_land_Origin_country","like","%".$request->Origin_country."%")
			->where("tbl_export_import_land_Departure_Port","like","%".$request->Departure_Port."%")
			->where("tbl_land_tariff_Destination_country","like","%".$request->Destination_country."%")
			->where("tbl_land_tariff_Destination_port","like","%".$request->Destination_Port."%")
			->get();
	}

	private function queryExportView($request){
		return DB::table("view_tariff_and_land_tar_EXPORT")
				->where("tbl_export_import_land_Destination_country","like","%".$request->Destination_country."%")
				->where("tbl_export_import_land_Destination_Port","like","%".$request->Destination_Port."%")
				->where(function($query) use ($request){
					$query->where("tbl_land_tariff_Origin_country","like","%".$request->Origin_country."%")
						->orWhere("tbl_export_import_land_Origin_country","like","%".$request->Origin_country."%");
				})
				->where(function($query) use ($request){
					$query->where("tbl_land_tariff_Departure_Port","like","%".$request->Departure_Port."%")
						->orWhere("tbl_export_import_land_Departure_Port","like","%".$request->Departure_Port."%");
				})
				->get();
	}

	public function quotes(Request $request){
		if($request->session()->token() != csrf_token()){
			return json_encode([]);
		}
		$resp = $request->queryType == "selling" ? self::queryExportView($request) : self::queryImportView($request);
		foreach($resp as $item){
			$item->calculatedWeight = QuotePrice::calculateWeight($item,$request) * 1.1;
		}
		//find only one value Operator_carrier with lowest calculatedWeight
		$resp = $resp->groupBy('tbl_export_import_land_Operator_carrier');
		$resp = $resp->map(function($group){
			return $group->sortBy('calculatedWeight')->first();
		});
		return response()->json($resp->flatten());
	}
	public function quotesDetail(Request $request){
		if($request->session()->token() != csrf_token()){
			return json_encode([]);
		}
		$resp = $request->queryType == "selling" ? self::queryExportView($request) : self::queryImportView($request);
		foreach($resp as $item){
			//MODE
			$mode = "";
			if($item->tbl_export_import_land_Export_import_land == "EXPORT" && $request->Pickup == "" && $request->Departure_Port == "KOPER [SI]" || $request->Departure_port == "HAMBURG [DE]"){
				$mode = $item->tbl_export_import_land_Mode_of_transport;
			}
			if($item->tbl_export_import_land_Export_import_land == "EXPORT" && $request->Pickup == "" && !($request->Departure_Port == "KOPER [SI]" || $request->Departure_port == "HAMBURG [DE]")){
				$mode = $item->tbl_land_tariff_Mode_of_transport."/".$item->tbl_export_import_land_Mode_of_transport;
			}
			if($item->tbl_export_import_land_Export_import_land == "EXPORT" && $request->Pickup != "" && ($request->Departure_Port == "KOPER [SI]" || $request->Departure_Port == "HAMBURG [DE]")){
				$mode = $item->tbl_land_tariff_Mode_of_transport."/".$item->tbl_export_import_land_Mode_of_transport;
			}
			if($item->tbl_export_import_land_Export_import_land == "IMPORT" && $request->DoorDelivery == "" && $request->Destination_Port == "KOPER [SI]" || $request->Departure_port == "HAMBURG [DE]"){
				$mode = $item->tbl_export_import_land_Mode_of_transport;
			}
			if($item->tbl_export_import_land_Export_import_land == "IMPORT" && $request->DoorDelivery == "" && !($request->Destination_Port == "KOPER [SI]" || $request->Destination_Port == "HAMBURG [DE]")){
				$mode = $item->tbl_export_import_land_Mode_of_transport."/".$item->tbl_land_tariff_Mode_of_transport;
			}
			if($item->tbl_export_import_land_Export_import_land == "IMPORT" && $request->DoorDelivery != "" && $request->Destination_Port == "KOPER [SI]"){
				$mode = $item->tbl_export_import_land_Mode_of_transport."/".$item->tbl_land_tariff_Mode_of_transport;
			}
			if($item->tbl_export_import_land_Export_import_land == "IMPORT" && $request->DoorDelivery != "" && $request->Destination_Port == "HAMBURG [DE]"){
				$mode = $item->tbl_export_import_land_Mode_of_transport."/".$item->tbl_land_tariff_Mode_of_transport;
			}
			$item->mode = $mode;
			//END MODE
			//PORT TAXEs
			$fullTaxes = QuotePrice::calculatePortTaxes($item,$request);
			$item->fullTaxes = round($fullTaxes *1.1,2);
			$item->calculatedWeight = QuotePrice::calculateWeight($item,$request);
			//END PORT TAXES
			$fullFreightRate = $item->calculatedWeight + QuotePrice::calculateSurcharge($item,$request) + QuotePrice::calculatePreOnCarriage($item,$request) + QuotePrice::calculateOnPrecarriage($item,$request);
			$pickupOrDelivery = $request->queryType == "selling" ? $request->Pickup : $request->DoorDelivery;
			if ($pickupOrDelivery != "" && $request->Origin_country == "SLOVENIA") {
				if($request->Weight <= 100)
					$price = 20.28;
				else if($request->Weight <= 200)
					$price = 34.45;
				else if($request->Weight <= 300)
					$price = 40.13;
				else if($request->Weight <= 400)
					$price = 45.56;
				else if($request->Weight <= 500)
					$price = 50.66;
				else if($request->Weight <= 600)
					$price = 56.25;
				else if($request->Weight <= 700)
					$price = 62.02;
				else if($request->Weight <= 800)
					$price = 65.24;
				else if($request->Weight <= 900)
					$price = 68.47;
				else if($request->Weight <= 1000)
					$price = 71.70;
				else if($request->Weight <= 1200)
					$price = 79.42;
				else if($request->Weight <= 1400)
					$price = 86.62;
				else if($request->Weight <= 1600)
					$price = 94.34;
				else if($request->Weight <= 1800)
					$price = 105.20;
				else if($request->Weight <= 2000)
					$price = 111.99;
				else if($request->Weight <= 2250)
					$price = 123.86;
				else if($request->Weight <= 2500)
					$price = 135.74;
				else if($request->Weight <= 2750)
					$price = 143.97;
				else if($request->Weight <= 3000)
					$price = 152.20;
				else if($request->Weight > 3000)
					$price = ($request->Weight / 100) * 4.17;;
				
				if($item->tbl_land_tariff_Departure_Port == "LJUBLJANA [SI]" && $item->tbl_land_tariff_Via == "KOPER [SI]"){
					$price = 0;
				}	
				$fullFreightRate += $price;
			}
			$item->fullFreightRate = round($fullFreightRate * 1.1,2);
			$item->totalPrice = round(($item->fullFreightRate + $item->fullTaxes),2);
		}
		$resp = $resp->groupBy('tbl_export_import_land_Operator_carrier');
		$resp = $resp->map(function($group){
			return $group->sortBy('totalPrice')->first();
		});
		return response()->json($resp->flatten());
	}

	public static function quotesFinal($element){
		$newElement = clone $element;
		$via = null;
		if ($element->tbl_export_import_land_Export_import_land == "EXPORT") {
			$via = $element->tbl_land_tariff_Via . "," . $element->tbl_export_import_land_Via;
		} else {
			$via = $element->tbl_export_import_land_Via . "," . $element->tbl_land_tariff_Via;
		}
		$newElement->via = $via;
		$newElement->cfsCfs = $element->tbl_export_import_land_TT + $element->tbl_land_tariff_TT;
		$newElement->incoterms = $element->tbl_export_import_land_Export_import_land == "EXPORT" ? "CIF/CFR" : "FOB";
		$modeOfTransport = null;
		if ($element->tbl_export_import_land_Export_import_land == "EXPORT") {
			$modeOfTransport = $element->tbl_land_tariff_Mode_of_transport . "/" . $element->tbl_export_import_land_Mode_of_transport;
		} else {
			$modeOfTransport = $element->tbl_export_import_land_Mode_of_transport . "/" . $element->tbl_land_tariff_Mode_of_transport;
		}
		$newElement->modeOfTransport = $modeOfTransport;
		$newElement->calculatedWeight = QuotePrice::calculateWeight($element,$element);
		$newElement->surcharge = QuotePrice::calculateSurcharge($element,$element);
		$newElement->preOnCarriage = QuotePrice::calculatePreOnCarriage($element,$element);
		$newElement->onPrecarriage = QuotePrice::calculateOnPrecarriage($element,$element);
		$fullFreightRate = $newElement->calculatedWeight + $newElement->surcharge + $newElement->preOnCarriage + $newElement->onPrecarriage;
		if ($element->Pickup != "" && $element->Origin_country == "SLOVENIA") {
			if($element->Weight <= 100)
				$price = 20.28;
			else if($element->Weight <= 200)
				$price = 34.45;
			else if($element->Weight <= 300)
				$price = 40.13;
			else if($element->Weight <= 400)
				$price = 45.56;
			else if($element->Weight <= 500)
				$price = 50.66;
			else if($element->Weight <= 600)
				$price = 56.25;
			else if($element->Weight <= 700)
				$price = 62.02;
			else if($element->Weight <= 800)
				$price = 65.24;
			else if($element->Weight <= 900)
				$price = 68.47;
			else if($element->Weight <= 1000)
				$price = 71.70;
			else if($element->Weight <= 1200)
				$price = 79.42;
			else if($element->Weight <= 1400)
				$price = 86.62;
			else if($element->Weight <= 1600)
				$price = 94.34;
			else if($element->Weight <= 1800)
				$price = 105.20;
			else if($element->Weight <= 2000)
				$price = 111.99;
			else if($element->Weight <= 2250)
				$price = 123.86;
			else if($element->Weight <= 2500)
				$price = 135.74;
			else if($element->Weight <= 2750)
				$price = 143.97;
			else if($element->Weight <= 3000)
				$price = 152.20;
			else if($element->Weight > 3000)
				$price = ($element->Weight / 100) * 4.17;
		
			$fullFreightRate += $price;
		}
		$fullFreightRate = $fullFreightRate * 1.1;
		$newElement->fullFreightRate = round($fullFreightRate,2);
		$newElement->fullTaxes = round(QuotePrice::calculatePortTaxes($element,$element) * 1.1,2);
		$newElement->totalPrice = round(($newElement->fullFreightRate + $newElement->fullTaxes + $newElement->insurancePremium),2);
		return $newElement;
	}
}
?>