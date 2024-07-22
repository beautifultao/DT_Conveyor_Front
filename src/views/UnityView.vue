<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import sideRibbon from '@/components/SideRibbon.vue'
import lineChart from '@/components/lines/LineChart.vue'

onMounted(() => {
    // resizeCanvas();
    const script = document.createElement('script');
    script.onload = () => {
        // eslint-disable-next-line no-undef
        createUnityInstance(document.querySelector("#unity-canvas"), {
            dataUrl: "/Unity/Build/Unity_Webgl.data.unityweb",
            frameworkUrl: "/Unity/Build/Unity_Webgl.framework.js.unityweb",
            codeUrl: "/Unity/Build/Unity_Webgl.wasm.unityweb",
            streamingAssetsUrl: "StreamingAssets",
            companyName: "DefaultCompany",
            productName: "Carring",
            productVersion: "0.1",
            //matchWebGLToCanvasSize: false, // Uncomment this to separately control WebGL canvas render size and DOM element size.
            // devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
        }).then((instance) => {
            // setting this allows the usage of "window.gameInstance" in jslib plugins inside Unity
            // it also sets up a simple shortcut we can use to provide a path into Unity from vue
            window.gameInstance = instance;
        });
    };
    script.async = true;
    script.src = '/Unity/Build/Unity_Webgl.loader.js';
    document.head.appendChild(script);
});
onBeforeUnmount(() => {
    if (window.gameInstance) {
        window.gameInstance.Quit();
        window.gameInstance = null;
    }
})
</script>

<template>
    <div class="app">
        <canvas id="unity-canvas"></canvas>
        <div class="border-top">
            <div class="title">皮带秤数字孪生系统</div>
            <img src="../assets/img/header.png" style="height: 100%; width: 100%;" />
        </div>
        <div class="border-left">
            <img src="../assets/img/left.png" style="height: 100%; width: 100%;" />
        </div>
        <div class="border-right">
            <img src="../assets/img/right.png" style="height: 100%; width: 100%;" />
        </div>
        <div class="border-bottom">
            <img src="../assets/img/bottom.png" style="height: 100%; width: 100%;" />
        </div>
        <div class="side-ribbon">
            <sideRibbon />
        </div>
        <div class="chart">
            <lineChart />
        </div>
    </div>
</template>

<style scoped>
#unity-canvas {
    width: 100%;
    height: 100%;
    position: fixed;
    background: #808080;
    /* z-index: -1; */
}
.border-top {
    position: relative;
        top: 0;
        left: 0;
        width: 100%;
        height: 100px;
    .title{
        position: absolute;
            top: 25px;
            left: 160px;
            color: aliceblue;
            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            font-size: 40px;
            font-weight: bold;
            font-style: italic;
    }
}
.border-left {
    position: absolute;
    top: 100px;
    height: 88%;
}

.border-right {
    position: absolute;
    top: 3%;
    right: 0;
    height: 93%;
}

.border-bottom {
    position: absolute;
    width: 100%;
    bottom: 0;
}

.side-ribbon{
    position: fixed;
    top: 30px;
    right: 30px;
    z-index: 2;
}

.chart{
    position: fixed;
    bottom: 30px;
    left: 30px
}
</style>