import axios from 'axios'

axios.defaults.baseURL = `http://localhost:3000`

//banner
export const getBanner = () => axios.get(`banner`) 

//推荐歌单
export const getRecommonSong = () => axios.get(`personalized`)

//获取音乐地址
export const getMusicUrl = (id) => axios.get(`song/url?id=${id}`)

//获取歌单详情
export const getDetail = (id) => axios.get(`playlist/detail?id=${id}`)

//获取歌曲详情
export const getSongDetail = (id) => axios.get(`song/detail?ids=${id}`)

//获取最新音乐
export const getNewMusic = () => axios.get(`personalized/newsong`)

//获取主播电台
export const getAnchorRadio = () => axios.get(`personalized/djprogram`)

//获取独家放送
export const getExclusive = () => axios.get('personalized/privatecontent')

//歌曲搜索
export const getSearchCon = (keywords, offset=0, limit=30, type=1) => axios.get('search', {
    params: {
        keywords,
        offset: offset * limit,
        limit,
        type
    }
})

//搜索建议
export const searchAdvise = (keywords, offset=0, limit=30, type=1) => axios.get('search/suggest', {
    params: {
        keywords,
        offset: offset * limit,
        limit,
        type
    }
})

//新碟上架(专辑)
export const newPlate = (id, offset=0, limit=6) => axios.get('top/album', {
    params: {
        id,
        offset: offset * limit,
        limit
    }
})

//获取专辑内容
export const getAlbumCon = (id) => axios.get(`album?id=${id}`)

//电台推荐
export const djRecommend = () => axios.get('dj/recommend')

//歌单评论
export const getSheetDiscuss = (id, limit=20) => axios.get(`comment/playlist?id=${id}`, {
    params: {
        limit
    }
})

//歌曲评论
export const getSongDiscuss = (id, limit=20, offset=1) => axios.get(`comment/music?id=${id}`, {
    params: {
        limit: offset * limit,
        offset
    }
})

//热门评论
/**
 * 0 歌曲
 * 1 MV
 * 2 歌单
 * 3 专辑
 * 4 电台
 * 5 视频 
 */
export const getHotDiscuss = (id, type=0) => axios.get(`comment/hot?id=${id}`, {
    params: {
        type
    }
})