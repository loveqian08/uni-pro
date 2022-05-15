<template>
  <view class="y-step-container">
    <slot></slot>
  </view>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      data: {
        firstName: '张',
        lastName: '三三三'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
	.y-step-container{
	}
</style>
