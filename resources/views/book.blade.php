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
		<source class="background-image" srcset="/images/quotesBack.webp" type="images/webp">
		<img class="background-image" src="/images/quotesBack.jpg">
	</picture>
	<div class="pure-g">
		<div class="pure-u-1-24"></div>
		<div id="mainSlide" class="pure-u-1 pure-u-md-22-24">
			<div>
				<p style="text-align:center; font-size:18px; margin-bottom:20px">Thank you for your interest! We will reply to you in the shortest amount of time</p>
			</div>
		</div>
		<div class="pure-u-1-24"></div>
	</div>
</body>