import {
    CHANGE_CURR_LIST,
    PLAY_MUSIC_LIST,
    SEARCH_SONGS,
    SONG_SHEET_DETAIL,
    MUSIC_DETAIL,
    LOGIN_VALUE,
    DAY_RECOMMEND_SONG,
    DISCUSS_ARRAY,
    DISCUSS_DETAIL,
    MUSIC_URL,
    MUSIC_PLAY_POS,
    USER_ALL_INFO,
    HOT_PLAY_LIST,
    MUSIC_PLAY_STATUS,
    USER_PLAY_RANK
} from './actionTypes'
import * as api from '../api'

// 登录信息
export const loginValue = (data) => {
    return {
        type: LOGIN_VALUE,
        data: data
    }
}

// 登录信息
export const getLoginValue = () => {
    return (dispatch) => {
        api.loginStatus().then(res => {
            if(res.data.code === 200){
                dispatch(loginValue(res.data))
            }
        })
    }
}

// 播放歌曲
export const playMusicList = (id) => {
    return {
        type: PLAY_MUSIC_LIST,
        data: id
    }
}

// 播放歌曲
export const playMusic = (id) => {
    //获取基本信息
    return playMusicList(id)
}

// 切换歌曲
export const changeCurrMusic = (data, index) => {
    return {
        type: CHANGE_CURR_LIST,
        data: data,
        index: index
    }
}

// 切换歌曲
export const currMusic = (id, index, mark) => {
    return (dispatch) => {
        api.getSongSheetDetail(id).then(res => {
            if(res.data.code === 200){
                dispatch(changeCurrMusic(res.data.playlist.tracks, index, mark))
            }
        })
    }
}

// 切换专辑歌曲
export const currAlbumMusic = (id, index, mark) => {
    return (dispatch) => {
        api.getAlbumCon(id).then(res => {
            if (res.data.code === 200) {
                dispatch(changeCurrMusic(res.data.songs, index, mark))
            }
        })
    }
}

// 歌曲检索
export const searchSongs = (result) => {
    return {
        type: SEARCH_SONGS,
        result
    }
}

// 歌单详情
export const songSheet = (id) => {
    return {
        type: SONG_SHEET_DETAIL,
        id: id
    }
}

// 歌单详情
export const getSongSheet = (id) => {
    return songSheet(id)
}

// 歌曲详情
export const musicDetail = (data) => {
    return {
        type: MUSIC_DETAIL,
        data: data
    }
}

// 歌曲详情
export const getMusicDetail = (id) => {
    return (dispatch) => {
        api.getSongDetail(id).then(res => {
            if(res.data.code === 200){
                dispatch(musicDetail(res.data.songs))
            }
        })
    }
}

// 每日推荐歌曲
export const dayRecommendSong = (data) => {
    return {
        type: DAY_RECOMMEND_SONG,
        data: data
    }
}

// 每日推荐歌曲
export const getDayRecommendSong = () => {
    return (dispatch) => {
        api.getDayRecommonSong().then(res => {
            if(res.data.code === 200){
                dispatch(dayRecommendSong(res.data))
            }
        })
    }
}

// 评论
export const discussArray = (data) => {
    return {
        type: DISCUSS_ARRAY,
        data: data
    }
}

// 评论
export const getDiscussArray = (id, _type) => {
    return (dispatch) => {
        if (_type === 0) {
            // 歌曲评论
            api.getSongDiscuss(id).then(res => {
                if (res.data.code === 200) { 
                    dispatch(discussArray(res.data))
                }
            })
        }
        else if (_type === 2) {
            // 歌单评论
            api.getSheetDiscuss(id).then(res => {
                if (res.data.code === 200) { 
                    dispatch(discussArray(res.data))
                }
            })
        }
        else if (_type === 3) {
            // 专辑评论
            api.getAlbumDiscuss(id, 20, 0).then(res => {
                if (res.data.code === 200) { 
                    dispatch(discussArray(res.data))
                }
            })
        }
    }
}

// 评论页详情
export const discussDetail = (model, intro) => {
    return {
        type: DISCUSS_DETAIL,
        model: model,
        intro: intro
    }
}

// 评论页详情
export const getDiscussDetail = (model, intro) => {
    return discussDetail(model, intro)
}

// 获取歌曲url 
export const getMusicUrl = (data, proto) => {
    return {
        type: MUSIC_URL,
        data: data,
        proto: proto || 0
    }
}

export const musicUrlAction = (id, proto) => {
    return (dispatch) => {
        api.getMusicUrl(id).then(res => {
            if (res.data.code === 200) {
                dispatch(getMusicUrl(res.data.data[0].url, proto))
            }
        })
    }
}

// 歌曲当前位置
export const musicPos = (num) => {
    return {
        type: MUSIC_PLAY_POS,
        num: num
    }
}

export const getMusicPos =(num, max, ctrl) => {
    let _num 
    if (ctrl === true && num < max) {
        _num = num + 1
    }
    else if (ctrl === false && num > 0) {
        _num = num - 1
    }
    else {
        _num = num
    }
    return musicPos(_num)
}

// 用户信息
export const userAllInfo = (data) => {
    return {
        type: USER_ALL_INFO,
        data: data
    }
}

export const getUserAllInfo = (id) => {
    return (dispatch) => {
        let userInfoData = {}
        api.getUserInfo(id).then(res => {
            if (res.data.code === 200) {
                userInfoData.detail = res.data

                api.getUserSongSheet(id).then(res => {
                    if (res.data.code === 200) {
                        userInfoData.playList = res.data.playlist
                        dispatch(userAllInfo(userInfoData))
                    }
                })
            }
        })
    }
}

// 歌单（网友推荐)
export const hotPlaylist = (data) => {
    return {
        type: HOT_PLAY_LIST,
        data: data
    }
}

export const getHotPlaylist = (cat, order, limit) => {
    return (dispatch) => {
        api.getNetFriendPlayList(cat, order, limit).then(res => {
            if (res.data.code === 200) {
                dispatch(hotPlaylist(res.data.playlists))
            }
        })
    }
}

// 歌曲播放状态
export const musicPlayStatus = (status) => {
    return {
        type: MUSIC_PLAY_STATUS,
        status: status
    }
}

export const setMusicPlayStatus = (s) => {
    return musicPlayStatus(s)
}

// 用户播放排行
export const userPlayRank = (result) => {
    return {
        type: USER_PLAY_RANK,
        result: result
    }
}

export const getUserPlayRank = (id, _type) => {
    return (dispatch) => {
        api.getUserPlayBack(id, _type).then(res => {
            if (res.data.code === 200) {
                if (_type === 1) {
                    console.log('week')
                    dispatch(userPlayRank({ID: id, data: { musicArray: res.data.weekData, isCall: true }}))
                }
                // else if (_type === 0){
                //     console.log('all')
                //     dispatch(userPlayRank({ID: id, data: { musicArray: res.data.allData, isCall: true }}))
                // }
            }
            else {
                dispatch(userPlayRank({ data: { msg: '由于对方设置，你不能查看听歌排行', isCall: false }}))
            }
        })
    }
}