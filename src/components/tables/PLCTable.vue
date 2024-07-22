<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getPLCApi, deletePLCApi } from '@/utils/axios/request'

const tableData = ref([])

const getPLCParams = async () => {
    await getPLCApi()
        .then(response => {
            tableData.value = response.data
        })
        .catch(error => {
            console.error('Error fetching PLC parameters:', error)
        })
}


const emit = defineEmits(['selectPLCRaw', 'closePLCTable'])

const selectRow = (row) => {
    emit('selectPLCRaw', row)
}


const closeTable = () => {
    emit('closePLCTable');
};


const deleteRow = async(row) => {
    try {
        // 发起DELETE请求
        await deletePLCApi(row.id);
        // 请求成功后从tableData中删除该行数据
        const index = tableData.value.findIndex(item => item.id === row.id);
        if (index !== -1) {
            tableData.value.splice(index, 1);
        }
    } catch (error) {
        console.log(error);
    }
}

onMounted(getPLCParams)

onUnmounted(() => {
    tableData.value = []
})
</script>

<template>
    <div class="param-table">
        <el-table :data="tableData" stripe style="width: 100%" height="250">
            <el-table-column prop="createTime" label="日期" width="200" />
            <el-table-column prop="ipAddress" label="IP地址" width="150" />
            <el-table-column prop="port" label="端口" width="120" />
            <el-table-column prop="deviceId" label="设备ID" width="120" />
            <el-table-column prop="registerAddress" label="寄存器地址" min-width="150" />
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