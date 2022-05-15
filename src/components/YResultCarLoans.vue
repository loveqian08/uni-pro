<template>
	<view class="y-result" :class="className">
		<view class="top-area">
			<image v-if="type === true || type === 'success'" src="/static/imgs/lendmoneyresult.png" mode="scaleToFill" class="result-img"></image>
			<image v-else-if="type === false || type === 'fail'" src="/static/imgs/fail.png" mode="scaleToFill" class="result-img"></image>
			<image v-else-if="type === 'wait'" src="/static/imgs/wait.png" mode="scaleToFill" class="result-img"></image>
			<slot v-else name="img" class="result-img"></slot>
			<view class="main" v-if="mainContent">{{mainContent}}</view>
			<view class="main" v-else>
				<slot name="main"></slot>
			</view>
			<view class="sub" v-if="subContent">{{subContent}}</view>
			<view class="sub" v-else>
				<slot name="sub"></slot>
			</view>
		</view>
		<view class="info">
			<view class="title">车辆品牌</view>
			<view>{{carData}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			type: {
				type: [String, Boolean],
				default: ''
			},
			mainContent: {
				type: String,
				default: ''
			},
			subContent: {
				type: String,
				default: ''
			},
			carData: {
				type: String,
				default: ''
			},
			className: {
				type: String,
				default: ''
			},
			// 点击完成按钮，是否退出小程序
			exit: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			finish () {
				this.$emit('onFinish');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top-area{
		text-align: center;
		padding: 60rpx 100rpx;
	}
	.result-img{
		width: 136rpx;
		height: 136rpx;
	}
	.main{
		margin-top: 10rpx;
		font-weight: 500;
		font-size: 32rpx;
		line-height: 44rpx;
		color: #192135;
	}
	.sub{
		margin-top: 20rpx;
		font-size: 28rpx;
		line-height: 44rpx;
		color: #C1C1C1;
	}
	.btn-wrap{
		margin-top: 60rpx;
	}
	.info {
		display: flex;
		align-items: center;
		padding: 20rpx 40rpx;
		color: #c0c0c0;
		box-shadow: 3rpx 3rpx 12rpx 12rpx #eee;
		border-top: solid 1px #e1e1e1;
		border-bottom: solid 1px #e1e1e1;
		.title {
			width: 180rpx;
			padding-right: 0;
			min-width: 180rpx;
			font-weight: bold;
			color: #333;
		}
	}
</style>
