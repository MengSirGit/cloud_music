import {CHANGE_CURR_LIST} from './actionTypes'
import * as api from '../api'

//切换歌曲
export const changeCurrMusic = (event) => {
    return {
        type: CHANGE_CURR_LIST,
        event: event
    }
}

//切换歌曲
export const currMusic = (id) => {
    return (dispatch) => {
        api.getMusicUrl(id).then(res => {
            if(res.data.code == 200){
                dispatch(changeCurrMusic(res.data))
            }
        })
    }
}
