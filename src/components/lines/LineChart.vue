<script setup>
import { lineChartOption } from './js/lineChartOption.js' 
import * as echarts from "echarts"
import { ref,onMounted,onBeforeUnmount } from 'vue'
import socket from '@/utils/socketio/socketio'
import { startCollection, stopCollection } from '@/utils/axios/request'

let lineChart = null;
let intervalId;

// 折线图数据容器
const chartData = ref([
    { time: new Date(), value: 0 },
]);

// socketio接收数据
const receivedData = ref(0);

const connectToServer = () => {
    socket.connect();
    socket.on('lineData', (data) => {
        receivedData.value = data;
        addData(data);
    });
};

// 关闭socketio后续工作
const closeSocket = () => {
    socket.disconnect();
    socket.off('lineData');
    socket.off("connect");
    socket.off("connect_error");
    socket.off("disconnect");
};

// 初始化折线图
const initLineChart = () => {
    const chartDom = document.getElementById('LineChart');
    if (chartDom) {
        lineChart = echarts.init(chartDom);

        const option = { ...lineChartOption };
        option.series[0].data = chartData.value.map(item => [item.time, item.value]);

        lineChart.setOption(option);
        window.addEventListener('resize', resizeChart);
    }
};

// 动态调整折线图大小
const resizeChart = () => {
    if (lineChart) {
        lineChart.resize();
    }
};
const addData = (data) => {
    // const newData = { time: new Date(), value: Math.floor(Math.random() * 200) + 50 };
    const newData = { time: new Date(), value: data };
    chartData.value.push(newData);

    const option = { ...lineChartOption };

    const currentZoom = lineChart.getOption().dataZoom[0];
    option.series[0].data = chartData.value.map(item => [item.time, item.value]);


    option.dataZoom = [{
        type: 'slider',
        height: 20,
        bottom: 10,
        start: currentZoom.start,
        end: currentZoom.end,
    }];

    lineChart.setOption(option);
};

onMounted(() => {
    initLineChart();
    // intervalId = setInterval(addData, 2000);
    // connectToServer();
})
onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeChart);
    clearInterval(intervalId);

    if(socket.active){
        closeSocket();
    }
});
</script>

<template>
    <div class="lineChart-content">
        <div class="lineChart-description">
            <span class="lineChart-text">当前输送流量</span>
            <div class="lineChart-value">{{ receivedData }}</div>
            <div class="control-btn">
                <el-button class="btn" @click="startCollection">开始收集</el-button>
                <el-button class="btn" @click="stopCollection">停止收集</el-button>
            </div>
        </div>
        <div id="LineChart"></div>
    </div>
</template>

<style scoped>
.lineChart-content {
    display: flex;
    color: aliceblue;
    width: 1250px;
    height: 350px;
    border-radius: 10px;
    background: linear-gradient(to bottom, rgba(21, 32, 43, 0.5), rgba(9, 16, 24, 0.7));
    .lineChart-description {
        width: 20%;
        height: 100%;

        .lineChart-text {
            position: absolute;
            top: 30px;
            left: 20px;
            font-size: 29px;
            letter-spacing: 0.2em;
        }

        .lineChart-value {
            position: absolute;
            top: 120px;
            left: 100px;
            font-size: 60px;
            text-shadow: 0 0 10px #0077cc;
        }

        .lineChart-value::after {
            content: "kg/min";
            position: absolute;
            bottom: 5%;
            left: 100%;
            margin-left: 20px;
            font-size: 20px;
        }
        .control-btn{
            position: absolute;
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 20%;
            height: 60px;
            left: 10px;
            bottom: 30px;
            /* border: red 1px solid; */
        }
        .btn{
            width: 100px;
            height: 50px;
            background: linear-gradient(#6c81a3,
                    #1e4e70,
                    #032f5a);
            font-size: larger;
            border-radius: 10px;
            color: #cacbd6;
            font-weight: 800;
            transition: all 0.1s ease-in-out;
            cursor: pointer;
        }
    }
}
#LineChart {
    width: 80%;
    height: 100%;
}
</style>
