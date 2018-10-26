import {
    CHANGE_CURR_LIST,
    PLAY_MUSIC_LIST,
    SEARCH_SONGS,
    SONG_SHEET_DETAIL,
    MUSIC_DETAIL,
    SHEET_DISCUSS,
    SONG_DISCUSS,
    LOGIN_VALUE,
    DAY_RECOMMEND_SONG
} from './actionTypes'
import * as api from '../api'

//登录信息
export const loginValue = (data) => {
    return {
        type: LOGIN_VALUE,
        data: data
    }
}

//登录信息
export const getLoginValue = () => {
    return (dispatch) => {
        api.loginStatus().then(res => {
            if(res.data.code === 200){
                dispatch(loginValue(res.data))
            }
        })
    }
}

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
export const changeCurrMusic = (event, index, mark) => {
    return {
        type: CHANGE_CURR_LIST,
        event: event,
        index: index,
        mark: mark
    }
}

//切换歌曲
export const currMusic = (id, index, mark) => {
    return (dispatch) => {
        api.getDetail(id).then(res => {
            if(res.data.code === 200){
                dispatch(changeCurrMusic(res.data.playlist.tracks, index, mark))
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

//歌曲详情
export const musicDetail = (data) => {
    return {
        type: MUSIC_DETAIL,
        data: data
    }
}

//歌曲详情
export const getMusicDetail = (id) => {
    return (dispatch) => {
        api.getSongDetail(id).then(res => {
            if(res.data.code === 200){
                dispatch(musicDetail(res.data))
            }
        })
    }
}

//歌单评论
export const sheetDiscuss = (id, _type, intro) => {
    return {
        type: SHEET_DISCUSS,
        id: id, 
        _type: _type,
        intro: intro
    }
}

//歌单评论
export const getSheetDiscuss = (id, _type, intro) => {
    return sheetDiscuss(id, _type, intro)
}

//歌曲评论
export const songDiscuss = (infor) => {
    return {
        type: SONG_DISCUSS,
        infor: infor
    }
}

//歌曲评论
export const getSongDiscuss = (infor) => {
    return songDiscuss(infor)
}

//每日推荐歌曲
export const dayRecommendSong = (data) => {
    return {
        type: DAY_RECOMMEND_SONG,
        data: data
    }
}

//每日推荐歌曲
export const getDayRecommendSong = () => {
    return (dispatch) => {
        api.getDayRecommonSong().then(res => {
            if(res.data.code === 200){
                dispatch(dayRecommendSong(res.data))
            }
        })
    }
}