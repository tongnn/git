<template>
  <ol class="breadcrumb" style="margin-left:0px;">
    <li class="breadcrumb-item" v-for="(item, index) in list" :key="index">
      <span class="active" v-if="isLast(index)">{{ showName(item) }}</span>
      <router-link :to="item.path" v-else-if="item.path!==''">{{ showName(item) }}</router-link>

      <a href="#/" v-else-if="item.path===''">{{ showName(item) }}</a>
    </li>
  </ol>
</template>

<style>
  .breadcrumb{
    width: 100%;
    height:35px;
    background-color: #fff;
    line-height: 35px;
  }
</style>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
      default: () => []
    },
    separator: String
  },
  methods: {
    isLast (index) {

      return index === this.list.length - 1
    },
    showName (item) {
      if (item.meta && item.meta.label) {
        item = item.meta && item.meta.label
      }
      if (item.name) {
        item = item.name
      }
      return item
    }
  }
}
</script>
