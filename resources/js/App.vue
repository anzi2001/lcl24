<template>
	<div>
		<div id="desktopNav" v-if="!isMobile" class="pure-g navbar">
			<div class="pure-u-1-8">
				<picture>
					<source srcset="/images/logo.webp" type="image/webp" />
					<img src="/images/logo.png" />
				</picture>
			</div>
			<router-link to="/" class="pure-u-1-8">
				<p>HOME</p>
			</router-link>
			<router-link to="/pricing" class="pure-u-1-8">
				<p>PRICING</p>
			</router-link>
			<router-link to="/innovation" class="pure-u-1-8">
				<p>INNOVATION</p>
			</router-link>
			<router-link to="/aboutUs" class="pure-u-1-8">
				<p>ABOUT US</p>
			</router-link>
			<router-link to="/contact" class="pure-u-1-8">
				<p>CONTACT</p>
			</router-link>
			<template v-if="isLogged == null">
			<router-link to="/login" class="pure-u-1-8">
				<p>LOGIN</p>
			</router-link>
			<router-link to="/register" class="pure-u-1-8">
				<p>REGISTER</p>
			</router-link>
			</template>
			<template v-else>
				<div class="pure-u-1-8">
					<p>HELLO {{isLogged}}</p>
				</div>
				<div @click="logout" class="pure-u-1-8 pointer">
					<p>LOGOUT</p>
				</div>
			</template>
		</div>
		<div id="hamburgerNav" v-if="isMobile" class="pure-g">
			<div id="hamburgerImage" @click="hamburgerClick = true">
				<img id="hamburger" src="/images/hamburger.svg" />
			</div>
			<div class="logo">
				<picture>
					<source srcset="/images/logo.webp" type="image/webp" />
					<img src="images/logo.png" />
				</picture>
			</div>
		</div>
		<div id="mobileNavbar" v-bind:class="{ showMobile: hamburgerClick }">
			<div id="close" class="navElement">
				<img v-on:click="hamburgerClick = false" id="closeImg" src="/images/close.svg" />
			</div>
			<router-link to="/" @click="hamburgerClick = false" class="navElement">
				<p>HOME</p>
			</router-link>
			<router-link to="/pricing" @click="hamburgerClick = false" class="navElement">
				<p>PRICING</p>
			</router-link>
			<router-link to="/innovation" @click="hamburgerClick = false" class="navElement">
				<p>INNOVATION</p>
			</router-link>
			<router-link to="/aboutUs" @click="hamburgerClick = false" class="navElement">
				<p>ABOUT US</p>
			</router-link>
			<router-link to="/contact" @click="hamburgerClick = false" class="navElement">
				<p>CONTACT</p>
			</router-link>
			<template v-if="isLogged == null">
				<router-link to="/login" @click="hamburgerClick = false" class="navElement">
					<p>LOGIN</p>
				</router-link>
				<router-link to="/register" @click="hamburgerClick = false" class="navElement">
					<p>REGISTER</p>
				</router-link>
			</template>
			<template v-else>
				<div class="navElement">
					<p>Hello {{isLogged}}</p>
				</div>
				<div @click="logoutMobile" class="navElement pure-u-1-8 pointer">
					<p>LOGOUT</p>
				</div>
			</template>
		</div>
		<router-view/>
	</div>
</template>

<script>

import {ref, defineComponent} from "vue"

export default defineComponent({
	name: "App",
	setup(){
		const media = window.matchMedia("(min-width: 48em)")
		const isMobile = ref(!media.matches)
		const hamburgerClick = ref(false)
		const isLogged = ref(null)
		media.addEventListener("change",mediaQuery=>{
			isMobile.value = !mediaQuery.matches	
		})
		fetch("/user").then((raw)=>{
			return raw.json();
		}).then((val)=>{
			if(val.name != null){
				isLogged.value  = val.name
			} 
		})

		const logout = ()=>{
			window.location.replace('/logout');
		}

		const logoutMobile = ()=>{
			hamburgerClick.value = false
			logout()
		}

		return {
			isMobile,
			hamburgerClick,
			isLogged, 
			logout,
			logoutMobile
			
		}
	},
});
</script>

<style>
@import url("https://unpkg.com/purecss@2.0.6/build/pure-min.css");
@import url("https://unpkg.com/purecss@2.0.6/build/grids-responsive-min.css");
@import url("../css/index.css");
</style>
