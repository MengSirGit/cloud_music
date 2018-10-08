import {
    CHANGE_CURR_LIST,
    PLAY_MUSIC_LIST,
    SEARCH_SONGS
} from './actionTypes'
import * as api from '../api'

//播放歌单
export const playMusicList = (id) => {
    return {
        type: PLAY_MUSIC_LIST,
        data: id
    }
}

//播放歌单
export const playMusic = (id) => {
    //获取基本信息
    return playMusicList(id)
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
            if(res.data.code === 200){
                dispatch(changeCurrMusic(res.data.playlist.tracks))
            }
        })
    }
}

//歌曲检索
export const searchSongs = (result) => {
    return {
        type: SEARCH_SONGS,
        result
    }
}

//歌曲检索
export const searchSongsReducer = () => {}