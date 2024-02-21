const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

/*mix.js('resources/js/app.js', 'public/js').postCss('resources/css/app.css', 'public/css', [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
]);*/
mix.js('resources/js/app.js', 'public/js')
   .vue({
	   version:3,
	   
   }).webpackConfig(webpack=>{
	   return {
		   plugins:[
			new webpack.DefinePlugin({
			// Drop Options API from bundle
			__VUE_PROD_DEVTOOLS__:false
		  }),
		]
	}
   });
