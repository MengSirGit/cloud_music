import {
    CHANGE_CURR_LIST,
    PLAY_MUSIC_LIST
} from './actionTypes'
import * as api from '../api'

//播放歌单
export const playMusicList = (data) => {
    return {
        type: PLAY_MUSIC_LIST,
        data
    }
}

//播放歌单
export const musicList = () => {
    return {}
}

//切换歌曲
export const changeCurrMusic = (event) => {
    return {
        type: CHANGE_CURR_LIST,
        event
    }
}

//切换歌曲
export const currMusic = (id) => {
    return (dispatch) => {
        api.getDetail(id).then(res => {
            if(res.data.code == 200){
                dispatch(changeCurrMusic(res.data.playlist.tracks))
            }
        })
    }
}
