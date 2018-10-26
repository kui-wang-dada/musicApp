<!--歌手详情页样式-->
<template>
  <div class=music-list>
    <div class=back
         @click='back'>
      <i class='icon-back'></i>
    </div>
    <h1 class='title'
        v-html='title'></h1>
    <div class=bg-image
         :style='bgStyle'
         ref='bgImage'>
      <div class="play-wrapper">
        <div ref="playBtn"
             v-show="songs.length>0"
             class="play">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class=filter
           ref=filter></div>
    </div>
    <div class=bg-layer
         ref=layer></div>
    <scroll :data='songs'
            @scroll='scroll'
            :probe-type='probeType'
            :listen-scroll='listenScroll'
            class='list'
            ref='list'>
      <div class=song-list-wrapper>
        <song-list :songs="songs"></song-list>
      </div>
      <div v-show="!songs.length"
           class="loading-container">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'
import {prefixStyle} from 'common/js/dom.js' // 引入浏览器兼容写法
// 浏览器兼容性
const transform = prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')

// 头部高度的常量
const RESERVED_HEIGHT = 40
export default {
  components: {Scroll, SongList},
  props: {
    //   背景图
    bgImage: {
      type: String,
      default: ''
    },
    // 歌曲列表
    songs: {
      type: Array,
      default: () => []
    },
    // 歌手title
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      scrollY: 0
    }
  },
  computed: {
    // 背景图
    bgStyle() {
      return `background-image:url(${this.bgImage})`
    }
  },
  created() {
    // 组件不双向绑定的变量
    this.probeType = 3
    this.listenScroll = true
  },
  mounted() {
    // 得到图片高度赋值给歌曲列表，同时标记头部底到图片底的位置大小
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
    this.$refs.list.$el.style.top = `${this.imageHeight}px`
  },
  methods: {
    scroll(pos) {
      this.scrollY = pos.y
    },
    back() {
      // 路由返回
      this.$router.back()
    }
  },
  watch: {
    scrollY(newY) {
      // 列表滑动到头部之前
      let translateY = Math.max(this.minTranslateY, newY)
      // 控制特效层的z-index
      let zIndex = 0
      // 下拉的时候放大背景图
      let scale = 1
      // 上移的时候模糊背景图
      let blur = 0
      // 上滑下拉相对图片的比例
      const percent = Math.abs(newY / this.imageHeight)

      if (newY > 0) { // 下拉时
        zIndex = 10
        scale = 1 + percent
      } else { // 上滑
        blur = Math.min(20 * percent, 20)
      }

      if (newY < this.minTranslateY) { // 当滑动到头部时
        zIndex = 10
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
        this.$refs.playBtn.style.display = 'none'
      } else {
        this.$refs.bgImage.style.paddingTop = '70%'
        this.$refs.bgImage.style.height = 0
        this.$refs.playBtn.style.display = ''
      }

      this.$refs.bgImage.style.zIndex = zIndex
      this.$refs.bgImage.style[transform] = `scale(${scale})`
      this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
      this.$refs.bgImage.style[backdrop] = `blur(${blur})px`
    }
  }
}
</script>
<style scoped lang='scss'>
@import '~common/styles/variable';
@import '~common/styles/mixin';

.music-list {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: $color-background;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 40;
    width: 80%;
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }
  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;
    .play-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 50;
      width: 100%;
      .play {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;
        .icon-play {
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: $font-size-medium-x;
        }
        .text {
          display: inline-block;
          vertical-align: middle;
          font-size: $font-size-small;
        }
      }
    }
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
  .bg-layer {
    position: relative;
    height: 100%;
    background: $color-background;
  }
  .list {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: $color-background;
    .song-list-wrapper {
      padding: 20px 30px;
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>