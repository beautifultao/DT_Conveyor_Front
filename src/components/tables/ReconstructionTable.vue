<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getReconstructionApi, deleteReconstructionApi } from '@/utils/axios/request'

const tableData = ref([])

const getReconstructionParams = async () => {
    await getReconstructionApi()
        .then(response => {
            tableData.value = response.data
        })
        .catch(error => {
            console.error('Error fetching Reconstruction parameters:', error)
        })
}


const emit = defineEmits(['selectReconstructionRaw', 'closeReconstructionTable'])

const selectRow = (row) => {
    emit('selectReconstructionRaw', row)
}


const closeTable = () => {
    emit('closeReconstructionTable');
};


const deleteRow = async(row) => {
    try {
        // 发起DELETE请求
        await deleteReconstructionApi(row.id);
        // 请求成功后从tableData中删除该行数据
        const index = tableData.value.findIndex(item => item.id === row.id);
        if (index !== -1) {
            tableData.value.splice(index, 1);
        }
    } catch (error) {
        console.log(error);
    }
}

onMounted(getReconstructionParams)

onUnmounted(() => {
    tableData.value = []
})
</script>

<template>
    <div class="param-table">
        <el-table :data="tableData" stripe style="width: 100%" height="250">
            <el-table-column prop="createTime" label="日期" width="200" />
            <el-table-column prop="gaussianSearchRadius" label="高斯滤波搜索半径" width="150" />
            <el-table-column prop="gaussianSigmaWeightX" label="高斯权重_X" width="120" />
            <el-table-column prop="gaussianSigmaWeightY" label="高斯权重_Y" width="120" />
            <el-table-column prop="voxelSize" label="体素网格边长" min-width="150" />
            <el-table-column prop="distanceThreshold" label="插值间隔阈值" width="120" />
            <el-table-column prop="triangulationSearchRadius" label="网格重建搜索半径" min-width="150" />
            <el-table-column prop="maxNearestNeighbors" label="网格重建最大临点数" min-width="150" />
            <el-table-column fixed="right" label="操作" min-width="120">
                <template #default="scope">
                    <el-button link type="primary" @click.prevent="selectRow(scope.row)">
                        选择
                    </el-button>
                    <el-button link type="danger" @click.prevent="deleteRow(scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button text @click="closeTable" style="bottom: 0;">关闭</el-button>
    </div>
</template>

<style scoped>
.param-table {
    margin: 15px;
    border: #ebeef5 1px solid;
    height: 300px;
    /* overflow: scroll; */
}
</style>