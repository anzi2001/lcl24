<template>
	<div>
		<picture>
			<source
				class="background-image"
				srcset="/images/quotesBack.webp"
				type="image/webp"
			/>
			<img class="background-image" src="/images/quotesBack.jpg" />
		</picture>
		<div class="pure-g">
			<div class="pure-u-1-24"></div>
			<div id="mainSlide" class="pure-u-1 pure-u-md-12-24">
				<h2 class="registerTab">SIGN UP</h2>
				<div class="pure-g">
					<div class="pure-u-1-4"></div>
					<div class="pure-u-1-2 regInfo">
						<p v-show="showError" ref="error" class="error"></p>
						<form method="POST" action="/login">
							<input type="hidden" name="_token" v-bind:value="id">
							<div class="pure-g">
								<div class="pure-u-1-4">
									<p>Email:</p>
								</div>
								<div class="pure-u-3-4">
									<input
										type="email"
										name="email"
										class="main-form-input half-width"
									/>
								</div>
							</div>
							<div class="pure-g">
								<div class="pure-u-1-4">
									<p>Password:</p>
								</div>
								<div class="pure-u-3-4">
									<input
										type="password"
										name="password"
										class="main-form-input half-width"
									/>
								</div>
							</div>
							<div class="pure-g flex-center">
								<button
									type="submit"
									class="importButton fill submit">
									LOG IN
								</button>
							</div>
						</form>
					</div>
					<div class="pure-u-1-4"></div>
				</div>
			</div>
			<div class="pure-u-1-24"></div>
		</div>
	</div>
</template>
<script>
import { reactive, ref } from "vue";
export default {
	name: "Login",
	setup() {
		const loginComponent = reactive({
			login: true,
			email: "",
			password: "",
		});
		const showError = ref(false);
		const error = ref(null);
		/*const register = () => {
			const data = JSON.stringify(loginComponent);
			fetch("/login", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: data,
			})
				.then((res) => {
					return res.json();
				})
				.then((res) => {
					if (res.sucess) {
						showError.value = false;
					} else {
						showError.value = true;
						error.value.textContent = "Invalid Email or password";
					}
				});
		};*/
		const id = document.getElementById("csrf-token").getAttribute("content");
		return {
			loginComponent,
			showError,
			error,
			id
		};
	},
};
</script>
<style scoped>
.importButton {
	margin-bottom: 20px;
}
.regInfo .pure-g {
	padding-top: 10px;
	padding-bottom: 10px;
	font-size: 20px;
}
input {
	border: 0;
	text-align: start;
	border-bottom: 1px solid gray;
	border-radius: 0;
	outline: none;
	height: auto;
}
.error {
	text-align: center;
	color: red;
}
.submit {
	display: inline-block;
	text-align: center;
}
.registerTab {
	width: 50%;
	text-align: center;
	margin: auto;
}
.main-table {
	margin: auto;
	text-align: center;
	padding-bottom: 20px;
	overflow-x: auto;
}
#mainSlide {
	background-color: white;
	margin: auto;
	border-radius: 20px;
	position: relative;
	box-shadow: 10px 10px 58px 1px rgba(0, 0, 0, 0.36);
	bottom: 250px;
	padding-top: 20px;
}
</style>