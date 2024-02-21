<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
$element;
if (isset($_POST["data"])) {
	$element = json_decode($_POST["data"]);
}
$element = QuotesController::quotesFinal($element);
?>
<!DOCTYPE html>
<html>

<head>
	<title>LCL24</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="../css/details.css">
	<link rel="stylesheet" href="https://unpkg.com/purecss@2.0.3/build/pure-min.css" integrity="sha384-cg6SkqEOCV1NbJoCu11+bm0NvBRc8IYLRGXkmNrqUBfTjmMYwNKPWBTIKyw9mHNJ" crossorigin="anonymous">
	<link rel="stylesheet" href="https://unpkg.com/purecss@2.0.3/build/grids-responsive-min.css">
	<script src="/js/details.js"></script>
</head>

<body>
	<div id="desktopNav" class="pure-g navbar">
		<div class="pure-u-1-8">
			<img src="../images/logo.png">
		</div>
		<div class="pure-u-1-8">
			<p><a href="/" class="no-underline">HOME</a></p>
		</div>
		<div class="pure-u-1-8">
			<p><a href="pricing" class="no-underline">PRICING</a></p>
		</div>
		<div class="pure-u-1-8">
			<p><a href="innovation" class="no-underline">INNOVATION</a></p>
		</div>
		<div class="pure-u-1-8">
			<p><a href="aboutUs" class="no-underline">ABOUT US</a></p>
		</div>
		<div class="pure-u-1-8">
			<p><a href="contact" class="no-underline">CONTACT</a></p>
		</div>
		<div class="pure-u-1-8">
			<p>Hello <?php echo Auth::user()->First_Name ?></p>
		</div>
		<div class="pure-u-1-8">
			<p><a href="/logout" class="no-underline">LOGOUT</a></p>
		</div>
		<div class="pure-u-1-8"></div>
	</div>
	<div id="hamburgerNav" class="pure-g">
		<div id="hamburgerImage"><img id="hamburger" src="../images/hamburger.svg"></div>
		<div class="logo">
			<picture>
				<source srcset="../images/logo.webp" type="image/webp">
				<img src="../images/logo.png">
			</picture>
		</div>
	</div>
	<div id="mobileNavbar">
		<div id="close" class="navElement"><img id="closeImg" src="../images/close.svg"></div>
		<a href="/" class="navElement">
			<p>HOME</p>
		</a>
		<a href="/pricing" class="navElement">
			<p>PRICING</p>
		</a>
		<a href="/innovation" class="navElement">
			<p>INNOVATION</p>
		</a>
		<a href="/aboutUs" class="navElement">
			<p>ABOUT US</p>
		</a>
		<a href="/contact" class="navElement">
			<p>CONTACT</p>
		</a>
		<a class="navElement">
			<p>LOGIN</p>
		</a>
	</div>
	<picture>
		<source class="background-image" srcset="../images/quotesBack.webp" type="../images/webp">
		<img class="background-image" src="../images/quotesBack.jpg">
	</picture>
	<div class="pure-g">
		<div class="pure-u-1-24"></div>
		<div id="mainSlide" class="pure-u-1 pure-u-md-22-24">
			<div class="pure-g">
				<div class="pure-u-1-1 main-table">
					<div class="pure-g dataLine">
						<div class="pure-u-1-4">OPERATOR</div>
						<div class="pure-u-1-4"><b><?php echo $element->tbl_export_import_land_Operator_carrier ?></b></div>
						<div class="pure-u-1-4"></div>
						<div class="pure-u-1-4"></div>
					</div>
					<div class="pure-g dataLine ">
						<div class="pure-u-1-4">ORIGIN COUNTRY</div>
						<div class="pure-u-1-4"><?php echo $element->Origin_country ?></div>
						<div class="pure-u-1-4">DESTINATION COUNTRY</div>
						<div class="pure-u-1-4"><?php echo $element->tbl_export_import_land_Destination_country ?></div>
					</div>
					<div class="pure-g dataLine">
						<div class="pure-u-1-4">DEPARTURE PORT</div>
						<div class="pure-u-1-4"><?php echo $element->Departure_Port ?></div>
						<div class="pure-u-1-4">DESTINATION PORT</div>
						<div class="pure-u-1-4"><?php echo $element->tbl_export_import_land_Destination_Port ?></div>
					</div>
					<div class="pure-g dataLine">
						<div class="pure-u-1-4">DEPARTURE LOCODE</div>
						<div class="pure-u-1-4"><?php echo $element->Departure_UN_Locode ?></div>
						<div class="pure-u-1-4">DESTINATION LOCODE</div>
						<div class="pure-u-1-4"><?php echo $element->Destination_UN_Locode ?></div>
					</div>
					<div class="pure-g dataLine">
						<div class="pure-u-1-4">VIA</div>
						<div class="pure-u-1-4"><?php echo $element->via; ?></div>
						<div class="pure-u-1-4"></div>
						<div class="pure-u-1-4"></div>
					</div>
					<div class="pure-g dataLine">
						<div class="pure-u-1-4">TT PORT-PORT</div>
						<div class="pure-u-1-4"><?php echo $element->tbl_export_import_land_TT ?></div>
						<div class="pure-u-1-4">TT CFS-CFS</div>
						<div class="pure-u-1-4"><?php echo $element->cfsCfs; ?></div>
					</div>
					<div class="pure-g dataLine">
						<div class="pure-u-1-4">VOY. NO.</div>
						<div class="pure-u-1-4"><?php echo $element->tbl_export_import_land_LCL_voy_noID ?></div>
						<div class="pure-u-1-4">EXPORT OR IMPORT</div>
						<div class="pure-u-1-4"><?php echo $element->tbl_export_import_land_Export_import_land ?></div>
					</div>
					<div class="pure-g dataLine">
						<div class="pure-u-1-4">INCOTERMS</div>
						<div class="pure-u-1-4"><?php echo $element->incoterms; ?></div>
						<div class="pure-u-1-4">MODE OF TRANSPORT</div>
						<div class="pure-u-1-4"><?php echo $element->modeOfTransport; ?></div>
					</div>
					<div class="line"></div>
					<div class="pure-g dataLine">
						<div class="pure-u-1-4">CARGO VOLUME</div>
						<div class="pure-u-1-4"><?php echo $element->Cargo_volume ?></div>
						<div class="pure-u-1-4">GROSS WEIGHT</div>
						<div class="pure-u-1-4"><?php echo $element->Weight ?></div>
					</div>
					<div class="pure-g dataLine">
						<div class="pure-u-1-4">BASIC FREIGHT</div>
						<div class="pure-u-1-4"><?php echo $element->calculatedWeight ?></div>
						<div class="pure-u-1-4">FREIGHT SURCHARGES</div>
						<div class="pure-u-1-4"><?php echo $element->surcharge ?></div>
					</div>
					<div class="pure-g dataLine">
						<div class="pure-u-1-4">PRE/ON CARRIAGE</div>
						<div class="pure-u-1-4"><?php echo $element->preOnCarriage; ?></div>
						<div class="pure-u-1-4">ON/PRE CARRIAGE</div>
						<div class="pure-u-1-4"><?php echo $element->onPrecarriage; ?></div>
					</div>
					<div class="pure-g dataLine">
						<div class="pure-u-1-4">DOOR PICKUP</div>
						<div class="pure-u-1-4"><?php echo $element->Pickup; ?></div>
						<div class="pure-u-1-4">DOOR DELIVERY</div>
						<div class="pure-u-1-4"><?php echo $element->DoorDelivery; ?></div>
					</div>
					<div class="pure-g dataLine">
						<div class="pure-u-1-4">FREIGHT RATE</div>
						<div class="pure-u-1-4"><?php echo $element->fullFreightRate . " " . $element->tbl_export_import_land_Currency; ?></div>
						<div class="pure-u-1-4">PORT TAXES</div>
						<div class="pure-u-1-4"><?php echo $element->fullTaxes . " " . $element->tbl_export_import_land_Currency; ?></div>
					</div>
					<div class="pure-g dataLine">
						<div class="pure-u-1-4">CARGO INSURANCE</div>
						<div class="pure-u-1-4"><?php echo $element->cargoInsurance ? "YES" : "NO" ?></div>
						<div class="pure-u-1-4">INSURANCE PREMIUM</div>
						<div class="pure-u-1-4"><?php echo $element->insurancePremium . " " . $element->tbl_export_import_land_Currency ?></div>
					</div>
					<div class="pure-g dataLine">
						<div class="pure-u-1-4"></div>
						<div class="pure-u-1-4"></div>
						<div id="total" class="pure-u-1-4">TOTAL: <?php echo $element->totalPrice . " " . $element->tbl_export_import_land_Currency; ?></div>
						<div class="pure-u-1-4"></div>
					</div>
					<div class="pure-g">
					<form action="/book" method="POST" style="width:100%">
						<input type="hidden" name="_token" value="<?php echo csrf_token();?>">
						<input type="hidden" name="data" value='<?php echo json_encode($element); ?>'>
						<button id="detailsButton" type="submit">DETAILS</button>
					</form>
					</div>
				</div>
			</div>
			<div class="pure-g">
				<a id="deleteButton" href="/"><img id="deleteImage" src="../images/delete.svg"></a>
			</div>
		</div>
		<div class="pure-u-1-24"></div>
	</div>
</body>

</html>