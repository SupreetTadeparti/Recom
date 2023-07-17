<script setup>

import TypeHeading from "@/components/TypeHeading.vue"
import Button from "@/components/Button.vue"
import { ref, onMounted } from "vue"
import router from "@/router"

const props = defineProps([])

const homeSection = ref(null);
const featuresSection = ref(null);
const aboutSection = ref(null);
const contactSection = ref(null);
</script>

<template>
    <!-- 
        Nav:
        Home
        Features
        About
        Contact
     -->
    <div class="index-container">

        <nav class="nav">
            <div class="nav__item active" @click="() => {
                homeSection.scrollIntoView();
            }">Home</div>
            <div class="nav__item" @click="() => {
                featuresSection.scrollIntoView();
            }">Features</div>
            <div class="nav__item" @click="() => {
                aboutSection.scrollIntoView();
            }">About</div>
            <div class="nav__item" @click="() => {
                contactSection.scrollIntoView();
            }">Contact</div>
            <div class="nav__item" @click="() => {
                router.push('/auth');
            }">Join</div>
        </nav>
        <main>
            <section class="section home" ref="homeSection">
                <div class="left">
                    <div class="heading">
                        Interact with the Community through:
                    </div>
                    <TypeHeading :values="['Donation', 'Chatting', 'Events']" color="var(--accent)" />
                </div>
                <div class="right">
                    <img class="polygon" src="@/assets/img/lighttriangle.svg" alt="triangle">
                    <img class="polygon" src="@/assets/img/darktriangle.svg" alt="triangle">
                    <img class="polygon" src="@/assets/img/darktriangle.svg" alt="triangle">
                    <img class="polygon" src="@/assets/img/lightcircle.svg" alt="circle">
                    <img class="polygon" src="@/assets/img/lightcircle.svg" alt="circle">
                    <img class="polygon" src="@/assets/img/darkcircle.svg" alt="circle">
                </div>
            </section>
            <section class="section features" ref="featuresSection">
                <div class="heading heading--hat">Features</div>
                <div class="feature-cards">
                    <div class="card">
                        <img width="150" class="card__img" src="@/assets/img/eventcard.svg" alt="">
                        <div class="card__name">Events</div>
                        <div class="card__desc">Host and publicize events in the community</div>
                    </div>
                    <div class="card">
                        <img width="150" class="card__img" src="@/assets/img/chatcard.svg" alt="">
                        <div class="card__name">Chat</div>
                        <div class="card__desc">Communicate with other members of the community</div>
                    </div>
                    <div class="card">
                        <img width="150" class="card__img" src="@/assets/img/announcementcard.svg" alt="">
                        <div class="card__name">Announcements</div>
                        <div class="card__desc">Get up to date with updates/notices from the community</div>
                    </div>
                    <div class="card">
                        <img width="150" class="card__img" src="@/assets/img/feedbackcard.svg" alt="">
                        <div class="card__name">Feedback</div>
                        <div class="card__desc">Post suggestions and issues for the community to look into</div>
                    </div>
                    <div class="card">
                        <img width="150" class="card__img" src="@/assets/img/donatecard.svg" alt="">
                        <div class="card__name">Donate</div>
                        <div class="card__desc">Donate money to the community to use for better infrastructure</div>
                    </div>
                    <div class="card">
                        <img width="150" class="card__img" src="@/assets/img/infocard.svg" alt="">
                        <div class="card__name">Info</div>
                        <div class="card__desc">Get the latest information on the community</div>
                    </div>
                </div>
            </section>
            <section class="section about" ref="aboutSection">
                <div class="left">
                    <div class="heading heading--hat">About</div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel fugiat incidunt neque enim quaerat?
                        Explicabo laborum consectetur accusamus possimus cumque, perspiciatis assumenda doloremque earum
                        unde
                        repellat alias sequi id, esse ratione officiis totam quisquam corporis? Temporibus earum placeat, et
                        neque deserunt ex doloremque aspernatur repudiandae officiis ea vero suscipit corrupti architecto ut
                        molestias nemo facere magni natus sequi. Modi exercitationem explicabo nostrum temporibus obcaecati
                        vitae ullam aspernatur doloremque facere, voluptates a tenetur, nisi ut nam?</p>
                </div>
                <div class="right">
                    <div class="bg-circle"><img src="@/assets/img/aboutcircle.svg" alt=""></div>
                    <div class="bg-circle"><img src="@/assets/img/aboutcircle.svg" alt=""></div>
                    <div class="bg-circle"><img src="@/assets/img/aboutcircle.svg" alt=""></div>
                </div>
            </section>
            <section class="section contact" ref="contactSection">
                <div class="heading heading--hat">Contact</div>
                <form action="" method="post">
                    <input type="text" class="contact__input" placeholder="Full Name...">
                    <input type="text" class="contact__input" placeholder="Email Address...">
                    <input type="text" class="contact__input" placeholder="Subject...">
                    <textarea class="contact__textarea" placeholder="Message..."></textarea>
                    <Button text="Submit" />
                </form>
            </section>
        </main>
        <footer>
            ©2023 Supreet Tadeparti
        </footer>
    </div>
</template>

<style scoped>
.index-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

main {
    padding-top: 2em;
    display: flex;
    flex-direction: column;
    gap: 5em;
}

.nav {
    display: flex;
    gap: 2em;
    /* justify-content: center; */
    align-items: center;
    width: 100%;
    height: max-content;
    padding: 2em 8em;
    position: fixed;
    z-index: 15;
    /* box-shadow: 0 2px 5px 0 rgba(0 0 0 / .25) */
}

.nav.scrolled .nav__item {
    color: lighten(var(--text), 20%);
}

.nav.scrolled {
    background-color: var(--accent);
}

.nav__item {
    cursor: pointer;
    font-family: var(--secondary-font);
    font-size: 1.3em;
    color: #666;
    transition: color 75ms;
}

.nav__item:hover {
    color: #444;
}

.nav__item.active {
    color: var(--text)
}

section {
    display: flex;
    width: 100%;
    min-height: 40em;
    overflow: visible;
    z-index: 10;
}

section>.left,
section>.right {
    width: 100%;
    height: 100%;
    padding: 0 5em;
}

.home>.left {
    font-size: 1.5em;
}

section>.left {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.home .heading {
    font-weight: 500;
    font-family: var(--tertiary-font);
}

.home .heading:first-child {
    position: relative;
}

.home .heading:first-child::before {
    content: "";
    position: absolute;
    top: -1em;
    left: 0;
    width: 100%;
    height: .2em;
    border-radius: 2px;
    background-color: var(--primary);
}

section>.right {
    position: relative;
}

section>.right>.polygon {
    position: absolute;
}

.home .polygon:nth-child(1) {
    top: 60%;
    left: 60%;
}

.home .polygon:nth-child(2) {
    top: 0;
    left: -10%;
    transform: rotate(40deg)
}

.home .polygon:nth-child(3) {
    top: 0%;
    left: 80%;
    transform: rotate(-40deg)
}

.home .polygon:nth-child(4) {
    top: 80%;
    left: 0%;
}

.home .polygon:nth-child(5) {
    top: 10%;
    left: 50%;
}

.home .polygon:nth-child(6) {
    top: 45%;
    left: 20%;
}

.home .polygon:nth-of-type(2n + 1) {
    fill: var(--accent);
}

.features {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 4em;
}

.heading--hat {
    max-width: max-content;
    font-weight: 500;
    font-size: 2.5em;
    position: relative;
}

.heading--hat::before {
    content: "";
    position: absolute;
    bottom: 95%;
    width: 80%;
    left: 50%;
    transform: translateX(-50%);
    height: .2em;
    border-radius: .1em;
    background-color: var(--primary);
}

.feature-cards {
    padding: 2em 0;
    width: 75%;
    display: grid;
    row-gap: 1em;
    column-gap: 2em;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(3, 1fr);
    place-items: center;
    z-index: 100;
}

.feature-cards>.card {
    background-color: white;
    box-shadow: 0 0 5px 0 rgba(0 0 0 /.25);
    aspect-ratio: 4 / 5;
    width: 15em;
    border-radius: .5em;
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    gap: 1em;
    z-index: 100;
}

.feature-cards>.card>.card__name {
    font-size: 1.5em;
    text-align: center;
}

.feature-cards>.card>.card__desc {
    color: #555;
    text-align: center;
}

.about {
    padding: 5em 10em;
    padding-right: 0;
    position: relative;
    overflow: visible;
}

.about p {
    font-size: 1.2em;
    font-weight: 300;
    text-indent: 4em;
    margin: 5em 0;
}

.about>.right {
    padding: 0;
    z-index: -2;
}

.about .bg-circle {
    position: absolute;
    z-index: -1;
}

.about .bg-circle:nth-child(1) {
    top: -45%;
    left: -5%;
    scale: .8;
}

.about .bg-circle:nth-child(2) {
    top: 15%;
    left: 10%;
    scale: .6;
}

.about .bg-circle:nth-child(3) {
    top: 70%;
    left: -30%;
}

.contact {
    flex-direction: column;
    align-items: center;
    gap: 2em;
    padding-top: 5em;
    padding-right: 20em;
}

.contact .heading {
    width: calc(30 / 2.5em);
}

.contact form {
    display: flex;
    flex-direction: column;
    gap: .5em;
}

.contact__input,
.contact__textarea {
    width: 30em;
    border-radius: .25em;
    padding: .5em;
    font-size: 1.1em;
    border: 1px solid gray;
}

.contact__input:focus,
.contact__textarea:focus {
    outline: none;
}

.contact__textarea {
    height: 8em;
    /* font-size: 1em;   */
    resize: none;
}

footer {
    background-color: var(--primary);
    color: white;
    padding: 2em 0;
    text-align: center;
    font-size: 1.2em;
}

@media (max-width: 60em) {
    .contact {
        padding-right: 0;
    }

    .contact__input,
    .contact__textarea {
        max-width: 80vw;
    }

    .about {
        padding: 0;
    }

    .about>.left {
        align-items: center;
    }

    .right {
        display: none;
    }

    .about p {
        margin: 2em 0;
    }

    .feature-cards {
        grid-template-rows: repeat(6, 1fr);
        grid-template-columns: repeat(1, 1fr);
    }

    .home .left {
        padding: 0 2em;
    }

    .heading {
        text-align: center;
        display: flex;
        justify-content: center;
    }

    .features {
        margin-top: 0;
    }
}
</style>