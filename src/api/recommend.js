import jsonp from 'common/js/jsonp'
import {
  commonParams,
  options
} from './config'
import axios from 'axios'

export function getRecommend() {
  const url =
    'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  })
  return jsonp(url, data, options)
}

export function getDiscList() {
  const url = '/api/getDiscList'

  const data = Object.assign({}, commonParams, {
    rnd: Math.random(),
    picmid: 1,
    loginUin: 0,
    hostUin: 0,
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29,
    format: 'json'
  })

  return axios
    .get(url, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res.data)
    })
}
/**
 * @msg:抓取歌单详情页
 * @param {Number} disstid 歌单ID
 * @return: promise
 */
export function getSongList(disstid) {
  // const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  const url = '/api/getSongList'

  const data = Object.assign({}, commonParams, {
    disstid,
    uin: 0,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'h5',
    hostUin: 0,
    needNewCode: 1
  })

  return axios
    .get(url, {
      params: data
    })
    .then(res => {
      console.log('tt', res)
      return Promise.resolve(res.data)
    })
}
