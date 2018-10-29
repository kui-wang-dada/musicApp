/*
 * @Author: kuiwang3
 * @CreateDate: Do not edit
 * @LastEditors: kuiwang3
 * @LastEditTime: 2018-10-22 19:18:08
 * @Description: 一些异步的，复杂的提交mutations逻辑
 */
import * as types from './mutation-types'
export function selectPlay({
  commit,
  state
}, {
  list,
  index
}) {
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAY_LIST, list)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING, true)
  commit(types.SET_CURRENT_INDEX, index)
}

export function back({
  commit,
  state
}) {
  commit(types.SET_FULL_SCREEN, false)
}
