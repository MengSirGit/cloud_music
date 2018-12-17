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
    USER_PLAY_RANK,
    PERSONAL_FM,
    DJ_DETAIL
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
export const loginValueAxios = () => {
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
export const playMusicAxios = (id) => {
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
export const changeCurrMusicAxios = (id, index, mark) => {
    return (dispatch) => {
        api.getSongSheetDetail(id).then(res => {
            if(res.data.code === 200){
                dispatch(changeCurrMusic(res.data.playlist.tracks, index, mark))
            }
        })
    }
}

// 切换专辑歌曲
export const currAlbumMusicAxios = (id, index, mark) => {
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
export const songSheetAxios = (id) => {
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
export const musicDetailAxios = (id) => {
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
export const dayRecommendSongAxios = () => {
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
export const discussArrayAxios = (id, _type) => {
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
export const discussDetailAxios = (model, intro) => {
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

export const musicUrlActionAxios = (id, proto) => {
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

export const musicPosAction =(num, max, ctrl) => {
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

export const userAllInfoAxios = (id) => {
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

export const hotPlaylistAxios = (cat, order, limit) => {
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

export const musicPlayStatusAction = (s) => {
    return musicPlayStatus(s)
}

// 用户播放排行
export const userPlayRank = (result) => {
    return {
        type: USER_PLAY_RANK,
        result: result
    }
}

export const userPlayRankAxios = (id, _type) => {
    return (dispatch) => {
        api.getUserPlayBack(id, _type).then(res => {
            if (res.data.code === 200) {
                if (_type === 1) {
                    console.log('week')
                    dispatch(userPlayRank({ID: id, data: { musicArray: res.data.weekData, isCall: true }}))
                }
            }
            else {
                dispatch(userPlayRank({ data: { msg: '由于对方设置，你不能查看听歌排行', isCall: false }}))
            }
        })
    }
}

// 私人FM
export const personalFM = (result) => {
    return {
        type: PERSONAL_FM,
        result: result
    }
}

export const personalFMAxios = () => {
    return (dispatch) => {
        api.getPersonalFM().then(res => {
            if (res.data.code === 200) {
                dispatch(personalFM(res.data))
                console.log(res.data)
            }
        })
    }
}

// 主播电台
export const DJSheetContent = (result) => {
    return {
        type: DJ_DETAIL,
        result: result
    }
}

export const DJDetailAxios = (id, limit) => {
    return (dispatch) => {
        let _result = {}
        api.getDJDetail(id).then(res => {
            if (res.data.code === 200) {
                _result['djRadio'] = res.data.djRadio

                api.getDJProgram(id, limit).then(resp => {
                    if (resp.data.code === 200) {
                        _result['program'] = resp.data
                        dispatch(DJSheetContent(_result)) 
                    }
                })
            }
        })
    }
}