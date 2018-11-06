<template>
  <div class="singer"
       ref="singer">
    <list-view :data="singerList"
               @select='selectSinger'
               ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import ListView from 'base/listview/listview'
import {getSingerList} from 'api/singer'
import Singer from 'common/js/singer'
import {ERR_OK} from 'api/config'
import {playlistMixin} from 'common/js/mixin'
import {mapMutations} from 'vuex' // mutations语法糖

const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'

export default {
  mixins: [playlistMixin],
  components: {ListView},
  props: {},
  data () {
    return {
      singerList: []
    }
  },
  watch: {

  },
  computed: {

  },
  created () {
    this._getSingerList()
  },
  mounted () {

  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.singer.style.bottom = bottom
      this.$refs.list.refresh()
    },
    selectSinger(singer) {
      console.log(singer)
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      // 调用mutations中挂在到methods的方法
      this.setSinger(singer)
    },
    _getSingerList() {
      getSingerList().then((res) => {
        console.log('res', res)
        if (res.code === ERR_OK) {
          this.singerList = this._normalizeSinger(res.data.list)
          console.log(this.singerList)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          name: item.Fsinger_name,
          id: item.Fsinger_mid
        }))
      })

      let ret = []
      let hot = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    // 将mutations挂在到方法上
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
}
</script>
<style scoped lang='scss'>
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
