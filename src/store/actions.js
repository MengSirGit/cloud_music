import {
    CHANGE_CURR_LIST,
    PLAY_MUSIC_LIST,
    SEARCH_SONGS,
    SONG_SHEET_DETAIL,
    SHEET_DISCUSS
} from './actionTypes'
import * as api from '../api'

//播放歌曲
export const playMusicList = (id) => {
    return {
        type: PLAY_MUSIC_LIST,
        data: id
    }
}

//播放歌曲
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

//歌单详情
export const songSheet = (id, _type) => {
    return {
        type: SONG_SHEET_DETAIL,
        id: id,
        _type: _type
    }
}

//歌单详情
export const getSongSheet = (id, type) => {
    return songSheet(id, type)
}

//歌单评论
export const sheetDiscuss = (id, intro) => {
    return {
        type: SHEET_DISCUSS,
        id: id, 
        intro: intro
    }
}

//歌单评论
export const getSheetDiscuss = (id, intro) => {
    return sheetDiscuss(id, intro)
}
