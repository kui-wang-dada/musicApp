<template>

  <transition name="slide">
    <music-list :title="title"
                :bg-image="bgImage"
                :songs="songs"></music-list>
  </transition>

</template>

<script>
import MusicList from 'components/music-list/music-list'
import {getSongList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import {mapGetters} from 'vuex'
import {createSong} from 'common/js/song'
export default {
  components: {MusicList},
  props: {},
  data() {
    return {
      songs: []
    }
  },
  watch: {

  },
  computed: {
    // 标题
    title() {
      return this.disc.dissname
    },
    // 背景图
    bgImage() {
      return this.disc.imgurl
    },
    // 拿到默认歌单
    ...mapGetters([
      'disc'
    ])
  },
  created() {
    this._getSongList()
  },
  mounted() {

  },
  methods: {
    /**
     * @msg:拿到当前歌单详情
     * @param {}
     * @return:
     */
    _getSongList() {
      if (!this.disc.dissid) {
        this.$router.push('/recommend')
        return
      }
      getSongList(this.disc.dissid).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.cdlist[0].songlist)
        }
      })
    },
    /**
     * @msg:处理歌单数据
     * @param {type}
     * @return:
     */
    _normalizeSongs(list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>
<style scoped lang='scss'>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%，0, 0);
}
</style>