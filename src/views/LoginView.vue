<script setup>
import { ref } from 'vue'
import { loginApi} from '../utils/axios/request'
import { ElMessage } from 'element-plus';

import { useUserStore } from '@/stores/userToken';
import paramSetting from '@/components/MarqueeParam.vue';


const username = ref('')
const password = ref('')
const privilege = ref('')
const showParam = ref(false)

// 登录操作
const handleLogin = async () => {
    const userStore = useUserStore();
    showParam.value = true;
    await loginApi({
        username: username.value,
        password: password.value
    }).then(response =>{
        if(response.code === 0){    
            // console.log(response.data)
            if(response.data.privilege === 0){
                privilege.value = '管理员';
            } 
            else if(response.data.privilege === 1){
                privilege.value = '游客';
            }

            const token = response.data.token;
            const remainingTime = response.data.remainingTime;
            if (token) {
                // 将 token 保存到本地存储
                userStore.setToken(token, remainingTime);
                userStore.setPrivilege(privilege.value);
                ElMessage({
                    message: `登陆成功, 权限: ${privilege.value}。`,
                    type: 'success',
                    plain: true,
                })
                showParam.value = true;
            }
        } else if (response.code === 1){
            ElMessage.error(response.message);
        }
    }).catch(error => {
        console.error(error);
    });
}

</script>

<template>
    <div class="login">
        <div class="login-header">
            <p style="margin: 0 50px; line-height: 60px;">皮带输送机数字孪生系统</p>
        </div>
        <el-card class="login-container">
            <template #header>
                <div class="card-header" style="height: 50px;">
                    <span>Login</span>
                </div>
            </template>
            <div class="content">
                <el-input v-model="username" placeholder="请输入用户名" />
                <el-input v-model="password" type="password" placeholder="请输入登录密码" show-password />

                <el-button class="login-button" @click="handleLogin">登录</el-button>
                <div class="actions">
                    <el-button text>立即注册</el-button>
                    <el-button text>忘记密码</el-button>
                </div>
            </div>
            <template #footer>
                <div class="login-foot">
                    Demo V1.0.0
                </div>
            </template>
        </el-card>
    </div>

    <div class="param-container" v-if="showParam">
        <paramSetting @closeSetting="showParam = false"></paramSetting>
    </div>
</template>

<style scoped>
.login {
    height: 100vh; 
    /* background: url("../assets/background.png") center center no-repeat; */
    background-image: url("../assets/background.png");
    background-size: cover;
}
.login-header {
    height: 60px;
    background-color: #202329;
    color: white;
    font-size: 20px;
    letter-spacing: 2px;
    font-family: Arial, Helvetica, sans-serif;
}
.login-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(50%, -50%);
    width: 400px;
    height: 450px;
    .card-header {
        display: flex;
        justify-content: center;
        align-items: end;
        font-size: 20px;
        font-weight: 600;
    }
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;

        .el-input {
            height: 45px;
            width: 300px;
            font-size: 16px;
        }

        .login-button {
            height: 45px;
            width: 300px;
            background: #22415d;
            color: #cbcfd4;
            letter-spacing: 10px;
            font-weight: 600;
            border: 1px solid #126ca0;
            opacity: 1
        }
    }
    .login-foot{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        font-weight: 600;
    }
    .actions {
        display: flex;
        justify-content: space-between;
        width: 300px;
    }
}
.param-container{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

</style>
../utils/axios/request