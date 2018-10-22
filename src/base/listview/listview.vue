<template>
  <scroll :data='data'
          class='listview'
          ref='listview'
          :probe-type="probeType"
          :listen-scroll='listenScroll'
          @scroll='scroll'>
    <ul>
      <li v-for='(group,index) in data'
          :key='index'
          class='list-group'
          ref='listGroup'>
        <h2 class='list-group-title'>{{group.title}}</h2>
        <ul>
          <li v-for="(item,index) in group.items"
              class="list-group-item"
              :key="index">
            <img class="avatar"
                 v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class='list-shortcut'
         @touchstart.stop.prevent='onShortcutTouchStart'
         @touchmove.stop.prevent='onShortcutTouchMove'
         @touchend.stop>
      <ul>
        <li v-for='(item,index) in shortcutList'
            :key='index'
            class='item'
            :data-index='index'
            :class="{'current':currentIndex===index}">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed"
         ref="fixed"
         v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}} </div>
    </div>
    <div v-show="!data.length"
         class="loading-container">
      <loading></loading>
    </div>
  </scroll>

</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {getData} from 'common/js/dom'

const TITLE_HEIGHT = 30
const ANCHOR_HEIGHT = 18
export default {
  components: {Scroll, Loading},
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  created() {
    // better-scroll组件需要
    this.probeType = 3
    // 右边案例滚动时记录滚动数据
    this.touch = {}
    // 设置每一个Group的高度位置
    this.listHeight = []
    // scroll组件传入，实时传回左边滚动的Y值
    this.listenScroll = true
  },
  mounted() {

  },
  computed: {
    // 右边联动的title
    shortcutList() {
      return this.data.map((group, index) => {
        return group.title.substr(0, 1)
      })
    },
    // 左边吸顶操作的title
    fixedTitle() {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  data() {
    return {
      scrollY: -1, // 记录左边内容实时的滚动位置
      currentIndex: 0, // 当前滚动位置对应的Index
      diff: -1 // 吸顶操作的间隔
    }
  },
  methods: {
    // 右边触碰点击事件
    onShortcutTouchStart(e) {
      let anchorIndex = getData(e.target, 'index') // 拿到点击的index
      let firstTouch = e.touches[0] // 拿到点击的对象
      this.touch.y1 = firstTouch.pageY // 标记点击对象的位置
      this.touch.anchorIndex = anchorIndex // 标记点击对象的index

      this._scrollTo(anchorIndex) // 滚动到指定位置
    },
    // 右边滚动事件
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0] // 拿到点击对象
      this.touch.y2 = firstTouch.pageY // 拿到点击对象的位置
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0 // 计算滑动的标签数量
      let anchorIndex = this.touch.anchorIndex + delta // 拿到当前的index位置

      this._scrollTo(anchorIndex)// 滚动到指定位置
    },
    // 由scroll组件发出，实时监控左边滚动的位置
    scroll(pos) {
      this.scrollY = pos.y
    },
    // 滚动到指定位置
    _scrollTo(index) {
      // 异常处理
      if (!index && index !== 0) {
        return
      }
      // 边界处理
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight - 2
      }
      // 刷新左边位置的记录，触发watch
      this.scrollY = -this.listHeight[index]
      // 滚动到指定位置
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },

    // 得到左边每一个group的高度位置
    _calculateHeight() {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      list.forEach((item, index) => {
        height += item.clientHeight
        this.listHeight.push(height)
      })
    }
  },
  watch: {
    // 数据变化，重新计算高度
    data() {
      this.$nextTick(() => {
        this._calculateHeight()
      })
    },
    // 监控左边滚动的位置并设置默认Index和diff
    // newY是负值
    scrollY(newY) {
      const listHeight = this.listHeight
      // 边界处理，当滚动到顶部时，newY>0
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 在中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          return
        }
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2
    },
    // 吸顶效果，当到顶部时，通过设置transform来产生效果
    diff(newVal) {
      // fixedTop:滑动到title部分时应滚动的值
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
      // 没滑动到每一个group的title时不改变dom
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
    }
  }
}
</script>
<style scoped lang='scss'>
@import '~common/styles/variable';

.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;
  .list-group {
    padding-bottom: 30px;
    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }
  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;
    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;
      &.current {
        color: $color-theme;
      }
    }
  }
  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }
  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>