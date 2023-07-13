<script setup>
import { RouterLink } from 'vue-router';
import Button from './Button.vue';
import NavItem from './NavItem.vue';
import { ref } from 'vue';
import { db, auth } from "../firebase"
import { query, where, collection, getDocs } from 'firebase/firestore';

const authUser = auth.currentUser;

let user = ref({
    username: "..."
});

(async () => {
    const usersRef = collection(db, "users");

    const q = query(usersRef, where("id", "==", authUser.uid));

    const querySnapshot = await getDocs(q);

    user.value = querySnapshot.docs[0].data();
})()
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
        </div>
    </nav>
</template>

<style scoped>
nav {
    width: 15em;
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
    font-size: 1.4em;
}

.nav__links {
    padding: .5em 0;
    display: flex;
    flex-direction: column;
    gap: .25em;
}
</style>