/*
 * @Author: kuiwang3
 * @CreateDate: Do not edit
 * @LastEditors: kuiwang3
 * @LastEditTime: 2018-10-22 15:58:40
 * @Description: 创建歌手数据类
 */
export default class Singer {
  constructor({
    id,
    name
  }) {
    this.id = id
    this.name = name
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
  }
}
