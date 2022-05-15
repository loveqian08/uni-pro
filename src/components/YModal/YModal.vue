<template>
	<view>
		<uni-popup ref="smTip" type="center" :mask-click="false">
			<view class="sm-wrap">
				<view class="sm-title">{{ title }}</view>
				<view class="content-txt" :style="{'color': msgColor,'font-size': fontSize, 'line-height':lineHeight }">{{ msg }}</view>
				<view class="sm-footer">
					<view class="canselBtn" 
						v-if="showCansel" 
						:style="{'color': canselBtnColor, 'font-size': canselSize}"
						@tap="closeTip">{{ canselBtn }}</view>
					<view class="middleBar"  v-if="showCansel"></view>
					<view class="confirmBtn" 
						:style="{'color': confirmBtnColor, 'font-size': confirmSize, 'width': showCansel ? '50%' : '100%'}" 
						@tap="submitConfirm">{{ confirmBtn }}</view>
				</view>
				
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		props: {
			lineHeight: {
				type: String,
				default: '38rpx'
			},
			fontSize: {
				type: String,
				default: '26rpx'
			},
			msg: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: '温馨提示'
			},
			confirmBtn: {
				type: String,
				default: '确认'
			},
			canselBtn: {
				type: String,
				default: '取消'
			},
			showCansel: {
				type: Boolean,
				default:false
			},
			confirmBtnColor: {
				type: String,
				default: '#EB2B2B'
			},
			canselBtnColor: {
				type: String,
				default: '#999999'
			},
			confirmSize: {
				type: String,
				default: '30rpx'
			},
			canselSize: {
				type: String,
				default: '30rpx'
			},
			msgColor:  {
				type: String,
				default: '#333'
			}
		},
		data() {
			return {
				// msg: '',
				// title: '温馨提示',
				// confirmBtn: '确认',
				// canselBtn: '取消',
				// showCansel: false,
				// confirmBtnColor: '#EB2B2B',
				// canselBtnColor: '#999999',
				// confirmSize: '30rpx',
				// canselSize: '30rpx'
			}
		},
		methods: {
			openTip () {
				this.$refs.smTip.open();
			},
			closeTip () {
				this.$refs.smTip.close();
				this.$emit("canselChoose");
			},
			submitConfirm() {
				this.$emit("submitConfirm");
				this.$refs.smTip.close();
			}
		}
	}
</script>

<style scoped lang="scss">
.sm-wrap {
		width: 620rpx;
		// height: 300rpx;
		margin: 0 auto;
		padding-top: 40rpx;
		background: #fff;
		border-radius: 16rpx;
	}
	.sm-title {
		width: 100%;
		text-align: center;
		font-family: PingFangSC-Medium;
		font-size: 36rpx;
		color: #222222;
		margin-bottom: 16rpx;
	}
	.content-txt {
		font-family: PingFangSC-Regular;
		font-size: 24rpx;
		color: #222222;
		letter-spacing: 0;
		text-align: center;
		font-weight: 400;
		padding: 0 32rpx;
		line-height: 38rpx;
		margin-bottom: 32rpx;
	}
	.sm-footer {
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		border-top: 1rpx solid #EEEEEE;
		font-size: 36rpx;
		color: #EB2B2B;
		letter-spacing: 0;
		text-align: center;
		font-weight: 400;
		overflow: hidden;
		position: relative;
		.canselBtn,.confirmBtn {
			float: left;
			width: 50%;
			text-align: center;
			height: 100%;
		}
		.confirmBtn {
			float: right;
		}
		.middleBar {
			width: 1rpx;
			height: 80rpx;
			background: #EEEEEE;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translateX(-50%) translateY(-50%);
		}
	}
</style>
