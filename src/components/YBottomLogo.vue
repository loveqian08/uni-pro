<template>
	<image class="y-bottom-logo" src="@/static/imgs/logo-gray.png" mode="widthFix"/>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.y-bottom-logo{
		position: absolute;
		left: 50%;
		bottom: 90rpx;
		transform: translateX(-50%);
		width: 310rpx;
        height: 80rpx;
	}
</style>
