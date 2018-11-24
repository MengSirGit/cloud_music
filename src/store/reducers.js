import {
        CHANGE_CURR_LIST,
        PLAY_MUSIC_LIST, 
        SONG_SHEET_DETAIL, 
        MUSIC_DETAIL,
        LOGIN_VALUE,
        DAY_RECOMMEND_SONG,
        DISCUSS_ARRAY,
        DISCUSS_DETAIL,
        MUSIC_URL,
        MUSIC_PLAY_POS
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
export const currMusicReducer = (state={
    sheet: [],
    index: null,
    mark: null
}, action) => {
    switch(action.type){
        case CHANGE_CURR_LIST:
            return {
                sheet: action.data,
                index: action.index,
                mark: action.mark
            }
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

//每日推荐歌曲
export const dayRecommendReducer = (state=[], action) => {
    switch(action.type){
        case DAY_RECOMMEND_SONG:
            return action.data.recommend
        default:
            return state
    }
}

//评论 
export const discussReducer = (state=[], action) => {
    switch(action.type) {
        case DISCUSS_ARRAY:
            return action
        default:
            return state
    }
}

//评论页详情
export const discussDetailReducer = (state={}, action) => {
    switch(action.type) {
        case DISCUSS_DETAIL:
            return Object.assign({}, {
                id: action.intro.id,
                type: action.model,
                name: action.intro.name,
                creatorName: action.intro.creator.nickname,
                coverImgUrl: action.intro.coverImgUrl
            })
        default:
            return state
    }
}

//歌曲url
export const musicUrlReducer = (state={
    data: '',
    proto: 0
}, action) => {
    switch(action.type) {
        case MUSIC_URL:
            return {
                data: action.data,
                proto: action.proto
            }
        default:
            return state
    }
}

//歌曲详情
export const musicDetailReducer = (state={}, action) => {
    switch(action.type) {
        case MUSIC_DETAIL:
            return action.data
        default:
            return state
    }
}

//歌曲位置
export const musicPlayPosReducer = (state=null, action) => {
    switch(action.type) {
        case MUSIC_PLAY_POS:
            return action.num
        default: 
            return state
    }
}