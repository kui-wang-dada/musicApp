<template>
    <div class='progress-bar'
         @click='progressClick'
         ref='progressBar'>
        <!-- 总长区域 -->
        <div class='bar-inner'>
            <!-- 左边颜色区域 -->
            <div class='progress'
                 ref='progress'></div>
            <!-- 按钮区域 -->
            <div class='progress-btn-wrapper'
                 ref='progressBtn'
                 @touchstart.prevent='progressTouchStart'
                 @touchmove.prevent='progressTouchMove'
                 @touchend='progressTouchEnd'>
                <div class='progress-btn'>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {prefixStyle} from 'common/js/dom'

const transform = prefixStyle('transform')
// 按钮的宽度
const progressBtnWidth = 16
export default {
  components: {},
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {

    }
  },
  watch: {
    percent(newPercent) {
      if (newPercent >= 0 && !this.touch.initiated) {
        //   总长减去按钮宽度
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        // 偏移系数*剩余总长
        const offsetWidth = newPercent * barWidth
        this._offset(offsetWidth)
      }
    }
  },
  computed: {

  },
  created() {
    this.touch = {}
  },
  mounted() {

  },
  methods: {
    //   开始点击时，记录相关值
    progressTouchStart(e) {
      // 标志位，表示正在点击中
      this.touch.initiated = true
      //   拿到点击的位置
      this.touch.startX = e.touches[0].pageX
      //   拿到此时已播放的长度
      this.touch.left = this.$refs.progress.clientWidth
    },
    progressTouchMove(e) {
      // 边界处理
      if (!this.touch.initiated) {
        return
      }
      //   拿到滚动的偏移量
      const deltaX = e.touches[0].pageX - this.touch.startX
      //   拿到此时的位置
      const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
      // dom样式更新
      this._offset(offsetWidth)
    },
    progressTouchEnd(e) {
      // 修改标志位，表示已触碰结束
      this.touch.initiated = false
      //   对结果进行处理
      this._triggerPercent()
    },
    progressClick(e) {
      const react = this.$refs.progressBar.getBoundingClientRect()
      const offsetWidth = e.pageX - react.left
      this._offset(offsetWidth)
      this._triggerPercent()
    },
    // 歌曲要移动到相应的位置
    _triggerPercent() {
      // 拿到此时的总长度
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
      //   拿到此时的百分比
      const percent = this.$refs.progress.clientWidth / barWidth
      this.$emit('percentChange', percent)
    },
    _offset(offsetWidth) {
      // 设置已播放区域的宽度
      this.$refs.progress.style.width = `${offsetWidth}px`
      //   设置按钮的偏移量
      this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
    }
  }
}
</script>
<style scoped lang='scss'>
@import '~common/styles/variable';
.progress-bar {
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: $color-theme;
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>