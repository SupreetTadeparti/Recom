<script setup>
import { RouterLink } from 'vue-router';
import Button from './Button.vue';
import NavItem from './NavItem.vue';
import { onMounted, reactive } from 'vue';
import { getUser } from "../firebase"

let user = reactive({
    username: "..."
});

onMounted(async () => {
    const authUser = await getUser();
    user.username = authUser.username
})
</script>

<template>
    <nav>
        <div class="nav__item--big">
            <img class="profile-img" src="@/assets/img/default.png" alt="photo" width="50">
            <div class="username">{{ user.username }}</div>
        </div>
        <div class="nav__item--big">
            <RouterLink to="/donate">
                <Button text="Donate" />
            </RouterLink>
        </div>
        <div class="nav__links">
            <NavItem text="Home" url="/home" />
            <NavItem text="Chat" url="/chat" />
            <NavItem text="Feedback" url="/feedback" />
            <NavItem text="Announcements" url="/announcements" />
            <NavItem text="Events" url="/events" />
            <NavItem text="Elect" url="/elect" />
        </div>
    </nav>
</template>

<style scoped>
nav {
    min-width: min(15em, 30vw);
    display: flex;
    flex-direction: column;
    box-shadow: 0 1px 7px 0 rgba(0 0 0 / .4)
}

.nav__item--big {
    display: flex;
    width: 100%;
    aspect-ratio: 4 / 2;
    align-items: center;
    justify-content: center;
    gap: .75em;
    border-bottom: 1px solid #aaa;
}

.nav__item--big>a {
    text-decoration: none;
}

.username {
    font-size: min(4vw, 1.4em);
}

.profile-img {
    max-width: 10vw;
}

.nav__links {
    padding: .5em 0;
    display: flex;
    flex-direction: column;
    gap: .25em;
    font-size: min(1em, 3vw);
}
</style>