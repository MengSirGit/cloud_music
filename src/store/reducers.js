import {
        CHANGE_CURR_LIST,
        PLAY_MUSIC_LIST, 
        SONG_SHEET_DETAIL, 
        MUSIC_DETAIL,
        SHEET_DISCUSS, 
        SONG_DISCUSS,
        LOGIN_VALUE,
        DAY_RECOMMEND_SONG
    } from './actionTypes'

//检测登录状态
export const loginValueReducer = (state={
    code: 0,
    profile: {},
    bindings: []
}, action) => {
    switch(action.type){
        case LOGIN_VALUE:
            return Object.assign({}, state, action.data)
        default: 
            return state
    }
}

//切换音乐
export const currMusicReducer = (state=[], action) => {
    switch(action.type){
        case CHANGE_CURR_LIST:
            return action
        case MUSIC_DETAIL:
            return action
        default:
            return state
    }
}

//播放音乐
export const playMusicReducer = (state=[], action) => {
    switch(action.type){
        case PLAY_MUSIC_LIST:
            return action.data
        default:
            return state
    }
}

//获取歌单
export const songSheetReducer= (state={}, action) => {
    switch(action.type){
        case SONG_SHEET_DETAIL:
            return action
        default:
            return state
    }
}

//歌单评论
export const sheetDiscussReducer = (state=[], action) => {
    switch(action.type){
        case SHEET_DISCUSS:
            return action
        default:
            return state
    }
}

//歌曲评论
export const songDiscussReducer = (state=[], action) => {
    switch(action.type){
        case SONG_DISCUSS:
            return action
        default:
            return state
    }
}

//每日推荐歌曲
export const dayRecommendReducer = (state=[], action) => {
    switch(action.type){
        case DAY_RECOMMEND_SONG:
            return action.data.recommend
        default:
            return state
    }
}