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
    width.value += Math.floor(Math.random()*20) + 3
    if ( width.value > 94.2 ) {
        clearInterval(timer)
        width.value = 94.2
        animation_finish = true
        Hide()
    }
}, 475)

const style = ref({
    opacity: 1
})

async function Hide() {
    if ( !load_finish || !animation_finish ) return

    await sleep(700)
    width.value = 100
    await sleep(400)
    style.value = {
        opacity: 0
    }
    await sleep(600)
    emit("close")
}

</script>


<template>
<section :style="style">
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
    background: #fff;
    transition: opacity 600ms ease;
}

.background {
    width: 56vmin;
    height: 7vmin;
    mask-image: url("@a/image/loading/genshin/loading.svg");
    -webkit-mask-image: url("@a/image/loading/genshin/loading.svg");
    background-color: #f5f5f5;
}

.fill {
    height: 100%;
    background-color: #666666;
    transition: width 400ms linear;
}
</style>