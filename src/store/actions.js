/*
 * @Author: kuiwang3
 * @CreateDate: Do not edit
 * @LastEditors: kuiwang3
 * @LastEditTime: 2018-10-22 19:18:08
 * @Description: 一些异步的，复杂的提交mutations逻辑
 */
import * as types from './mutation-types'
import {
  playMode
} from 'common/js/config'
import {
  shuffle
} from 'common/js/utils'

export function selectPlay({
  commit,
  state
}, {
  list,
  index
}) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAY_LIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAY_LIST, list)
  }

  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING, true)
  commit(types.SET_CURRENT_INDEX, index)
}

export const randomPlay = function ({
  commit
}, {
  list
}) {
  commit(types.SET_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAY_LIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING, true)
}

export function back({
  commit,
  state
}) {
  commit(types.SET_FULL_SCREEN, false)
}

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
