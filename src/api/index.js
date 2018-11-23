import axios from 'axios'

axios.defaults.baseURL = `http://localhost:3000`

//手机号登录
export const loginPhone = (phone, password) => axios.get(`login/cellphone`, {
    params: {
        phone,
        password
    },
    withCredentials: true
})

//刷新登录
export const loginRefresh = () => axios.get(`login/refresh`, {
    withCredentials: true
})

//退出登录
export const logout = () => axios.get(`logout`, {
    withCredentials: true
})

//登录状态
export const loginStatus = () => axios.get(`login/status`, {
    withCredentials: true
})

//banner
export const getBanner = () => axios.get(`banner`) 

//每日推荐歌单(登录)
export const getDayRecommonSheet = () => axios.get(`recommend/resource`, {
    withCredentials: true
})

//每日推荐歌曲(登录)
export const getDayRecommonSong = () => axios.get(`recommend/songs`, {
    withCredentials: true
})

//推荐歌单
export const getRecommonSong = () => axios.get(`personalized`)

//获取音乐地址
export const getMusicUrl = (id) => axios.get(`song/url?id=${id}`)

//获取歌单详情
export const getSongSheetDetail = (id) => axios.get(`playlist/detail?id=${id}`)

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

//专辑评论
export const getAlbumDiscuss = (id, limit=20, offset=1) => axios.get(`comment/album?id=${id}`, {
    params: {
        limit: offset * limit,
        offset
    }
})

//电台推荐
export const djRecommend = () => axios.get('dj/recommend')

//歌单评论
export const getSheetDiscuss = (id, limit=20) => axios.get(`comment/playlist?id=${id}`, {
    params: {
        limit
    }
})

//歌曲评论
export const getSongDiscuss = (id, limit=20) => axios.get(`comment/music?id=${id}`, {
    params: {
        limit
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

//排行榜
/**
 * "0": 云音乐新歌榜
 * "1": 云音乐热歌榜
 * "2": 网易原创歌曲榜
 * "3": 云音乐飙升榜
 * "4": 云音乐电音榜
 * "5": UK排行榜周榜
 * "6": 美国Billboard周榜
 * "7": KTV嗨榜
 * "8": iTunes榜
 * "9": Hit FM Top榜
 * "10": 日本Oricon周榜
 * "11": 韩国Melon排行榜周榜
 * "12": 韩国Mnet排行榜周榜
 * "13": 韩国Melon原声周榜
 * "14": 中国TOP排行榜(港台榜)
 * "15": 中国TOP排行榜(内地榜)
 * "16": 香港电台中文歌曲龙虎榜
 * "17": 华语金曲榜
 * "18": 中国嘻哈榜
 * "19": 法国 NRJ EuroHot 30周榜
 * "20": 台湾Hito排行榜
 * "21": Beatport全球电子舞曲榜
 * "22": 云音乐ACG音乐榜
 * "23": 云音乐嘻哈榜
 */
export const getTopList = (id) => axios.get(`top/list?idx=${id}`)

//排行榜榜单摘要
export const getTopListDetail = () => axios.get('toplist/detail')

//发送评论
/**
 * t:1 发送
 * tpye: 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型
 * 0: 歌曲
 * 1: mv
 * 2: 歌单
 * 3: 专辑
 * 4: 电台
 * 5: 视频
 */
export const sendComment = (type=0, id, content) => axios.get(`comment?t=1&type=${type}&id=${id}&content=${content}`, {
    withCredentials: true
})