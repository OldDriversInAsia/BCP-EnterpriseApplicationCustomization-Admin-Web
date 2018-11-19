<template>
  <ul>
      <li v-for='item in list'>
          {{item.name}}
      </li>
  </ul>
</template>
<script>
  export default {
    name: 'chatList',
    data() {
      return {
        list: [
          {
            name: '测试1'
          },
          {
            name: '测试2'
          },
          {
            name: '测试3'
          },
          {
            name: '测试4'
          },
          {
            name: '测试5'
          }
        ]
      }
    },
    created() {},
    methods: {}
  }
</script>