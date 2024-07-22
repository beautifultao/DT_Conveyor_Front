<script setup>
import closeIcon from '@/assets/icon/close.svg'
import historyIcon from '@/assets/icon/history.svg'
import saveIcon from '@/assets/icon/save.svg'
import { ref } from 'vue';


const param_type1 = ref([
    { label: '参数1:', value: '', placeholder: '请输入参数1' },
    { label: '参数2:', value: '', placeholder: '请输入参数2' },
    { label: '参数3:', value: '', placeholder: '请输入参数3' },
    { label: '参数4:', value: '', placeholder: '请输入参数4' }
]);
const param_type2 = ref([
    { label: '参数1:', value: '', placeholder: '请输入参数1' },
    { label: '参数2:', value: '', placeholder: '请输入参数2' },
    { label: '参数3:', value: '', placeholder: '请输入参数3' },
    { label: '参数4:', value: '', placeholder: '请输入参数4' }
]);
const param_type3 = ref([
    { label: '参数1:', value: '', placeholder: '请输入参数1' },
    { label: '参数2:', value: '', placeholder: '请输入参数2' },
    { label: '参数3:', value: '', placeholder: '请输入参数3' },
    { label: '参数4:', value: '', placeholder: '请输入参数4' }
]);
const param_type4 = ref([
    { label: '参数1:', value: '', placeholder: '请输入参数1' },
    { label: '参数2:', value: '', placeholder: '请输入参数2' },
    { label: '参数3:', value: '', placeholder: '请输入参数3' },
    { label: '参数4:', value: '', placeholder: '请输入参数4' },
    { label: '参数5:', value: '', placeholder: '请输入参数5' },
    { label: '参数6:', value: '', placeholder: '请输入参数6' },
    { label: '参数7:', value: '', placeholder: '请输入参数7' },
    { label: '参数8:', value: '', placeholder: '请输入参数8' }
]);

</script>

<template>
    <div class="container">
        <div class="icon-container" style="top: 0;right: 0;">
            <img :src="closeIcon" alt="Close Icon" class="icon" />
        </div>
        <el-card>
            <template #header>
                <div class="card-header" style="height: 35px;">
                    <span style="line-height: 35px; margin-right: 20px;">参数配置</span>
                    <el-button text>历史参数管理</el-button>
                </div>
            </template>
            <div class="param-group">
                <div class="param-container">
                    <span>设备1参数</span>
                    <el-button text class="custom-button">
                        <img :src="historyIcon" alt="history Icon" class="icon" style="width: 30px;height: 30px;" />
                        历史参数</el-button>
                    <el-button text class="custom-button">
                        <img :src="saveIcon" alt="Save Icon" class="icon" style="width: 25px;height: 25px;" />
                        保存此配置</el-button>
                    <div class="params">
                        <div class="param" v-for="(param, index) in param_type1" :key="index">
                            <span>{{ param.label }}</span>
                            <el-input v-model="param.value" :placeholder="param.placeholder"></el-input>
                        </div>
                    </div>
                </div>

                <div class="param-container">
                    <span>设备2参数</span>
                    <el-button text class="custom-button">
                        <img :src="historyIcon" alt="history Icon" class="icon" style="width: 30px;height: 30px;" />
                        历史参数</el-button>
                    <el-button text class="custom-button">
                        <img :src="saveIcon" alt="Save Icon" class="icon" style="width: 25px;height: 25px;" />
                        保存此配置</el-button>
                    <div class="params">
                        <div class="param" v-for="(param, index) in param_type2" :key="index">
                            <span>{{ param.label }}</span>
                            <el-input v-model="param.value" :placeholder="param.placeholder"></el-input>
                        </div>
                    </div>
                </div>

                <div class="param-container">
                    <span>设备3参数</span>
                    <el-button text class="custom-button">
                        <img :src="historyIcon" alt="history Icon" class="icon" style="width: 30px;height: 30px;" />
                        历史参数</el-button>
                    <el-button text class="custom-button">
                        <img :src="saveIcon" alt="Save Icon" class="icon" style="width: 25px;height: 25px;" />
                        保存此配置</el-button>
                    <div class="params">
                        <div class="param" v-for="(param, index) in param_type3" :key="index">
                            <span>{{ param.label }}</span>
                            <el-input v-model="param.value" :placeholder="param.placeholder"></el-input>
                        </div>
                    </div>
                </div>

                <div class="param-container">
                    <span>设备4参数</span>
                    <el-button text class="custom-button">
                        <img :src="historyIcon" alt="history Icon" class="icon" style="width: 30px;height: 30px;" />
                        历史参数</el-button>
                    <el-button text class="custom-button">
                        <img :src="saveIcon" alt="Save Icon" class="icon" style="width: 25px;height: 25px;" />
                        保存此配置</el-button>
                    <div class="params">
                        <div class="param" v-for="(param, index) in param_type4" :key="index">
                            <span>{{ param.label }}</span>
                            <el-input v-model="param.value" :placeholder="param.placeholder"></el-input>
                        </div>
                    </div>
                </div>
            </div>

            <template #footer>
                <div class="footer">
                    <el-button>完成</el-button>
                </div>
            </template>
        </el-card>
    </div>
</template>

<style>
.container {
    position: relative;
    height: 600px;
    width: 970px;;
    /* border: 2px solid red; */
}

.icon-container{
    position: absolute;
    margin: 5px;
    .icon {
        width: 40px;
        height: 40px;
    }
}

.param-group{
    max-height: 420px;
    overflow-y: auto;
}

.param-container{
    margin: 10px 0;
}

.param-container>span:first-child {
    font-family: 'Arial',
        sans-serif;
        font-size: 16px;
        font-weight: bold;
        color: #333333;
}

.params {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.param{
    display: flex;
    align-items: center;
    margin: 20px 0;
    max-width: 200px;

}

.param span{
    white-space: nowrap;
    margin-right: 10px;
}

.el-button.is-text.custom-button {
    font-size: inherit;
    /* 继承父元素的字体大小 */
    font-family: inherit;
    color: inherit;
    margin-left: 20px;
    padding-top: 0;
}

.footer{
    display: flex;
    justify-content: flex-end;
    margin-right: 20px;
    .el-button:hover{
        background-color: rgb(217, 220, 221);
        color: black;
        border: #333333;
    }
}
</style>
