<script setup>
import { ref } from "vue"
import sleep from "@u/sleep"

const emit = defineEmits(["close"])

let load_finish = false
document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        load_finish = true
        Hide()
    }
})

let width = ref(0)

let animation_finish = false
const timer = setInterval(() => {
    width.value += (92 - width.value) / 5
    console.log(width.value)
    if ( width.value > 90 ) {
        clearInterval(timer)
        animation_finish = true
        Hide()
    }
}, 300)

const opacity = ref(1)

async function Hide() {
    if ( !load_finish || !animation_finish ) return
    await sleep(500)
    width.value = 100
    opacity.value = 0
    await sleep(800)
    emit("close")
}

</script>


<template>
<section :style="{ opacity: opacity }">
    <div class="logo"></div>
    <div class="background">
        <div class="fill" :style="{ width: width+'%' }"></div>
    </div>
</section>
</template>


<style scoped>
section {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ef323d;
    transition: opacity 800ms ease;
}

.logo {
    position: relative;
    /* top: -4vmin; */
    width: 50vmin;
    height: 10vmin;
    background-image: url(@a/image/loading/mojang/MOJANG.svg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}

.background {
    position: absolute;
    bottom: 10vh;
    width: min(75%, calc(100vw - 100px));
    height: max(3vmin, 15px);
    padding: 2px;
    box-sizing: border-box;
    border: #ffffff solid 2px;
}

.fill {
    height: 100%;
    background-color: #ffffff;
    transition: width ease-out 400ms;
}
</style>