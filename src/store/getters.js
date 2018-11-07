/*
 * @Author: kuiwang3
 * @CreateDate: Do not edit
 * @LastEditors: kuiwang3
 * @LastEditTime: 2018-11-06 19:45:25
 * @Description: 提取数据
 */
export const singer = state => state.singer
export const playing = state => state.playing
export const playlist = state => state.playlist

export const fullScreen = state => state.fullScreen
export const sequenceList = state => state.sequenceList
export const mode = state => state.mode
export const currentIndex = state => state.currentIndex

// 通过播放列表和索引获得当前播放歌曲的数据
export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}

export const disc = state => state.disc
