import { io } from "socket.io-client";
import { ElMessage } from 'element-plus';

const URL = "http://localhost:9000?type=vue"; // 你的Socket.IO服务器URL
let reconnectionAttempts = 0;

const socket = io(URL, 
    { 
        transports: ['websocket'], 
        autoConnect: false, 
        reconnection: true, 
        reconnectionAttempts: 3, 
        reconnectionDelay: 2000, 
    });

socket.on("connect", () => {
    ElMessage.success("WebSocket连接服务器成功");
});

socket.on("connect_error", (error) => {
    reconnectionAttempts++;
    if(reconnectionAttempts < 3){
        ElMessage.warning("WebSocket连接服务器失败!尝试重新连接"); 
    }
    else {
        ElMessage.error("WebSocket连接服务器失败!请检查网络连接");
        if (socket.active) {
            socket.disconnect(); 
            console.log(error.message);
        }
    }
});

socket.on("disconnect", () => {
    console.log("Disconnected from server");
});

export default socket;
