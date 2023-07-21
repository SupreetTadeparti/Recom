<script setup>
import Nav from "../components/Nav.vue";
import { db } from "@/firebase"
import { onSnapshot, collection } from "firebase/firestore"

onSnapshot(collection(db, "users"), doc => {
    console.log(doc.docs);
})
</script>

<template>
    <Nav />
</template>

<style scoped></style>