<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CanDoorPickup extends Controller{
	public function canPickup(Request $request){
		$pickup = false;
		$delivery = false;
		$resp = DB::table("Cities_table")
				->where("Origin_country","=",$request->Origin_country)
				//->orWhere("Destination_country","=",$request->Destination_country)
				->get();
		$resp2 = DB::table("Cities_table")
				->where("Destination_country","=",$request->Destination_country)
				->get();
		$pickup = $resp->count() != 0;
		$delivery = $resp2->count() != 0;
		return response()->json(["pickup"=>$pickup,"delivery"=>$delivery]);
	}
}

?>