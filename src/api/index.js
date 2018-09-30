import axios from 'axios'

axios.defaults.baseURL = `http://localhost:3000`

//banner
export const getBanner = () => axios.get(`banner`) 

//推荐歌单
export const getRecommonSong = () => axios.get(`personalized`)

//获取音乐地址
export const getMusicUrl = (id) => axios.get(`music/url?id=${id}`)

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