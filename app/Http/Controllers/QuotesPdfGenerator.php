<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Controllers\QuotesController;
use App\Mail\LclBook;
use Dompdf\Dompdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class QuotesPdfGenerator extends Controller{
	function sendMail(Request $request){
		$user = Auth::user();
		$quotesController = new QuotesController();
		$data = $request->all();
		$quoteDetail = $quotesController->quotesFinal(json_decode($data["data"]));
		$insuranceString = $quoteDetail->cargoInsurance ? "YES" : "NO";
		$htmlString = "
				<style>
				*{
					font-size: 20px;
				}
				body { font-family: DejaVu Sans, sans-serif; }
				</style>
				<p>User: {$user->First_Name} {$user->Last_Name}</p>
				<p>Email: {$user->email}</p>
				<p>Company: {$user->Company_name}</p>
				<table style='width:100%'>
					<tr>
						<td>OPERATOR</td>
						<td>{$quoteDetail->tbl_export_import_land_Operator_carrier}</td>
					</tr>
					<tr>
						<td>ORIGIN COUNTRY</td>
						<td>{$quoteDetail->Origin_country}</td>

						<td>DESTINATION COUNTRY</td>
						<td>{$quoteDetail->tbl_export_import_land_Destination_country}</td>
					</tr>
					<tr>
						<td>DEPARTURE PORT</td>
						<td>{$quoteDetail->Departure_Port}</td>
						<td>DESTINATION PORT</td>
						<td>{$quoteDetail->tbl_export_import_land_Destination_Port}</td>
					</tr>
					<tr>
						<td>DEPARTURE LOCODE</td>
						<td>{$quoteDetail->Departure_UN_Locode}</td>
						<td>DESTINATION LOCODE</td>
						<td>{$quoteDetail->Destination_UN_Locode}</td>
					</tr>
					<tr>
						<td>VIA</td>
						<td>{$quoteDetail->via}</td>
					</tr>
					<tr>
						<td>TT PORT-PORT</td>
						<td>{$quoteDetail->tbl_export_import_land_TT}</td>
						<td>TT CFS-CFS</td>
						<td>{$quoteDetail->cfsCfs}</td>
					</tr>
					<tr>
						<td>VOY. NO.</td>
						<td>{$quoteDetail->tbl_export_import_land_LCL_voy_noID}</td>
						<td>EXPORT OR IMPORT</td>
						<td>{$quoteDetail->tbl_export_import_land_Export_import_land}</td>
					</tr>
					<tr>
						<td>INCOTERMS</td>
						<td>{$quoteDetail->incoterms}</td>
						<td>MODE OF TRANSPORT</td>
						<td>{$quoteDetail->modeOfTransport}</td>
					</tr>
					<tr>
						<td>CARGO VOLUME</td>
						<td>{$quoteDetail->Cargo_volume} m3</td>
						<td>GROSS WEIGHT</td>
						<td>{$quoteDetail->Weight} KG</td>
					</tr>
					<tr>
						<td>BASIC FREIGHT</td>
						<td>{$quoteDetail->calculatedWeight} {$quoteDetail->tbl_export_import_land_Currency}</td>

						<td>FREIGHT SURCHARGES</td>
						<td>{$quoteDetail->surcharge} {$quoteDetail->tbl_export_import_land_Currency}</td>
					</tr>
					<tr>
						<td>PRE/ON CARRIAGE</td>
						<td>{$quoteDetail->preOnCarriage}</td>

						<td>ON/PRE CARRIAGE</td>
						<td>{$quoteDetail->onPrecarriage}</td>
					</tr>
					<tr>
						<td>DOOR PICKUP</td>
						<td>{$quoteDetail->Pickup}</td>

						<td>DOOR DELIVERY</td>
						<td>{$quoteDetail->DoorDelivery}</td>
					</tr>
					<tr>
						<td>FREIGHT RATE</td>
						<td>{$quoteDetail->fullFreightRate} {$quoteDetail->tbl_export_import_land_Currency}</td>

						<td>PORT TAXES</td>
						<td>{$quoteDetail->fullTaxes} {$quoteDetail->tbl_export_import_land_Currency}</td>
					</tr>
					<tr>
						<td>CARGO INSURANCE</td>
						<td>{$insuranceString}</td>

						<td>INSURANCE PREMIUM</td>
						<td>{$quoteDetail->insurancePremium} {$quoteDetail->tbl_export_import_land_Currency}</td>
					</tr>
					<tr>
						<td></td>
						<td></td>
						<td>TOTAL</td>
						<td>{$quoteDetail->totalPrice} {$quoteDetail->tbl_export_import_land_Currency}</td>
					</tr>
				</table>
				";
		$domPdf = new Dompdf();
		$domPdf->loadHtml($htmlString);
		$domPdf->setPaper('A4', 'landscape');
		$domPdf->render();
		$pdfString = $domPdf->output();

		$to = "info@lcl24.com";

		$pdfBookMail = new LclBook($pdfString);

		Mail::to($to)->send($pdfBookMail);
		Mail::to($user->email)->send($pdfBookMail);

		// insert into tbl_cargo_details values of $queryDetails with structure
		// CargoID	Origin_country	Destination_country	Departure_port	Departure_UN_Locode	Destination_port	Destination_UN_Locode	Pickup	Door_delivery	Via	Via2	TT	TT_CFS_CFS	Cargo_volume	Cargo_gross_weight	Export_Import	Weight_volume	Operator_carrier	User_ID	Incoterms	Incoterms2	LCL_voy_noID	Formula_F	Basic_freight	Freight_surcharges	Pre_carriage	On_carriage	Pickup_costs	Door_delivery_costs	Freight_rate	Port_costs	Total_freight	Via3	Via4	Cargo_value	Cargo_value_currency	Insurance_yes_no	Insurance_premium	Request_no	Booking_no	Date_Submitted	Mode_of_transport	Transport_type	Test
		$lastId = DB::table("tbl_cargo_details")->max("CargoID");

		DB::table("tbl_cargo_details")->insert([
			"Origin_country" => $quoteDetail->Origin_country,
			"Destination_country" => $quoteDetail->tbl_export_import_land_Destination_country,
			"Departure_port" => $quoteDetail->Departure_Port,
			"Departure_UN_Locode" => $quoteDetail->Departure_UN_Locode,
			"Destination_port" => $quoteDetail->tbl_export_import_land_Destination_Port,
			"Destination_UN_Locode" => $quoteDetail->Destination_UN_Locode,
			"Pickup" => $quoteDetail->Pickup,
			"Door_delivery" => $quoteDetail->DoorDelivery,
			"Via" => $quoteDetail->via,
			"TT" => $quoteDetail->tbl_export_import_land_TT,
			"TT_CFS_CFS" => $quoteDetail->cfsCfs,
			"Cargo_volume" => $quoteDetail->Cargo_volume,
			"Cargo_gross_weight" => $quoteDetail->Weight,
			"Export_Import" => $quoteDetail->tbl_export_import_land_Export_import_land,
			"Weight_volume" => $quoteDetail->calculatedWeight,
			"Operator_carrier" => $quoteDetail->tbl_export_import_land_Operator_carrier,
			"Incoterms" => $quoteDetail->incoterms,
			"Incoterms2" => $quoteDetail->incoterms2 ?? "",
			"LCL_voy_noID" => $quoteDetail->tbl_export_import_land_LCL_voy_noID,
			"Formula_F" => $quoteDetail->formulaF ?? "",
			"Basic_freight" => $quoteDetail->calculatedWeight,
			"Freight_surcharges" => $quoteDetail->surcharge,
			"Pre_carriage" => $quoteDetail->preOnCarriage,
			"On_carriage" => $quoteDetail->onPrecarriage,
			"Freight_rate" => $quoteDetail->fullFreightRate,
			"Port_costs" => $quoteDetail->fullTaxes,
			"Request_no" => sprintf("BR-%07d",$lastId + 1),
			"Booking_no" => sprintf("LCL24/BC/%07d",$lastId + 1),
			"Date_Submitted" => date("Y-m-d"),
			"Total_freight" => $quoteDetail->totalPrice,
			"Cargo_value" => $quoteDetail->cargoValue
		]);

		return view("book");
	}
}
?>