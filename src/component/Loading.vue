<script setup>
import Genshin from "@c/Loading/Genshin.vue"
import Mojang from "@c/Loading/Mojang.vue"
import { ref } from "vue"

const hide = ref(false)
function close() {
    hide.value = true
}

const select = Math.ceil(Math.random()*2)
</script>


<template>
    <section v-if="!hide">
        <Genshin v-if="select===1" @close="close" />
        <Mojang v-else-if="select===2" @close="close" />
    </section>
</template>

<style scoped>
section {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10000;
}
</style>