<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<view>
			<text class="title">{{ title }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				msg: '',
			}
		},
		onLoad({ msg, type = '' }) {
			this.msg = msg;
			if (!this.msg.slice(0, 3) == '160') {
				uni.showModal({
					title: '',
					content: '',
					showCancel: false,
					cancelText: '',
					confirmText: '信息无法验证，请预约工作人员上门录入',
					success: res => {
						uni.navigateTo({
							url: `/pages/submitInfo/submitInfo?type=form`
						})
					},
					fail: () => {
						
					}
				});
			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}
 
	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
