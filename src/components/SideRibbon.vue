<script setup>
import { Odometer, Box, Setting } from "@element-plus/icons-vue";
import { ref, onMounted, onBeforeUnmount } from "vue";
import paramSetting from "@/components/MarqueeParam.vue"
import socket from '@/utils/socketio/socketio'
import { turnONConveyor, turnOFFConveyor, turnONFeeder, turnOFFFeeder,
    changeConveyorSpeed, changeFeederSpeed } from '@/utils/axios/request'

const currentTime = ref("");
const currentData = ref("");
const timeID = ref(null);

const feederIsOn = ref(false);
const conveyorIsOn = ref(false);

const showParam =ref(false)         // 显示参数设置面板

const conveyor_speed = ref(0)       // 皮带速度
const feeder_speed = ref(0)         // 供料速度
const conveying_capacity = ref(0);  // 累计输送量

const turnOnConveyor = () => {
    conveyorIsOn.value = true;
    turnONConveyor();
};

const turnOffConveyor = () => {
    conveyorIsOn.value = false;
    turnOFFConveyor();
};

const turnOnFeeder = () => {
    feederIsOn.value = true;
    turnONFeeder();
};

const turnOffFeeder = () => {
    feederIsOn.value = false;
    turnOFFFeeder();
};


// 监控皮带滑块抬起动作
const onConveyorChange = (value) => {
    changeConveyorSpeed(value)
};

// 监控供料滑块抬起动作
const onFeederChange = (value) => {
    changeFeederSpeed(value)
};



// 获取当前时间
const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return `${hours}:${minutes}:${seconds}`;
};

// 获取当前日期
const formatDate = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    return `${year}-${month}-${day}`;
};

timeID.value = setInterval(() => {
    currentTime.value = formatTime(new Date());
    currentData.value = formatDate(new Date());
}, 1000)

onMounted(() => {
    if(socket.active){
        socket.on('volumeData', (data) => {
            conveying_capacity.value = data
        });
    }
})

onBeforeUnmount(() => {
    clearInterval(timeID.value);
    timeID.value = null;
})

const onSetting = () => {
    showParam.value = true
}
</script>

<template>
    <div class="app">
        <div class="time" style="font-size: 25px;">
            <span style="color: #6d8991; margin-right: 5px">时间:</span>
            {{ currentTime }}
            <span style="margin-left: 40px; font-size: 25px;">|</span>
            <span style="color: #6d8991; margin-right: 5px;margin-left: 30px;">日期:</span>
            {{ currentData }}
        </div>
        <div class="info" style="height: 300px;">
            <div class="child-title">
                <img src="../assets/img/partial-title.png" style="width: 100%;" />
                <span class="info-title">交互功能</span>
            </div>
            <div class="info-content">
                <div class="function">
                    <div class="function-item">
                        <span class="function-title">皮带控制</span>
                        <div class="function-btn">
                            <button :class="['btn-on', { pressed: conveyorIsOn }]" @click="turnOnConveyor"
                                :disabled="conveyorIsOn">启动</button>
                            <button class="btn-off" @click="turnOffConveyor">关闭</button>
                        </div>
                        <div class="function-slider">
                            <div class="slider-tip">
                                <span>min</span>
                                <span>max</span>
                            </div>
                            <el-slider :max="3" :step="0.01" style="width: 220px;" v-model="conveyor_speed"
                                @change="onConveyorChange" />
                        </div>
                    </div>
                    <div class="function-item">
                        <span class="function-title">给料控制</span>
                        <div class="function-btn">
                            <button :class="['btn-on', { pressed: feederIsOn }]" :disabled="feederIsOn" @click="turnOnFeeder">启动</button>
                            <button class=" btn-off" @click="turnOffFeeder">关闭</button>
                        </div>
                        <div class="function-slider">
                            <div class="slider-tip">
                                <span>min</span>
                                <span>max</span>
                            </div>
                            <el-slider :max="3" :step="0.01" style="width: 220px;" v-model="feeder_speed"
                                @change="onFeederChange" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="info" style="height: 300px;">
            <div class="child-title">
                <img src="../assets/img/partial-title.png" style="width: 100%;" />
                <span class="info-title">运行状态监测</span>
            </div>
            <div class="info-content">
                <div class="status">
                    <div class="status-item">
                        <el-icon class="icon">
                            <Odometer />
                        </el-icon>
                        <span>皮带速度:</span>
                        <span class="status-value">{{ conveyor_speed }}</span>
                        <span class="unit">m/s</span>
                    </div>
                    <div class="status-item">
                        <el-icon class="icon">
                            <Odometer />
                        </el-icon>
                        <span>供料速度:</span>
                        <span class="status-value">{{ feeder_speed }}</span>
                        <span class="unit">m³/s</span>
                    </div>
                    <div class="status-item">
                        <el-icon class="icon">
                            <Box />
                        </el-icon>
                        <span>累计运输量:</span>
                        <span class="status-value">{{ conveying_capacity }}</span>
                        <span class="unit">m³</span>
                    </div>
                    <div class="status-item" @click="onSetting" style="cursor: pointer;">
                        <el-icon class="icon">
                            <Setting />
                        </el-icon>
                        <span>设备参数修改</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="info" style="height: 330px;">
            <div class="child-title">
                <img src="../assets/img/partial-title.png" style="width: 100%;" />
                <span class="info-title">相机画面</span>
            </div>
            <div class="info-content" style="background-color: black;">
                <!-- TODO:网络相机画面，待设置 -->

            </div>
        </div>
    </div>
    <div class="param-container" v-if="showParam">
        <paramSetting @closeSetting="showParam=false"></paramSetting>
    </div>
</template>

<style scoped>
.app{
    height: 1000px;
    width: 580px;
    background: linear-gradient(to right, rgba(21, 32, 43, 0.5), rgba(9, 16, 24, 0.7));
}
.time{
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    color: #8aebff;
    margin: 10px 0;
    height: 5%;
}
.info{
    position: relative;
    display: flex;
    flex-direction: column;
    color: aliceblue;
    /* border: red solid 1px; */
    .info-title{
        position: absolute;
        margin-top: 3px;
        left: 100px;
        font-size: 23px;
        letter-spacing: 1em;
        
    }
    .info-content{
        flex-grow: 1;
        /* border: pink solid 1px; */
        display: flex;
        justify-content: space-around;
        .function{
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(1, 1fr);
            width: 100%;
            padding: 10px;
            .function-item{
                display: flex;
                flex-direction: column;
                align-items: center;;
                justify-content: space-around;
                .function-title{
                    font-size: 25px;
                    letter-spacing: 0.3em;
                    font-family:'Times New Roman', Times, serif
                }
                .function-btn{
                    display: flex;
                    width: 100%;
                    height: 80px;
                    justify-content: space-around;
                }
                .slider-tip{
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
        .function-control .el-button {
            margin: 0;
            height: 50px;
            width: 100px;
            border: 2px solid #507286;
            font-size: 18px;
            color: #64e9f3;
            background-color: #0a0a23;
        }
        .status{
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(2, 1fr);
            width: 100%;
            padding: 10px;
            .status-item{
                display: flex;
                align-items: center;
                /* justify-content: space-between; */
                margin: 10px;
                border: 2px solid;
                border-image: linear-gradient(to bottom, #2f5875, #68b7cc) 1;
                font-size: 20px;
                .status-value{
                    font-size: 30px;
                    /* margin-left: 15px; */
                    width: 45px;
                    text-shadow: 0 0 10px #0077cc;
                }
                .unit{
                    margin-left: 15px;
                }
                .icon{
                    font-size: 40px;
                    margin: 0 10px;
                }
            }

        }
    }
}

.param-container{
    position: absolute;
    top: 100px;
    left: -60px;
}

.btn-on {
    width: 80px;
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

.btn-on:hover {
    box-shadow: 0 0 10px #5a7ca3;
}

.pressed {
    box-shadow: inset 0 0 10px #000;
    cursor: not-allowed;
    opacity: 0.8;
}
.btn-off {
    width: 80px;
    background: linear-gradient(#a36c6c,
            #701e1e,
            #5a0303);
    font-size: larger;
    border-radius: 10px;
    color: #cacbd6;
    font-weight: 800;
    transition: all 0.1s ease-in-out;
    cursor: pointer;
}

.btn-off:hover {
    box-shadow: 0 0 10px #7c3e3e;
}

:deep(.el-slider__button) {
    width: 10px;
    border-radius: 3px;
}
:deep(.el-slider__bar) {
    background-image: linear-gradient(to right, rgba(32, 66, 83, 0.3), rgba(191, 234, 249, 0.8));
}
</style>
