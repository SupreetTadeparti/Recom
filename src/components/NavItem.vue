<script setup>

const props = defineProps({ url: String, text: String })

</script>

<template>
    <RouterLink class="nav__item" :to="url" v-bind:class="{ active: isActive(url) }">{{ text }}</RouterLink>
    <!-- <div class="nav__item" v-bind:class="{ active: isActive(url) }">{{ text }}</div> -->
</template>

<script>
export default {
    methods: {
        isActive(routeUrl) {
            return this.$route.fullPath === routeUrl;
        }
    }
};
</script>

<style scoped>
.nav__item {
    width: max-content;
    margin: 0 auto;
    cursor: pointer;
    padding: .75em;
    font-size: 1.2em;
    text-decoration: none;
}

.nav__item.active {
    width: 100%;
    border-left: 4px solid var(--primary);
    color: var(--accent);
    background-color: var(--secondary);
    text-align: center;
}
</style>