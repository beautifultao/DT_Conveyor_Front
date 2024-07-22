<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getCameraApi, deleteCameraApi } from '@/utils/axios/request'

const tableData = ref([])

const getCameraParams = async () => {
    await getCameraApi()
        .then(response => {
            tableData.value = response.data
        })
        .catch(error => {
            console.error('Error fetching Camera parameters:', error)
        })
}

const deleteRow = async (row) => {
    try {
        // 发起DELETE请求
        await deleteCameraApi(row.id);
        // 请求成功后从tableData中删除该行数据
        const index = tableData.value.findIndex(item => item.id === row.id);
        if (index !== -1) {
            tableData.value.splice(index, 1);
        }
    } catch (error) {
        console.log(error);
    }
}

const emit = defineEmits(['selectCameraRaw', 'closeCameraTable'])
const selectRow = (row) => {
    emit('selectCameraRaw', row)
}
const closeTable = () => {
    emit('closeCameraTable');
};


onMounted(getCameraParams)

onUnmounted(() => {
    tableData.value = []
})
</script>

<template>
    <div class="param-table">
        <el-table :data="tableData" stripe style="width: 100%" height="250">
            <el-table-column prop="createTime" label="日期" width="200" />
            <el-table-column prop="username" label="用户名" width="120" />
            <el-table-column prop="password" label="密码" min-width="120" />
            <el-table-column prop="ipAddress" label="IP地址" width="150" />
            <el-table-column prop="port" label="端口" width="120" />
            <el-table-column prop="videoType" label="视频编码格式" min-width="120" />
            <el-table-column prop="channel" label="视频通道" width="120" />
            <el-table-column prop="streamType" label="码流类型" width="120" />
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