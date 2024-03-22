<script setup lang="ts">
import { RouterView } from "vue-router"
import Loading from "@c/Loading.vue"
import Switch from "@c/Switch.vue"

</script>

<template>
    <Loading />
    <Switch />
    <section>
        <RouterView />
    </section>
</template>

<style scoped>
section {
    height: 100vh;
    overflow: auto;
}
</style>

<style>
</style>
