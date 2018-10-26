/*
 * @Author: kuiwang3
 * @CreateDate: Do not edit
 * @LastEditors: kuiwang3
 * @LastEditTime: 2018-10-22 19:17:30
 * @Description: mutations事件，用于更改数据
 */
import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.CURRENT_SONG](state, song) {
    state.currentSong = song
  }
}

export default mutations
