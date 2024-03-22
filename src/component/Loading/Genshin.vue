<script setup>
import { ref } from "vue"

const show = ref(true)
const hide = ref(true)

function Hide() {
    show.value = false
    console.log("hide loading")
    setTimeout(() => {
        hide.value = false
    }, 5000)
}

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") Hide()
})

</script>


<template>
<section v-if="show"></section>
</template>


<style scoped>
section {
    background: #fff;
    opacity: 1;
    clip-path: circle(100%);
    transition: clip-path 1000ms cubic-bezier(.43,.03,.35,.95), opacity 500ms cubic-bezier(.64,.01,.7,.55) 200ms;
    z-index: 10000;
}

.show {
    opacity: 0;
    clip-path: circle(0%);
}
</style>