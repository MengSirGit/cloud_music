import { CHANGE_CURR_LIST } from './actionTypes'

//切换音乐
export const currMusic = (state=[], action) => {
    switch(action.type){
        case CHANGE_CURR_LIST:
            return action
        default:
            return state
    }
} 