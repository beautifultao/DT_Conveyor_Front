import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userInfo', () => {
    const token= ref(localStorage.getItem('token') || '')
    const privilege = ref(localStorage.getItem('privilege') || '');
    const tokenExpire = ref(localStorage.getItem('token_expire') || '');

    // 根据token是否为空来验证用户是否登录
    const isLoggedIn = computed(() => {
        return !!token.value && new Date().getTime() < tokenExpire.value;
    })
    // 获取用户权限
    const getPrivilege = computed(() => {
        return !!privilege.value
    })


    function setToken(newToken, remainingTime) {
        token.value = newToken;

        const expireTime = new Date().getTime() + remainingTime;
        tokenExpire.value = expireTime;

        localStorage.setItem('token', newToken);
        localStorage.setItem('token_expire', expireTime);
    }

    function clearToken() {
        token.value = '';
        tokenExpire.value = '';
        localStorage.removeItem('token');
        localStorage.removeItem('token_expire');
    }

    function setPrivilege(newPrivilege) {
        privilege.value = newPrivilege;
        localStorage.setItem('privilege', newPrivilege);
    }
    
    function clearPrivilege() {
        privilege.value = '';
        localStorage.removeItem('privilege');
    }
    function checkToken() {
        const currentTime = new Date().getTime();
        if (!token.value || !tokenExpire.value || currentTime >= tokenExpire.value) {
            clearToken();
            return false;
        }
        return true;
    }

    return {
        token,
        privilege,
        isLoggedIn,
        getPrivilege,
        setToken,
        clearToken,
        setPrivilege,
        clearPrivilege,
        checkToken
    };
})