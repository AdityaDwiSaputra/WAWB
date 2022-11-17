<template>
  <v-app id="inspire">
  <!-- Forked from a template on Tutorialzine: https://tutorialzine.com/2016/06/freebie-landing-page-template-with-flexbox -->
  <header>
    <h2><a href="https://www.pens.ac.id/"><img height="40" :src="require('../assets/PENS.png')" alt="" srcset=""></a></h2>
    <nav>
      <li><a href="#about">About</a></li>
      <li><a href="#testimoni">Testimoni</a></li>
      <li><a href="#contact">Contact</a></li>
    </nav>
  </header>

  <section class="hero">
    <div class="background-image"></div>
    <div class="hero-content-area">
      <h1>Be Healty Be Happy</h1>
      <h3>Sistem Infomasi Layanan Konseling & Kesehatan</h3>
      <a @click="this.$router.push({name: 'Login'})" class="btn">Login / Register</a>
    </div>
  </section>

  <section id="about" class="about">
    <h3 class="title">About</h3>
    <p>Sistem Infomasi Layanan Konseling & Kesehatan merupakan aplikasi yang diperuntukkan untuk mahasiswa PENS yang mempunyai fitur dan keunggulan sebagi berikut</p>
    <hr>

    <ul class="grid">
      <li>
        <i class="fa fa-medkit fa-4x"></i>
        <h4>Pelayanan Kesehatan</h4>
        <p>Menyediakan pelayanan kesehatan bagi seluruh mahasiswa PENS</p>
      </li>
      <li>
        <i class="fa fa-heart fa-4x"></i>
        <h4>Pelayanan Konseling</h4>
        <p>Menyediakan pelayanan konseling bagi seluruh mahasiswa PENS</p>
      </li>
      <li>
        <i class="fa fa-newspaper-o fa-4x"></i>
        <h4>News Artikel</h4>
        <p>Menyediakan artikel - artikel kesehatan yang bisa dibaca oleh mahasiswa</p>
      </li>
      <li>
        <i class="fa fa-user-md fa-4x"></i>
        <h4>Tenaga Kesehatan</h4>
        <p>Didukung oleh tenaga kesehatan yang berkompeten dibidangnya</p>
      </li>
    </ul>
  </section>

  <section id="testimoni" class="testimonials">
    <h3 class="title">Testimoni</h3>
    <hr>
    <p class="quote">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni dolor, temporibus exercitationem eius pariatur nobis vero possimus laborum excepturi aspernatur voluptates quisquam nemo! Magnam ut sit nisi beatae optio quisquam.</p>
    <p class="author">- Mahasiswa 001</p>
    <p class="quote">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum fugit ullam nostrum aut autem neque et in ipsum voluptas nemo illo voluptatem, quia, eaque corporis unde eveniet atque, ipsam incidunt!</p>
    <p class="author">- Mahasiswa 002</p>
    <p class="quote">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam alias autem maiores omnis eligendi iure deleniti. Ullam, voluptates tempora aliquam quas harum architecto rem? Quae cum culpa minus explicabo velit.</p>
    <p class="author">- Mahasiswa 003</p>
  </section>

  <section id="contact" class="contact">
    <h3 class="title">Contact</h3>
    <p>Bila anda mempunyai kritik dan saran bisa contact kita melalui email berikut <b>Email@gmail.com</b> </p>
    <hr>
  </section>

  <footer>
    <p>Images courtesy of <a href="http://unsplash.com/">unsplash</a>.</p>
    <p>Ini adalah bagian yang sebagian orang tidak perduli tentang keberadaannya { footer }</p>
    <ul>
      <li><a href="https://twitter.com/KitaAkuKamuDia"><i class="fa fa-twitter-square fa-2x"></i></a></li>
      <li><a href="https://web.facebook.com/adityadwi.saputra.501/"><i class="fa fa-facebook-square fa-2x"></i></a></li>
      <li><a href="https://www.instagram.com/saputra.aditya_dwi/?hl=id"><i class="fa fa-instagram fa-2x"></i></a></li>
    </ul>
  </footer>

  <AppBar />
    <v-main class="bg-blue">    
      <LandingPage />
    </v-main>
  </v-app>
</template>

<style scoped>
/*General Styles*/

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

html {
	font-size: 16px;
	font-family: "Raleway", sans-serif;
	color: #555;
}

ul,
nav {
	list-style: none;
}

a {
	text-decoration: none;
	opacity: 0.75;
	color: #fff;
}

a:hover {
	opacity: 1;
}

a.btn {
	border-radius: 4px;
	text-transform: uppercase;
	cursor: pointer;
	font-weight: bold;
	text-align: center;
	background-color: #e07e7b;
	opacity: 1;
	transition: all 400ms;
}

a.btn:hover {
	background-color: #ce5856;
}

section {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 100px 80px;
}

section:not(.hero):nth-child(even) {
	background-color: #f5f5f5;
}

.grid {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}

hr {
	width: 250px;
	height: 3px;
	background-color: #e07e7b;
	border: 0;
	margin-bottom: 50px;
}

.image-1 {
	background-image: url("https://images.unsplash.com/photo-1505852903341-fc8d3db10436?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&s=e2f72e62d5f4f04256dd9305d5f51f3c");
}

.image-2 {
	background-image: url("https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&s=20b3b1c3caef8c619ac3c75c07a7eafb");
}

.image-3 {
	background-image: url("https://images.unsplash.com/photo-1490576198307-6ff97609a0cc?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&s=a0dbd168637edc2cfdac3715ab23d519");
}

.image-4 {
	background-image: url("https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&s=4f305bbc0243f81f1bf6053a62d76297");
}

section h3.title {
	text-transform: capitalize;
	font: bold 48px "Amatic SC", sans-serif;
	margin-bottom: 30px;
	text-align: center;
}

section p {
	max-width: 775px;
	line-height: 2;
	padding: 0 20px;
	margin-bottom: 30px;
	text-align: center;
}

@media (max-width: 800px) {
	section {
		padding: 50px 20px;
	}
}

/*Header Styles*/

header {
	position: absolute;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 35px 100px 0;
	animation: 1s fadein 0.5s forwards;
	opacity: 0;
	color: #fff;
	z-index: 2;
}

@keyframes fadein {
	100% {
		opacity: 1;
	}
}

header h2 {
	font-family: "Amatic SC", sans-serif;
}

header nav {
	display: flex;
	margin-right: -15px;
}

header nav li {
	margin: 0 15px;
}

@media (max-width: 800px) {
	header {
		padding: 20px 50px;
		flex-direction: column;
	}

	header h2 {
		margin-bottom: 15px;
	}
}

/*Hero Styles*/

.hero {
	position: relative;
	justify-content: center;
	text-align: center;
	min-height: 100vh;
	color: #fff;
}

.hero .background-image {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-image: url("https://images.unsplash.com/photo-1607077715832-faeb06118d9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80");
	background-size: cover;
	z-index: -1;
	background-color: #80a3db;
}

.hero h1 {
	font: 72px "Amatic SC", sans-serif;
	text-shadow: 2px 2px rgba(0, 0, 0, 0.3);
	margin-bottom: 15px;
}

.hero h3 {
	font: 28px "Raleway", sans-serif;
	font-weight: 300;
	text-shadow: 2px 2px rgba(0, 0, 0, 0.3);
	margin-bottom: 40px;
}

.hero a.btn {
	padding: 20px 46px;
}

.hero-content-area {
	opacity: 0;
	margin-top: 100px;
	animation: 1s slidefade 1s forwards;
}

@keyframes slidefade {
	100% {
		opacity: 1;
		margin: 0;
	}
}

@media (max-width: 800px) {
	.hero {
		min-height: 600px;
	}

	.hero h1 {
		font-size: 48px;
	}

	.hero h3 {
		font-size: 24px;
	}

	.hero a.btn {
		padding: 15px 40px;
	}
}

/*Packages Section*/

.about .grid li {
	padding: 50px;
	flex-basis: 50%;
	text-align: center;
}

.about .grid li i {
	color: #e07e7b;
}

.about .grid li h4 {
	font-size: 30px;
	margin: 25px 0;
}

@media (max-width: 800px) {
	.about .grid li {
		flex-basis: 100%;
		padding: 20px;
	}
}

/*Testimonials Section*/

.testimonials .quote {
	font-size: 22px;
	font-weight: 300;
	line-height: 1.5;
	margin: 40px 0 25px;
}

@media (max-width: 800px) {
	.testimonials .quote {
		font-size: 18px;
		margin: 15px 0;
	}

	.testimonials .author {
		font-size: 14px;
	}
}

/*Contact Section*/

.contact form {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	width: 60%;
}

.contact form .btn {
	padding: 18px 42px;
}

.contact form input {
	padding: 15px;
	margin-right: 30px;
	font-size: 18px;
	color: #555;
	flex: 1;
}

@media (max-width: 1000px) {
	.contact form input {
		flex-basis: 100%;
		margin: 0 0 20px 0;
	}
}

/*Footer Section*/

footer {
	display: flex;
	align-items: center;
	justify-content: space-around;
	background-color: #555;
	color: #fff;
	padding: 20px 0;
}

footer ul {
	display: flex;
}

footer ul li {
	margin-left: 16px;
}

footer p {
	text-transform: uppercase;
	font-size: 14px;
	opacity: 0.6;
	align-self: center;
}

@media (max-width: 1100px) {
	footer {
		flex-direction: column;
	}

	footer p {
		text-align: center;
		margin-bottom: 20px;
	}

	footer ul li {
		margin: 0 8px;
	}
}

</style>

<script>
import { defineComponent } from 'vue';

// Components

export default defineComponent({
  name: 'HomeView'
});
</script>
