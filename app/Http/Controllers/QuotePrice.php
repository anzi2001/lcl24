<?php
namespace App\Http\Controllers;
class QuotePrice{
	static function calculateWeight($element,$request){
		$calculatedWeight = 0;
		$dividedWeight = $request->Weight / 1000.00 / $request->Cargo_volume;
		$WMRatio = $element->tbl_export_import_land_WM_ratio/1000;
		if ($dividedWeight < $WMRatio) {
			if (round($element->tbl_export_import_land_Price * $request->Cargo_volume, 2) < $element->tbl_export_import_land_Min_Price) {
				$calculatedWeight = $element->tbl_export_import_land_Min_Price;
			} else {
				$calculatedWeight = round($element->tbl_export_import_land_Price * $request->Cargo_volume, 2);
			}
		} else {
			if (round($element->tbl_export_import_land_Price * $request->Weight / 1000.00, 2) < $element->tbl_export_import_land_Min_Price) {
				$calculatedWeight = $element->tbl_export_import_land_Min_Price;
			} else {
				$calculatedWeight = round($element->tbl_export_import_land_Price * ($request->Weight / $element->tbl_export_import_land_WM_ratio), 2);
			}
		}
		return $calculatedWeight;
	}

	static function calculateSurcharge($element,$request){
		$dividedWeight = $request->Weight / 1000.00 / $request->Cargo_volume;
		$formula = $element->tbl_export_import_land_Congestion_surcharge + $element->tbl_export_import_land_Peak_season_surcharge;
		$formula += $element->tbl_export_import_land_Port_additional + $element->tbl_export_import_land_War_risk;
		if ($dividedWeight < 1){
			if($request->Cargo_volume > 1){
				$formula = $formula * $request->Cargo_volume;
			}
		} else if ($dividedWeight >= 1 && $request->Weight / 1000.00 > 1) {
			$formula = $formula * $request->Weight / 1000.00;
		}
		$surcharge = round($formula, 4);
		$surcharge += $element->tbl_export_import_land_Doc_fee + $element->tbl_export_import_land_Collection_fee;
		return $surcharge;
	}

	static function preOnCarriageWeight($dividedWeight, $WMRatio2, $minPrice2, $preCarriage, $request, $element){
		$result = $preCarriage;
		if ($dividedWeight < $WMRatio2) {
			if (round($result * $request->Cargo_volume, 4) < $minPrice2) {
				$result = round($minPrice2, 4);
			} else{
				$result = round($result * $request->Cargo_volume, 4);
			}
		} else {
			if (round($result * ($request->Weight / $element->tbl_land_tariff_WM_ratio), 2) < $minPrice2) {
				$result = round($minPrice2, 2);
			} else {
				$result = round($result * ($request->Weight / $element->tbl_land_tariff_WM_ratio), 4);
			}
		}
		return $result;
	}

	static function calculatePreOnCarriage($element,$request){
		$preOnCarriage = 0;
		$dividedWeight = $request->Weight / 1000.00 / $request->Cargo_volume;
		if($request->queryType == "selling"){
			$WMRatio2 = $element->tbl_land_tariff_WM_ratio / 1000;
			$minPrice2 = $element->tbl_land_tariff_Min_price + $element->tbl_land_tariff_Departure_Port_thc;
			$preOnCarriage = $element->tbl_land_tariff_Pre_carriage_price + $element->tbl_land_tariff_Departure_Port_thc;
			$preOnCarriage = self::preOnCarriageWeight($dividedWeight, $WMRatio2, $minPrice2, $preOnCarriage, $request, $element);
		}
		else{
			$WMRatio2 = $element->tbl_land_tariff_WM_ratio / 1000;
			$minPrice2 = $element->tbl_land_tariff_Min_price;
			$preOnCarriage = $element->tbl_land_tariff_Pre_carriage_price;
			$preOnCarriage = self::preOnCarriageWeight($dividedWeight, $WMRatio2, $minPrice2, $preOnCarriage, $request, $element);
		}
		if ($request->Departure_Port == "LJUBLJANA [SI]" && $element->tbl_land_tariff_Via == "KOPER [SI]" && ($request->Pickup != '')) {
			$preOnCarriage = 0;
		}

		return $preOnCarriage;
		
	}

	static function calculateOnPrecarriage($element,$request){
		$onPreCarriage = 0;
		$dividedWeight = $request->Weight / 1000.00 / $request->Cargo_volume;
		$dividedCarriage = $element->tbl_export_import_land_On_Carriage_WM_ratio / 1000;
		$carriageMultiplied = round($element->tbl_export_import_land_On_Carriage_Price * $request->Cargo_volume, 4);
		$carriageWeight = round($element->tbl_export_import_land_On_Carriage_Price * ($request->Weight / $element->tbl_export_import_land_On_Carriage_WM_ratio), 4);
		if ($dividedWeight < $dividedCarriage) {
			if ($carriageMultiplied < $element->tbl_export_import_land_On_Carriage_Min_Price) {
				$onPreCarriage = $element->tbl_export_import_land_On_Carriage_Min_Price;
			} else {
				$onPreCarriage = $carriageMultiplied;
			}
		} else {
			if ($carriageWeight < $element->tbl_export_import_land_On_Carriage_Min_Price) {
				$onPreCarriage =  $element->tbl_export_import_land_On_Carriage_Min_Price;
			} else {
				$onPreCarriage = $carriageWeight;
			}
		}
		return $onPreCarriage;
	}

	static function calculatePortTaxes($item,$request){
		$fullTaxes = 0;
		$dividedWeight = $request->Weight / 1000.00 / $request->Cargo_volume;
		if($request->queryType == "selling"){
			$feeCalculated =  $item->tbl_export_import_land_Solas_fee + $item->tbl_export_import_land_Isps + $item->tbl_export_import_land_Atc + $item->tbl_export_import_land_Customs_zapp;
			$feeCalculated += $item->tbl_export_import_land_BL_fee + $item->tbl_export_import_land_Ams_aci_fee_usa + $item->tbl_export_import_land_E_manifest_ca;
			$warfageCargo = $item->tbl_export_import_land_Warfage * $request->Cargo_volume;
			if ($dividedWeight < 1) {
				if ($item->tbl_land_tariff_Via == "KOPER [SI]") {
					if (round($warfageCargo, 4) >= $item->tbl_export_import_land_Warfage) {
						$fullTaxes += round($warfageCargo, 4) + $feeCalculated;
					} else {
						$fullTaxes += $item->tbl_export_import_land_Warfage + $feeCalculated;
					}
				}
			} else {
				if ($item->tbl_land_tariff_Via == "KOPER [SI]") {
					if (round($warfageCargo, 4) > $item->tbl_export_import_land_Warfage) {
						$fullTaxes += $item->tbl_export_import_land_Warfage * $request->Weight / 1000.00 + $feeCalculated;
					} else {
						$fullTaxes += $item->tbl_export_import_land_Warfage + $feeCalculated;
					}
				}
			}
			if ($item->tbl_land_tariff_Via != "KOPER [SI]") {
				if ($request->Weight >= 1000) {
					$fullTaxes += round($item->tbl_export_import_land_Warfage * $request->Weight / 1000.00, 4) + $item->tbl_export_import_land_LCL_charge  * $request->Weight/1000.0 + $feeCalculated;
				} else {
					$fullTaxes += round($item->tbl_export_import_land_Warfage, 4) + $item->tbl_export_import_land_LCL_charge  + $feeCalculated;
				}
			}
		}
		else{
			$feeCalculated =  $item->tbl_export_import_land_Atc + $item->tbl_export_import_land_ASC_port + $item->tbl_export_import_land_Delivery_order + $item->tbl_export_import_land_GSC_WM * $request->Cargo_volume;
			$warfageCargo = $item->tbl_export_import_land_Warfage * $request->Cargo_volume;
			if ($dividedWeight < 1) {
				if ($item->tbl_land_tariff_Via == "KOPER [SI]") {
					if (round($warfageCargo, 4) >= $item->tbl_export_import_land_Warfage) {
						$fullTaxes += round($warfageCargo, 4) + $item->tbl_export_import_land_Delivery_order;
					} else {
						$fullTaxes += $item->tbl_export_import_land_Warfage + $item->tbl_export_import_land_Delivery_order;
					}
				}
			} else {
				if ($item->tbl_land_tariff_Via == "KOPER [SI]") {
					if (round($warfageCargo, 4) >= $item->tbl_export_import_land_Warfage) {
						$fullTaxes += $item->tbl_export_import_land_Warfage * $request->Weight / 1000.00 + $item->tbl_export_import_land_Delivery_order;
					} else {
						$fullTaxes += $item->tbl_export_import_land_Warfage + $item->tbl_export_import_land_Delivery_order;
					}
				}
			}
			if ($item->tbl_land_tariff_Via != "KOPER [SI]") {
				if ($request->Weight >= 1000) {
					$fullTaxes += round($item->tbl_export_import_land_Warfage * $request->Weight / 1000.00, 4) + $item->tbl_export_import_land_LCL_charge  * $request->Weight/1000.0 + $feeCalculated;
				} else {
					$fullTaxes += round($item->tbl_export_import_land_Warfage, 4) + $item->tbl_export_import_land_LCL_charge  + $feeCalculated;
				}
			}
		}
		return $fullTaxes;
	}
}

?>