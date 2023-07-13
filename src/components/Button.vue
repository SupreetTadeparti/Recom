<script setup>
const props = defineProps({ text: String, type: String, thin: Boolean })
</script>

<template>
    <button :type="type" class="btn" :class="{ thin: thin }">{{ text }}</button>
</template>

<style scoped>
.btn {
    border: none;
    background-color: var(--primary);
    padding: 0.75em 2em;
    color: white;
    border-radius: 0.25em;
    font-size: 1.2em;
    cursor: pointer;
    transition: transform 100ms ease-out;
    position: relative;
}

.btn.thin {
    padding: .5em 2em;
}

.btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: color-mix(in srgb, var(--primary), transparent 40%);
    filter: blur(5px);
    transition: transform 100ms ease-out;
    border-radius: 0.25em;
    transform-origin: top;
    z-index: -1;
}

.btn:hover {
    transform: scale(1.02);
}

.btn:hover::before {
    transform: scale(1.02, 1.05);
}
</style>