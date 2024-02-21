document.addEventListener("DOMContentLoaded", () => {
	let mobileNav = document.getElementById("mobileNavbar");

	let media = window.matchMedia("(min-width: 48em)");
	respondToMedia(media);
	media.addEventListener("change", respondToMedia)

	//document.getElementById("hamburgerImage").addEventListener("touchstart",hamburgerClick);
	document.getElementById("hamburgerImage").addEventListener("click", () => {
		mobileNav.classList.add("showMobile");
	});
	document.getElementById("closeImg").addEventListener("click", () => {
		mobileNav.classList.remove("showMobile");
	})
})

function respondToMedia(mediaQueryList) {
	let desktopNav = document.getElementById("desktopNav");
	let hamburgerNav = document.getElementById("hamburgerNav");
	if (mediaQueryList.matches) {
		desktopNav.style.display = "flex";
		hamburgerNav.style.display = "none";
	} else {
		desktopNav.style.display = "none";
		hamburgerNav.style.display = "flex";
	}
}