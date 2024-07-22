import * as echarts from "echarts"
export const lineChartOption = {
    xAxis:{
        type:'time',
        boundaryGap: false,              // 坐标轴两边留白策略
        data: [],
        axisLabel: {
            textStyle: {
                color: '#bfcbd8',
                fontSize: 15
            }
        },
    },
    yAxis:{
        type:'value',
        splitLine: {
            show: false                 // 取消Y轴的横线分隔线
        },  
        axisLabel: {
            textStyle: {
                color:'#bfcbd8',
                fontSize:15
            }
        }
    },
    dataZoom: [
        {
            type: 'slider',
            height: 20,
            bottom: 10,
        },
        {
            type: 'inside',
        }
    ],
    grid: {     
        top:'10%',                      // 设置折线图在容器中的大小
        left: '5%',
        right: '2%',
        bottom: '15%',
        // containLabel: true
    },
    tooltip: {
        trigger: 'axis',                // 鼠标放置折线图的会自动弹出数据tip
        formatter: function (params) {
            const date = new Date(params[0].value[0]);
            const formattedTime = formatTime(date);
            return `${formattedTime} <br/> ${params[0].value[1]} kg/min`;
        }
    },
    series:[
        {
            data:[],
            type:'line',
            smooth: true ,               // 平滑曲线
            showSymbol: false,           // 取消点数据的圆圈样式
            lineStyle: {
                color: 'rgb(70,191,220)',
                width: 2,
            },            
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(24, 89, 112, 0.8)' // 浅蓝
                }, {
                    offset: 1,
                    color: 'rgba(23, 34, 48, 0.8)' // 深蓝
                }])
            }           
        }
    ]
}

// 工具函数
function formatTime(time) {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    // return `${hours}:${minutes}:${seconds}`;
}