import { CHANGE_CURR_LIST, PLAY_MUSIC_LIST } from './actionTypes'

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
export const playMusic = (state=[], action) => {
    switch(action.type){
        case PLAY_MUSIC_LIST:
            return action.data
        default:
            return state
    }
}