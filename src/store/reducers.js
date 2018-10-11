import { CHANGE_CURR_LIST, PLAY_MUSIC_LIST, SONG_SHEET_DETAIL } from './actionTypes'

//切换音乐
export const currMusic = (state=[], action) => {
    switch(action.type){
        case CHANGE_CURR_LIST:
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