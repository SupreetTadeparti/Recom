<script setup>
import Nav from "../components/Nav.vue";
import { db } from "@/firebase"
import { doc, onSnapshot, collection } from "firebase/firestore"

onSnapshot(collection(db, "users"), doc => {
    console.log(doc.data());
})
</script>

<template>
    <Nav />
</template>

<style scoped></style>