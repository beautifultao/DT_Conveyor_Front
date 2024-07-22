<script setup>
import { ref } from 'vue';
import router from '@/router/index'
import historyIcon from '@/assets/icon/history.svg'
import saveIcon from '@/assets/icon/save.svg'
import closeIcon from '@/assets/icon/close.svg'
import { setPLCApi,setCameraApi,setReconstructionApi, setParamsApi} from '@/utils/axios/request'
import plcTable from './tables/PLCTable.vue'
import cameraTable from './tables/CameraTable.vue'
import reconstructionTable from './tables/ReconstructionTable.vue'

// TODO:其他参数
const show_plc_param = ref(false);
const show_camera_param = ref(false);
const show_reconstruction_param = ref(false);


const plc_param = ref([
    { label: 'IP地址:', val: '', placeholder: '请输入IP地址' },
    { label: '端口号:', val: '', placeholder: '请输入端口号' },
    { label: '设备ID:', val: '', placeholder: '请输入设备ID' },
    { label: '寄存器地址:', val: '', placeholder: '请输入寄存器地址' }
]);

const camera_param = ref([
    { label: '用户名:', val: '', placeholder: '请输入用户名' },
    { label: '密码:', val: '', placeholder: '请输入密码' },
    { label: 'IP地址:', val: '', placeholder: '请输入IP地址' },
    { label: '端口号:', val: '', placeholder: '请输入端口号' },
    { label: '视频编码格式:', val: '', placeholder: '请输入视频编码格式' },
    { label: '视频通道:', val: '', placeholder: '请输入视频通道' },
    { label: '码流类型:', val: '', placeholder: '请输入码流类型' }
]);

const reconstruction_param = ref([
    { label: '高斯滤波搜索半径:', val: '', placeholder: '请输入参数1' },
    { label: '高斯权重_X:', val: '', placeholder: '请输入参数2' },
    { label: '高斯权重_Y:', val: '', placeholder: '请输入参数3' },
    { label: '体素网格边长:', val: '', placeholder: '请输入参数4' },
    { label: '插值间隔阈值:', val: '', placeholder: '请输入参数5' },
    { label: '网格重建搜索半径:', val: '', placeholder: '请输入参数6' },
    { label: '网格重建最大临点数:', val: '', placeholder: '请输入参数7' },
]);

const rader_param = ref([
    { label: '参数1:', val: '', placeholder: '请输入参数1' },
    { label: '参数2:', val: '', placeholder: '请输入参数2' },
    { label: '参数3:', val: '', placeholder: '请输入参数3' },
    { label: '参数4:', val: '', placeholder: '请输入参数4' },
    { label: '参数5:', val: '', placeholder: '请输入参数5' },
    { label: '参数6:', val: '', placeholder: '请输入参数6' },
    { label: '参数7:', val: '', placeholder: '请输入参数7' },
    { label: '参数8:', val: '', placeholder: '请输入参数8' }
]);




// 保存PLC配置
const setPLCParam = async () => {
    await setPLCApi({
        ipAddress: plc_param.value[0].val,
        port: parseInt(plc_param.value[1].val),
        deviceId: parseInt(plc_param.value[2].val),
        registerAddress: parseInt(plc_param.value[3].val)
    }).then(() => {
        console.log('设置成功');
    }).catch((error) => {
        console.log('设置失败',error);
    });
}

// 选择plc历史参数
const selectPLCParam = (row) => {
    const rowData = [row.ipAddress, row.port, row.deviceId, row.registerAddress]
    plc_param.value.forEach((item, index) => {
        item.val = rowData[index]
    })
    show_plc_param.value = false;
}

// 保存网络相机配置
const setCameraParam = async () => {
    await setCameraApi({
        username: camera_param.value[0].val,
        password: camera_param.value[1].val,
        ipAddress: camera_param.value[2].val,
        port: parseInt(camera_param.value[3].val),
        videoType: camera_param.value[4].val,
        channel: camera_param.value[5].val,
        streamType: camera_param.value[6].val
    }).then(() => {
        console.log('设置成功');
    }).catch((error) => {
        console.log('设置失败',error);
    });
}

// 选择网络相机历史参数
const selectCameraParam = (row) => {
    const rowData = [row.username, row.password, row.ipAddress, row.port, row.videoType, row.channel, row.streamType]
    camera_param.value.forEach((item, index) => {
        item.val = rowData[index]
    })
    show_camera_param.value = false;
}

// 保存重建参数
const setReconstructionParam = async () => {
    await setReconstructionApi({
        gaussianSearchRadius: parseFloat(reconstruction_param.value[0].val),
        gaussianSigmaWeightX: parseFloat(reconstruction_param.value[1].val),
        gaussianSigmaWeightY: parseFloat(reconstruction_param.value[2].val),
        voxelSize: parseFloat(reconstruction_param.value[3].val),
        distanceThreshold: parseFloat(reconstruction_param.value[4].val),
        triangulationSearchRadius: parseFloat(reconstruction_param.value[5].val),
        maxNearestNeighbors: parseInt(reconstruction_param.value[6].val)
    }).then(() => {
        console.log('设置成功');
    }).catch((error) => {
        console.log('设置失败',error);
    });
}

// 选择重建历史参数
const selectReconstructionParam = (row) => {
    console.log(row)
    const rowData = [row.gaussianSearchRadius,row.gaussianSigmaWeightX,row.gaussianSigmaWeightY,row.voxelSize,
        row.distanceThreshold,row.triangulationSearchRadius,row.maxNearestNeighbors]

    reconstruction_param.value.forEach((item, index) => {
        item.val = rowData[index]
    })
    show_reconstruction_param.value = false;
}


// TODO:自定义所有发送给后端的配置参数数据,进行热更新
const convertParamsToDTO = (reconstructionParam) => {
    const reconstructionParamDTO = {
        gaussianSearchRadius: parseFloat(reconstructionParam[0].val),
        gaussianSigmaWeightX: parseFloat(reconstructionParam[1].val),
        gaussianSigmaWeightY: parseFloat(reconstructionParam[2].val),
        voxelSize: parseFloat(reconstructionParam[3].val),
        distanceThreshold: parseFloat(reconstructionParam[4].val),
        triangulationSearchRadius: parseFloat(reconstructionParam[5].val),
        maxNearestNeighbors: parseInt(reconstructionParam[6].val)
    };



    return {
        reconstructionParam: reconstructionParamDTO
    };
};
const setParam = async () => {
    // router.push('/')
    closeSetting();
    // TODO: 发送请求到后端
    const params = convertParamsToDTO(reconstruction_param.value);
    await setParamsApi(params)
        .then((res) => {
            console.log('设置成功'+ res.data);
            router.push('/')
        }).catch(() => {
            console.log('设置失败');
        });
}

const emit = defineEmits(['closeSetting'])

const closeSetting = () => {
    emit('closeSetting');
};
function handleInput(event) {
  // Log input events to see if they are being fired
    console.log(event);
}
</script>

<template>
    <div class="block">
        <el-card style="width: 100%; height: 100%;">
            <template #header>
                <div class="card-header"
                    style="height: 35px; display: flex; align-items: center;justify-content: space-between;">
                    <span style="line-height: 35px; font-weight: 700;font-size: 25px;">参数配置</span>
                    <img :src="closeIcon" alt="close Icon" @click="closeSetting" class="icon"
                        style="width: 30px;height: 30px;cursor: pointer;" />
                </div>
            </template>
            <el-carousel height="450px" arrow="never" :autoplay="false">
                <!-- 分页1 -->
                <el-carousel-item>
                    <div class="param-group">
                        <div class="param-container">
                            <div class="param-container-header">
                                <span class="param-name">PLC设备参数</span>
                                <el-button text @click="show_plc_param = !show_plc_param" class="custom-button">
                                    <img :src="historyIcon" alt="history Icon" class="icon"
                                        style="width: 30px;height: 30px;" />
                                    历史参数</el-button>
                                <el-button text @click="setPLCParam" class="custom-button">
                                    <img :src="saveIcon" alt="Save Icon" class="icon"
                                        style="width: 25px;height: 25px;" />
                                    保存此配置</el-button>
                            </div>
                            <div class="params">
                                <div class="param" v-for="(param, index) in plc_param" :key="index">
                                    <span>{{ param.label }}</span>
                                    <el-input v-model="param.val" :placeholder="param.placeholder"
                                        @input="handleInput"></el-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-carousel-item>

                <!-- 分页2 -->
                <el-carousel-item>
                    <div class="param-group">
                        <div class="param-container">
                            <div class="param-container-header">
                                <span class="param-name">网络相机设备参数</span>
                                <el-button text @click="show_camera_param = !show_camera_param" class="custom-button">
                                    <img :src="historyIcon" alt="history Icon" class="icon"
                                        style="width: 30px;height: 30px;" />
                                    历史参数</el-button>
                                <el-button text @click="setCameraParam" class="custom-button">
                                    <img :src="saveIcon" alt="Save Icon" class="icon"
                                        style="width: 25px;height: 25px;" />
                                    保存此配置</el-button>
                            </div>
                            <div class="params">
                                <div class="param" v-for="(param, index) in camera_param" :key="index">
                                    <span>{{ param.label }}</span>
                                    <el-input v-model="param.val" :placeholder="param.placeholder"></el-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-carousel-item>

                <!-- 分页3 -->
                <el-carousel-item>
                    <div class="param-group">
                        <div class="param-container">
                            <div class="param-container-header">
                                <span class="param-name">网格重建算法参数</span>
                                <el-button text @click="show_reconstruction_param = !show_reconstruction_param"
                                    class="custom-button">
                                    <img :src="historyIcon" alt="history Icon" class="icon"
                                        style="width: 30px;height: 30px;" />
                                    历史参数</el-button>
                                <el-button text @click="setReconstructionParam" class="custom-button">
                                    <img :src="saveIcon" alt="Save Icon" class="icon"
                                        style="width: 25px;height: 25px;" />
                                    保存此配置</el-button>
                            </div>
                            <div class="params">
                                <div class="param" v-for="(param, index) in reconstruction_param" :key="index">
                                    <span>{{ param.label }}</span>
                                    <el-input v-model="param.val" :placeholder="param.placeholder"></el-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-carousel-item>

                <!-- 分页4 -->
                <el-carousel-item>
                    <div class="param-group">
                        <div class="param-container">
                            <div class="param-container-header">
                                <span class="param-name">激光雷达设备参数</span>
                                <el-button text class="custom-button">
                                    <img :src="historyIcon" alt="history Icon" class="icon"
                                        style="width: 30px;height: 30px;" />
                                    历史参数</el-button>
                                <el-button text class="custom-button">
                                    <img :src="saveIcon" alt="Save Icon" class="icon"
                                        style="width: 25px;height: 25px;" />
                                    保存此配置</el-button>
                            </div>
                            <div class="params">
                                <div class="param" v-for="(param, index) in rader_param" :key="index">
                                    <span>{{ param.label }}</span>
                                    <el-input v-model="param.val" :placeholder="param.placeholder"></el-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-carousel-item>
            </el-carousel>
            <template #footer>
                <div class="footer">
                    <el-button @click="setParam">完成</el-button>
                </div>
            </template>
        </el-card>
    </div>

    <!-- TODO:添加相关配置表格 -->
    <div class="history-param">
        <plcTable @selectPLCRaw="selectPLCParam" @closePLCTable="show_plc_param = false" v-if="show_plc_param" />
        <cameraTable @selectCameraRaw="selectCameraParam" @closeCameraTable="show_camera_param = false"
            v-if="show_camera_param" />
        <reconstructionTable @selectReconstructionRaw="selectReconstructionParam"
            @closeReconstructionTable="show_reconstruction_param=false" v-if="show_reconstruction_param" />
    </div>
</template>

<style scoped>
.param-container {
    margin: 15px;
    max-height: 410px;
    
}
.param-container-header{
    display: flex; 
    justify-content: space-between; 
    align-items: center
}

.param-name{
    margin-right: 10px;
    font-weight: 600;
    font-size: 20px;
}

.param-container>span:first-child {
    font-family: 'Arial',
        sans-serif;
    font-size: 16px;
    font-weight: bold;
    color: #333333;
}
.params{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 20px;
    max-height: 410px;
}
.param {
    margin: 20px 10px;
    max-width: 180px;
}
.param span {
    color:#475669;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
}
.block{
    height: 630px;
    width: 500px;
    /* border: red 2px solid; */
}
.history-param {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-20%, 50%);
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12); 
    background-color: white;
    max-width: 900px;
    border-radius: 5px;
}
.param-table {
    margin: 15px;
    border: #ebeef5 1px solid;
    height: 300px;
    /* overflow: hidden; */
}


.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    /* background-color: #8baad4; */
    background-color: #dcdcdc;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #eeeeee;
}

:deep(.el-carousel__button) {
    background-color: rgb(19, 19, 21);
}
</style>@/utils/axios/request