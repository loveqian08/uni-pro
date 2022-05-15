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
		<view class="btn-wrap" v-if="!hideBtn">
			<navigator v-if="exit" open-type="exit" target="miniProgram" hover-class="navigator-hover">
				<button class="primary-btn" plain >{{btnText}}</button>
			</navigator>
			<button v-else class="primary-btn" plain @tap="finish">{{btnText}}</button>
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
			btnText: {
				type: String,
				default: '完成'
			},
			className: {
				type: String,
				default: ''
			},
			hideBtn: {
				type: Boolean,
				default: false
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
</style>
