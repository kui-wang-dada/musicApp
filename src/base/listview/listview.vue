<template>
  <div>
    <scroll :data='data'>
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
    </scroll>

  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
export default {
  components: {Scroll},
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
    }
  },
  watch: {

  },
  computed: {

  },
  created() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>
<style scoped>
</style>