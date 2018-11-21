import {
    CHANGE_CURR_LIST,
    PLAY_MUSIC_LIST,
    SEARCH_SONGS,
    SONG_SHEET_DETAIL,
    MUSIC_DETAIL,
    LOGIN_VALUE,
    DAY_RECOMMEND_SONG,
    DISCUSS_ARRAY,
    DISCUSS_DETAIL
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
export const changeCurrMusic = (data, index, mark) => {
    return {
        type: CHANGE_CURR_LIST,
        data: data,
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

//评论
export const discussArray = (data) => {
    return {
        type: DISCUSS_ARRAY,
        data: data
    }
}

//评论
export const getDiscussArray = (id, _type) => {
    return (dispatch) => {
        if (_type === 0) {
            //歌曲评论
            api.getSongDiscuss(id).then(res => {
                if (res.data.code === 200) { 
                    dispatch(discussArray(res.data))
                }
            })
        }
        else if (_type === 2) {
            //歌单评论
            api.getSheetDiscuss(id).then(res => {
                if (res.data.code === 200) { 
                    dispatch(discussArray(res.data))
                }
            })
        }
        else if (_type === 3) {
            //专辑评论
            api.getAlbumDiscuss(id).then(res => {
                if (res.data.code === 200) { 
                    dispatch(discussArray(res.data))
                }
            })
        }
    }
}

//评论页详情
export const discussDetail = (model, intro) => {
    return {
        type: DISCUSS_DETAIL,
        model: model,
        intro: intro
    }
}

//评论页详情
export const getDiscussDetail = (model, intro) => {
    return discussDetail(model, intro)
}