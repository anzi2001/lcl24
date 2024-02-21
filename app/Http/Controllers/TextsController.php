<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class TextsController extends Controller{
	function getTexts(Request $request){
		$result = DB::table("text_fields")->get();
		$mappedToKey = [];
		foreach($result as $item){
			$mappedToKey[$item->name] = $item->value;
		};
		return $mappedToKey;
	}
}
?>