<script setup>
import { ref, inject } from "vue"

let first = true


inject("ShowSwitchAnimation").run = Start
function Start(next) {
    if (first == true) {
        first = false
        next()
        return
    }

    // 开始动画
    animation_start(() => {
        // 动画入场完毕的回调函数
        // 路由切换
        next()
        // 等待加载完成
        let timer = setInterval(() => {
            if ( document.readyState == "complete" ) {
                clearInterval(timer)
                // 停止动画
                animation_stop()
            }
        }, 100)
    })
}

const show = ref(false)
const className = ref([])
let should_end = false

async function animation_start(finish) {
    should_end = false
    className.value = []

    show.value = true
    loading_text = get_loading_text()
    setTimeout(() => {
        finish()
        animation_run()
    }, 850+in_delay*5)
}

const in_delay = 50

function animation_run() {

    let timer = setInterval(() => {
        if ( should_end == true ) {
            clearInterval(timer)
            // 停止动画
            animation_end()
        }
    }, 100)
    
}

function animation_stop() {
    should_end = true
}

function animation_end() {
    className.value.push("hide")

    setTimeout(() => {
        show.value = false
    }, 850+in_delay*4)

}


const loading_text_list = [
    "正在加载了喵",
    "全力加载中",
    "正在连接到服务器",
    "加载地形中",
    "加入世界中",
    "通讯加密中"

]

function get_loading_text() {
    return loading_text_list[Math.floor(Math.random()*loading_text_list.length)]
}

let loading_text

</script>


<template>
<section v-if="show" :class="className">
    <div class="plane"></div>
    <div class="plane"></div>
    <div class="plane"></div>
    <div class="plane"></div>
    <div class="container">
        <div class="content">
            <img src="@a/image/logo.svg" alt="">
            <p>{{ loading_text }}</p>
        </div>
    </div>
</section>
</template>


<style scoped lang="scss">
section {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    z-index: 10000;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;

    .content {
        animation: 2500ms cubic-bezier(.09,.71,.44,1) zoom_out forwards;
        @keyframes zoom_out {
            from {
                transform: scale(1);
            }
            to {
                transform: scale(1.3);
            }
        }

        img {
            width: 75vmin;
        }

        p {
            text-align: center;
            font-weight: lighter;
            letter-spacing: 0.5em;
            font-size: 1.6vmin;
        }
    }

}


$clip-path: 0 0, -100vh 100vh, 100vw 100vh, calc(100vw + 100vh) 0;
$clip-path-left: polygon(nth($clip-path, 1), nth($clip-path, 2), nth($clip-path, 2), nth($clip-path, 1));
$clip-path-full: polygon(nth($clip-path, 1), nth($clip-path, 2), nth($clip-path, 3), nth($clip-path, 4));
$clip-path-right: polygon(nth($clip-path, 4), nth($clip-path, 3), nth($clip-path, 3), nth($clip-path, 4));

.plane, .container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    clip-path: $clip-path-left;
    -webkit-clip-path: $clip-path-left;
    animation: 850ms ease-in-out forwards in;
    $delay: 50ms;

    .hide & {
        clip-path: $clip-path-full;
        -webkit-clip-path: $clip-path-full;
        animation: 850ms ease-in-out forwards out;
    }

    &:nth-child(1) {
        background: rgb(152, 193, 30, 0.3);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        animation-delay: $delay*0;
        .hide & {
            animation-delay: $delay*4;
        }
    }

    &:nth-child(2) {
        background: rgba(105, 170, 36, 0.5);
        animation-delay: $delay*1;
        .hide & {
            animation-delay: $delay*3;
        }
    }

    &:nth-child(3) {
        background: rgba(79, 193, 157, 0.7);
        animation-delay: $delay*2;
        .hide & {
            animation-delay: $delay*2;
        }
    }

    &:nth-child(4) {
        background: rgba(72, 139, 198, 0.9);
        animation-delay: $delay*3;
        .hide & {
            animation-delay: $delay*1;
        }
    }
    
    &:nth-child(5) {
        background-color: #a7938e;
        background-image: url(@a/image/dot.svg);
        background-size: 30px;
        animation-delay: $delay*4;
        .hide & {
            animation-delay: $delay*0;
        }
    }

    @keyframes in {
        from {
            clip-path: $clip-path-left;
            -webkit-clip-path: $clip-path-left;
        }
        to {
            clip-path: $clip-path-full;
            -webkit-clip-path: $clip-path-full;
        }
    }

    @keyframes out {
        from {
            clip-path: $clip-path-full;
            -webkit-clip-path: $clip-path-full;
        }
        to {
            clip-path: $clip-path-right;
            -webkit-clip-path: $clip-path-right;
        }
    }

}

</style>