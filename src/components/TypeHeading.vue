<script setup>
import { onMounted, ref } from "vue"
import Typed from 'typed.js';

const props = defineProps(["values", "color", "underline"])

const autotype = ref(null);
onMounted(() => {
    const typed = new Typed(autotype.value, {
        strings: props.values,
        typeSpeed: 100,
        backDelay: 30,
        backSpeed: 50,
        loop: true
    })
})

let some = "red"
</script>

<template>
    <div class="heading" :style="{ color: color }">
        <div class="autotype-heading" ref="autotype"></div>
    </div>
</template>

<style>
.heading * {
    color: inherit;
}
</style>

<style scoped>
.heading {
    display: flex;
}

.autotype-heading {
    text-decoration: underline;
    text-decoration-color: var(--primary);
}
</style>