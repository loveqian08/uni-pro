<template>
    <uni-popup ref="confirmPop" type="center" :mask-click="false">
    	<view class="pop-content">
    		<view class="pop-title">{{ title }}</view>
            <scroll-view scroll-y="true" class="pop-message">
                <view v-html="message" :style="'text-align:' + align"></view>
            </scroll-view>
    		<view class="btns-line1 b-t" v-if="cancelButtonText.length > 0 || confirmButtonText.length > 0"></view>
    		<view class="buttons" v-if="cancelButtonText.length > 0 || confirmButtonText.length > 0">
    			<view class="button-wrap" v-if="cancelButtonText.length > 0" @click="cancel">
    				<view class="btn-cancel">{{ cancelButtonText }}</view>
    			</view>
    			<view class="btns-line2 b-t" v-if="cancelButtonText.length > 0 && confirmButtonText.length > 0"></view>
    			<view class="button-wrap" v-if="confirmButtonText.length > 0" @click="confirm">
    				<view class="btn-confirm" :style="confirmButtonStyle">{{ confirmButtonText }}</view>
    			</view>
    		</view>
    	</view>
    </uni-popup>
</template>

<script>
	import { uniPopup } from '@dcloudio/uni-ui';
	export default {
		data() {
			return {

			};
		},
		components: {
			uniPopup,
		},
		props: {
			// 标题文本
			title: {
				type: String,
				default: '温馨提示',
			},
			// 内容文本
			message: {
				type: String,
				default: '',
			},
			// 文本align
			align: {
				type: String,
				default: 'center', // left、right、center...
			},
			// 确认按钮文本
			confirmButtonText: {
				type: String,
				default: '确认',
			},
			// 取消按钮文本
			cancelButtonText: {
				type: String,
				default: '',
			},
			confirmButtonStyle: {
				type: String,
				default: ''
			},
			// 其他参数
			params: {
				type: Object,
				default: {},
			}
		},
        methods: {
            cancel() {
				this.close();
                this.$emit('cancelAct');
			},
			confirm() {
				this.close();
                this.$emit('okAct', this.params);
			},
			open() {
				this.$refs.confirmPop.open();
			},
			close() {
				this.$refs.confirmPop.close();
			}
        }
	}
</script>

<style lang="scss" scoped>
	.pop-content{
		width: 540rpx;
		height: auto;
		background: #FFFFFF;
		border-radius: 16rpx;
		padding: 0.5rpx;
		.pop-title{
			margin-top: 48rpx;
			height: 50rpx;
			font-family: PingFangSC-Medium;
			font-size: 32rpx;
			color: #222222;
			letter-spacing: 0;
			text-align: center;
			font-weight: 500;
		}
		.pop-message{
			margin: 18rpx 32rpx 48rpx;
			font-family: PingFangSC-Regular;
			font-size: 26rpx;
			color: #222222;
			letter-spacing: 0;
			text-align: center;
			font-weight: 400;
			max-height: 640rpx;
            width: 476rpx;
			line-height: 40rpx;
			overflow-y: auto;
			overflow-x: hidden;
		}
		.btns-line1{
			width: 100%;
			background: #EEEEEE;
		}
		.buttons{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 104rpx;
			.button-wrap{
				flex-grow: 1;
				width: 270rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				.btn-cancel{
					font-family: PingFangSC-Regular;
					font-size: 32rpx;
					color: #999999;
					letter-spacing: 0;
					text-align: center;
					font-weight: 400;
				}
				.btn-confirm{
					font-family: PingFangSC-Regular;
					font-size: 32rpx;
					color: #EB2B2B;
					letter-spacing: 0;
					text-align: center;
					font-weight: 400;
				}
			}
			.btns-line2{
				height: 63rpx;
				background: #EEEEEE;
				width: 0.5rpx;
			}
		}
	}
</style>
