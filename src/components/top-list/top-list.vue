<template>
  <transition name="slide">
    <music-list :rank="rank"
                :title="title"
                :bg-image="bgImage"
                :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {getMusicList} from 'api/rank'
  import {ERR_OK} from 'api/config'
  import {mapGetters} from 'vuex'
  import {createSong} from 'common/js/song'

  export default {
    components: {
      MusicList
    },
    computed: {
      // 标题
      title() {
        return this.topList.topTitle
      },
      //   背景图
      bgImage() {
        if (this.songs.length) {
          return this.songs[0].image
        }
        return ''
      },
      ...mapGetters([
        'topList'
      ])
    },
    data() {
      return {
        songs: [], // 页面数据
        rank: true // 标识
      }
    },
    created() {
      this._getMusicList()
    },
    methods: {
      /**
       * @msg:获取数据
       * @param {}
       * @return:
       */
      _getMusicList() {
        //   边界处理
        if (!this.topList.id) {
          this.$router.push('/rank')
          return
        }
        getMusicList(this.topList.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.songlist)
          }
        })
      },
      /**
       * @msg:排行详情页处理
       * @param {Array} list 返回的数据
       * @return:
       */
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          const musicData = item.data
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    }
  
  }
</script>

<style scoped lang="scss" >
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>