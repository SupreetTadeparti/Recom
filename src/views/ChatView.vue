<script setup>
import Nav from "../components/Nav.vue";
import { db } from "@/firebase"
import { onSnapshot, collection } from "firebase/firestore"

onSnapshot(collection(db, "users"), doc => {

})
</script>

<template>
    <Nav />
    <main>
        <div class="page-name">Chat</div>
    </main>
</template>

<style scoped></style>