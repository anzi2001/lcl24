<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class AutocompleteControllerFiller extends Controller{
	public function autocomplete($country){
		$array = explode("-",$country);
		$resp = DB::table("tbl_export_import_land")
					->select($array[0])
					->where($array[0],"like","%".$array[1]."%")
					->groupBy($array[0])
					->get();
		return response()->json($resp);
	}
	public function countryForPort($query){
		$getArray = explode("-",$query);
		$resp = DB::table("tbl_export_import_land")
					->select($getArray[0])
					->where($getArray[1],$getArray[2])
					->groupBy($getArray[0])->get();
		return response()->json($resp);
	}
	public function getLocode($locode){
		$resp = DB::table("tbl_UN_Locode_List")
					->where("Formula",$locode)->get();
		return response()->json($resp);
	}

	public function pickupDelivery($PartialCityName){
		if($PartialCityName == NULL || $PartialCityName == ""){
			return response()->json([]);
		}
		$resp = DB::table("Cities_table")
					->select("City_index")
					->where("City_index","like","%".$PartialCityName."%")
					//->groupBy($array[0])
					->get();
		return response()->json($resp);
	}
}
?>