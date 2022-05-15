<template>
	<view class="couponGet">
	<uni-popup ref="couponsPop" type="bottom">
		<view class="pop-container">
			<view class="popup-title">
				<view class="u-popup-cancel-btn" @tap="closePop">取消</view>
				<view class="u-title">领取助力券</view>
				<!-- <view class="u-popup-sure-btn" @tap="sumbitPop">确定</view> -->
			</view>
			<view class="coupon-container" @tap="toggleCoupon">
				<scroll-view scroll-y="true" class="scroll-Y" style="height: 800rpx;">
					<view class="info" v-for="(item, index) in getCouponList" :key="index">
						<view class="left">
							<image class="img" style="z-index: 0;" src="../pageCk/static/imgs/product/zczq/couponBg.png" mode="">
							</image>
							<view style="position:absolute;width:100%;height:100%;left: 0;top:0;z-index: 2;">
								<view class="rate">{{item.discount}}</view>
								<view class="txt">{{item.strategyName}}</view>
							</view>
						</view>
						<view class="right">
							<view class="top-title">
								<view class="title">{{item.couponName}}</view>
								<text
								  class="help"
								  @tap.stop="showTips(item)"
								  >!</text>
							</view>
							
							<view class="desc">{{item.useDesc}}</view>
							<view class="detail">
								<!-- {{item.startTime.substr(0,10)}}至 -->
								<text>{{item.startTime.substr(0,10).replace(/-/g, '/')}}~{{item.endTime.substr(0,10).replace(/-/g, '/')}}</text>
								<view class="choose-icon" @tap="getCoupon(item)">
									点击领取
									<!-- <image v-if="chooseCoupon || xybInfo.accountNo" class="choosed" src="../../../static/imgs/product/zczq/chooseIcon.png" mode=""></image> -->
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</uni-popup>
	<view class="cus-dialog" id="tipsDialog" @tap="hideTips" v-if="isShowTips">
	 <view class="dialog-mask"></view>
	 <view class="dialog-body" id="popupHtml"> 
		  <scroll-view scroll-y="true" class="" style="max-height: 400rpx;min-height: 200rpx;">
			<view style="text-align:center;">
				<rich-text :nodes="couponName"></rich-text>
			</view>
				<view>
					<rich-text :nodes="useDetail"></rich-text>
				</view>
			</scroll-view>
		  </view>
	</view>
	</view>
</template>

<script>
	import {
		uniPopup,
		uniIcons
	} from "@dcloudio/uni-ui";
	export default {
		components: {
			uniPopup,
			uniIcons,
		},
		mounted() {
			// this.query();
		},
		name:"YCouponGet",
		data() {
			return {
				chooseCoupon: false,
				getCouponList: [],
				couponName: '',
				useDetail: '',
				isShowTips: false,
			};
		},
		methods: {
			open () {
				this.$refs.couponsPop.open();
			},
			query(flag) {
				var json = {
					productCategory: "DEPOSIT",
					conditions: [{
						itemCode: "PRODUCT", //产品
						itemValue: "zheng_cun_zheng_qu",
					}, ]
				}
				return this.$http
					.post("coupons/canGetCouponList", json)
					.then((res) => {
						flag && uni.hideLoading();
						if (res.STATUS == '1') {
							if (res.couponsList && res.couponsList.length > 0) {
								res.couponsList.forEach((curr) => {
									if (curr.couponType == "DEPOSIT_RATE") {
										let num = JSON.parse(curr.couponSettingValue).raiseRate || "0";
										curr.discount = num + "%";
									} else {
										let num = Number(curr.discount) * 10 || "0";
										curr.discount = num + "折";
									}
								});
							}
							console.error("元凯", res.couponsList)
							this.getCouponList = res.couponsList;
							return Promise.resolve();
						} else {
							flag && uni.hideLoading();
							uni.showToast({
								title: res.MSG,
								icon: 'none'
							})
							return Promise.reject();
						}
						
					});
			},
			getCoupon (item) {
				this.$emit("getCoupon", item)
			},
			//选择券
			toggleCoupon() {
				this.chooseCoupon = !this.chooseCoupon;
			},
			//选择券pop关闭
			closePop() {
				this.$refs.couponsPop.close();
			},
			hideTips(){
				this.isShowTips = false;  
			},
			showTips(item){
				console.error("点击了我")
				this.couponName = item.couponName;
				this.useDetail = item.useDetail.replace(/(^\s+)|(\s+$)|\s+/g,'<br>');
				this.isShowTips = true;
				setTimeout(()=>{
					this.isShowTips = false;
				}, 3000);
			},
		}
	}
</script>

<style scoped lang="scss">
	@import "@/styles/mixins.scss";
	.pop-container {
		height: 940rpx;
		background: #FFFFFF;
	
		.popup-title {
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 32rpx;
	
			.u-popup-cancel-btn {
				font-family: PingFangSC-Regular;
				font-size: 28rpx;
				color: #999999;
				text-align: left;
				font-weight: 400;
				width: 100rpx;
			}
	
			.u-title {
				flex: 1;
				font-family: PingFangSC-Regular;
				font-size: 36rpx;
				color: #333333;
				text-align: center;
				font-weight: 400;
			}
	
			.u-popup-sure-btn {
				font-family: PingFangSC-Regular;
				font-size: 28rpx;
				color: #FF6066;
				text-align: right;
				font-weight: 400;
				width: 100rpx;
			}
		}
	
		.coupon-container {
			padding: 20rpx 32rpx;
			padding-right: 24rpx;
			height: 800rpx;
			overflow: scroll;
			box-sizing: border-box;
	
			.labels {
				font-family: PingFangSC-Regular;
				font-size: 26rpx;
				color: #999999;
				letter-spacing: 0;
				text-align: justify;
				font-weight: 400;
				margin-top: 50rpx;
	
				.label {
					margin-bottom: 20rpx;
					line-height: 40rpx;
				}
			}
	
			.info {
				width: 98%;
				margin-top: 20rpx;
				display: flex;
				// white-space: nowrap;
	
				.left {
					width: 172rpx;
					height: 220rpx;
					// background-image: url(../../../static/imgs/product/zczq/couponBg.png);
					// background-size: cover;
					// display: flex;
					align-items: center;
					flex-wrap: wrap;
					box-sizing: border-box;
					position: relative;
	
					.img {
						width: 172rpx;
						height: 220rpx;
						position: inherit;
					}
	
					.rate {
						position: absolute;
						width: 100%;
						text-align: center;
						font-family: DINAlternate-Bold;
						font-size: 50rpx;
						color: #FFFFFF;
						letter-spacing: 0;
						top: 60rpx;
						z-index: 2;
					}
	
					.txt {
						position: absolute;
						width: 100%;
						text-align: center;
						font-family: PingFangSC-Regular;
						font-size: 24rpx;
						color: #FFFFFF;
						letter-spacing: 0;
						top: 130rpx;
						z-index: 2;
						@include clamp(3);
					}
				}
	
				.right {
					flex: 1;
					padding: 0 32rpx;
					height: 220rpx;
					box-sizing: border-box;
					background: #FFFFFF;
					box-shadow: 0 0 24rpx 0 rgba(43, 41, 41, 0.09);
					border-radius: 16rpx;
					overflow: hidden;
					position: relative;
					.top-title {
						width: 100%;
					}
					.title {
						font-family: PingFangSC-Regular;
						font-size: 28rpx;
						color: #666666;
						letter-spacing: 0;
						margin-top: 12rpx;
						line-height: 40rpx;
						height: 40rpx;
						width: 88%;
						display: inline-block;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						vertical-align: middle;
					}
	
					.desc {
						font-family: PingFangSC-Regular;
						font-size: 24rpx;
						color: #999999;
						letter-spacing: 0;
						line-height: 36rpx;
						@include clamp(3);
					}
					.help {
						 font-size: 20rpx;
						  display: inline-block;
						  line-height: 24rpx;
						  padding: 2rpx;
						  height: 32rpx;
						  width: 32rpx;
						  border-radius: 32rpx;
						  border:  2rpx solid #ae824f;
						  color: #ae824f;
						  margin-left: 10rpx;
						  margin-top: 12rpx;
						  vertical-align: middle;
						  text-align: center;
					}
					.detail {
						    font-family: PingFangSC-Regular;
						    font-size: 24rpx;
						    color: #999999;
						    letter-spacing: 0;
						    line-height: 19px;
						    height: 36rpx;
						    white-space: nowrap;
						    position: relative;
						    position: absolute;
						    left: 0;
						    width: 100%;
						    bottom: 20rpx;
						    padding: 0 32rpx;
						    box-sizing: border-box;
	
						.choose-icon {
							position: absolute;
							bottom: -4rpx;
							right: 32rpx;
							width: 120rpx;
							height: 44rpx;
							line-height: 44rpx;
							background-image: linear-gradient(270deg, #ED3362 0%, #FB9784 100%);
							text-align: center;
							color: #fff;
							border-radius: 22rpx;
							font-family: PingFangSC-Regular;
							font-size: 20rpx;
	
							.choosed {
								width: 32rpx;
								height: 32rpx;
								// background-image: url(../../../static/imgs/product/zczq/chooseIcon.png);
								// background-size: cover;
								border: none;
							}
						}
					}
				}
			}
		}
	}
#couponGet .popup {
		/* display: none; */
		z-index: 5;
		height: 0;
	}

	#couponGet .popup.show {
		display: block;
		height: auto;
	}

	#couponGet .popup.show .popup-mask {
		opacity: 1;
		pointer-events: auto;
	}

	#couponGet .popup.show .popup-container {
		-webkit-transform: translate(0, 0);
		-ms-transform: translate(0, 0);
		transform: translate(0, 0);
	}

	#couponGet .popup .popup-mask {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 5;
		background-color: rgba(100, 100, 100, 0.6);
		pointer-events: none;
		opacity: 0;
		-webkit-transition: opacity 0.3s ease-in;
		transition: opacity 0.3s ease-in;
	}

	#couponGet .popup .popup-container {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 6;
		-webkit-transform: translate(0, 100%);
		-ms-transform: translate(0, 100%);
		transform: translate(0, 100%);
		-webkit-transition: -webkit-transform 0.3s;
		transition: -webkit-transform 0.3s;
		transition: transform 0.3s;
		transition: transform 0.3s, -webkit-transform 0.3s;
	}

	#couponGet .coupon-popup-area {
		background-color: #fff;
		border-radius: 40rpx 40rpx 0 0;
		padding: 60rpx;
	}

	#couponGet .coupon-popup-area .title {
		font-weight: 500;
		font-size: 32rpx;
		line-height: 44rpx;
		color: #222222;
	}

	#couponGet .coupon-popup-area .coupon-content {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
	}

	#couponGet .coupon-popup-area .coupon-tip {
		margin: 40rpx 0 20rpx;
		font-size: 24rpx;
		line-height: 24rpx;
		color: #353535;
	}

	#couponGet .coupon-popup-area .coupon-item {
		position: relative;
		margin-top: 20rpx;
		background: #ffffff;
		border: 2rpx solid #e84848;
		// border: 2rpx solid #CBCFD6;
		box-sizing: border-box;
		border-radius: 6rpx;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
	}

	#couponGet .coupon-popup-area .coupon-item.cannot-use {
		background: #ffffff;
		border: 1px solid #e1e1e1;
	}

	#couponGet .coupon-popup-area .coupon-item.cannot-use .explain,
	#couponGet .coupon-popup-area .coupon-item.cannot-use .sub,
	#couponGet .coupon-popup-area .coupon-item.cannot-use .explain .sub-dec {
		color: #cbcbcb !important;
	}

	#couponGet .coupon-popup-area .coupon-item.cannot-use .coupon-mame {
		line-height: 40rpx;
	}

	#couponGet .coupon-popup-area .coupon-item .coupon-mame .name {
		display: inline-block;
		vertical-align: middle;
	}

	#couponGet .coupon-popup-area .coupon-item .coupon-mame .help {
		font-size: 20rpx;
		display: inline-block;
		line-height: 24rpx;
		padding: 2rpx;
		height: 32rpx;
		width: 32rpx;
		border-radius: 32rpx;
		border: solid 2rpx #ae824f;
		color: #ae824f;
		margin-left: 10rpx;
		margin-top: -4rpx;
		vertical-align: middle;
		text-align: center;
		/* position: absolute;
	text-align: center;
	right: 5px;
	top: 3px; */
	}

	#couponGet .coupon-popup-area .coupon-item .select-tip {
		display: none;
		position: absolute;
		top: 0;
		right: 0;
		width: 100rpx;
		height: 100rpx;
		border-top-right-radius: 6rpx;
		background: linear-gradient(45deg,
				transparent,
				transparent 50%,
				#e84848 50%,
				#e84848);
	}

	#couponGet .coupon-popup-area .coupon-item .select-tip img {
		position: absolute;
		width: 40rpx;
		height: 40rpx;
		top: 12rpx;
		right: 12rpx;
	}

	#couponGet .coupon-popup-area .coupon-item:first-child {
		margin-top: 0;
	}

	#couponGet .coupon-popup-area .coupon-item.selected .select-tip {
		display: block;
	}

	#couponGet .coupon-popup-area .main {
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		-ms-flex-pack: justify;
		justify-content: space-between;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		margin-bottom: 30rpx;
		position: relative;
		/* height: 70px; */
	}

	#couponGet .coupon-popup-area .main:after {
		content: " ";
		position: absolute;
		left: 0;
		bottom: -30rpx;
		right: 0;
		height: 2rpx;
		border-top: 2rpx solid #dedfe0;
		color: #dedfe0;
		-webkit-transform-origin: center bottom;
		-ms-transform-origin: center bottom;
		transform-origin: center bottom;
		-webkit-transform: scaleY(0.5);
		-ms-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	#couponGet .coupon-popup-area .explain {
		font-weight: 500;
		font-size: 36rpx;
		margin: 10rpx 0;
		color: #222222;
	}

	#couponGet .coupon-popup-area .sub-dec {
		margin-top: 4rpx;
		font-size: 24rpx;
		line-height: 34rpx;
		color: #999999;
	}

	#couponGet .coupon-popup-area .sub {
		font-size: 24rpx;
		line-height: 76rpx;
		color: #b3b3b3;
	}

	#couponGet .coupon-popup-area .close-icon {
		position: absolute;
		right: 30rpx;
		top: 30rpx;
		padding: 6rpx;
		width: 56rpx;
		height: 56rpx;
	}

	#couponGet .coupon-popup-area .close-icon img {
		width: 56rpx;
		height: 56rpx;
	}

	#couponGet .coupon-popup-area .coupon-sel-list {
		min-height: 400rpx;
		max-height: 800rpx;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
		overflow-scrolling: touch;
	}

	#couponGet .coupon-popup-area .coupon-item .coupon-item-left {
		width: 160rpx;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: justify;
		-webkit-justify-content: center;
		-ms-flex-pack: justify;
		justify-content: center;
		-ms-flex-direction: column;
		-webkit-flex-direction: column;
		flex-direction: column;
		color: #e84848;
		background-color: #f7d8d8;
		font-size: 28rpx;
	}

	#couponGet .coupon-popup-area .coupon-item.cannot-use .coupon-item-left {
		color: #c0c0c0;
		background-color: #e1e1e1;
	}

	#couponGet .coupon-popup-area .coupon-item .coupon-item-left .coupon-title {
		font-size: 44rpx;
	}

	#couponGet .coupon-popup-area .coupon-item .coupon-item-left .coupon-name {
		text-align: center;
	}

	#couponGet .coupon-popup-area .coupon-item .coupon-item-right {
		padding: 0 32rpx;
		-ms-flex: 1;
		-webkit-flex: 1;
		-webkit-box-flex: 1;
		flex: 1;
	}

	#couponGet .popup .popup-container .old-amt,
	#couponGet .popup .popup-container .old-amt-item {
		text-decoration: line-through;
		color: #b3b3b3;
	}

	#couponGet .popup .popup-container #popupIntTotAmt {
		color: #fe7700;
	}

	#couponGet .cus-dialog.active .dialog-mask,
	#couponGet .cus-dialog.active .dialog-body {
		opacity: 1;
		// pointer-events: auto;
		z-index: 9;
	}

	#couponGet .cus-dialog .dialog-mask {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.3);
		opacity: 0;
		pointer-events: none;
		-webkit-transition: opacity 0.2s linear;
		transition: opacity 0.2s linear;
	}

	#couponGet .cus-dialog .dialog-body {
		position: fixed;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		-ms-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		width: 532rpx;
		min-height: 260rpx;
		overflow: auto;
		background-color: rgba(0, 0, 0, 0.8);
		color: #fff;
		text-align: left;
		padding: 32rpx;
		border-radius: 16rpx;
		opacity: 0;
		// pointer-events: none;
		-webkit-transition: opacity 0.2s linear;
		transition: opacity 0.2s linear;
	}

	#couponGet .current.coupon-item-left {
		color: #e84848;
	}

	#couponGet .current.coupon-item {
		border: 2rpx solid #e84848;
	}
	
	#CouponPanel .cus-dialog{
    z-index: 99;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
#CouponPanel .cus-dialog.active .dialog-mask,
#CouponPanel .cus-dialog.active .dialog-body {
  opacity: 1;
  pointer-events: auto;
  z-index: 9;
}
#CouponPanel .cus-dialog .dialog-mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
//   opacity: 0;
  pointer-events: none;
  -webkit-transition: opacity 0.2s linear;
  transition: opacity 0.2s linear;
}
#CouponPanel .cus-dialog .dialog-body {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 532rpx;
  min-height: 260rpx;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  text-align: left;
  padding: 32rpx;
  border-radius: 16rpx;
//   opacity: 0;
  // pointer-events: none;
  -webkit-transition: opacity 0.2s linear;
  transition: opacity 0.2s linear;
}



.cus-dialog{
    z-index: 99;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
.cus-dialog.active .dialog-mask,
.cus-dialog.active .dialog-body {
  opacity: 1;
  pointer-events: auto;
  z-index: 9;
}
.cus-dialog .dialog-mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  // opacity: 0;
  pointer-events: none;
  -webkit-transition: opacity 0.2s linear;
  transition: opacity 0.2s linear;
}
.cus-dialog .dialog-body {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 532rpx;
  min-height: 260rpx;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  text-align: left;
  padding: 32rpx;
  border-radius: 16rpx;
  // opacity: 0;
  -webkit-transition: opacity 0.2s linear;
  transition: opacity 0.2s linear;
}

</style>
