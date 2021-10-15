<template>
  <div>
    {{msg}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "webpack vue"
    }
  }
}
</script>

<style lang='scss' scoped>
div {
  color: aquamarine;
  display: flex;
}
</style>