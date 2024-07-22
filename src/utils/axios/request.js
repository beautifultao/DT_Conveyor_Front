import {post,postByUrl,get,del} from './service'

export const loginApi = data =>{
    return post({
        url:"/user/login",
        data
    })
}

// 获取历史配置参数API
export const getPLCApi = (params) =>{
    return get('/params/getPLCParam', params);
}
export const getCameraApi = (params) =>{
    return get('/params/getCameraParam', params);
}
export const getReconstructionApi = (params) =>{
    return get('/params/getReconstructionParam', params);
}

// 设置配置参数API
export const setPLCApi = data =>{
    return post({
        url:"/params/setPLCParam",
        data
    })
}
export const setCameraApi = data =>{
    return post({
        url:"/params/setCameraParam",
        data
    })
}
export const setReconstructionApi = data =>{
    return post({
        url:"/params/setReconstructionParam",
        data
    })
}
export const setParamsApi = data =>{
    return post({
        url:"/params/setParams",
        data
    })
}

// 删除历史配置参数API
export const deletePLCApi = id => {
    return del(`/params/deletePLCParam/${id}`);
}
export const deleteCameraApi = id => {
    return del(`/params/deleteCameraParam/${id}`);
}
export const deleteReconstructionApi = id => {
    return del(`/params/deleteReconstructionParam/${id}`);
}

// 交互功能API
export const turnONConveyor = () =>{
    return get('/control/ConveyorON');
}
export const turnOFFConveyor = () =>{
    return get('/control/ConveyorOFF');
}
export const changeConveyorSpeed = speed =>{
    return postByUrl(`/control/ConveyorSpeed/${speed}`);
}

export const turnONFeeder = () =>{
    return get('/control/FeederON');
}
export const turnOFFFeeder = () =>{
    return get('/control/FeederOFF');
}
export const changeFeederSpeed = speed =>{
    return postByUrl(`/control/FeederSpeed/${speed}`);
}

export const startCollection = () =>{
    return get('/control/StartCollection');
}
export const stopCollection = () =>{
    return get('/control/StopCollection');
}
