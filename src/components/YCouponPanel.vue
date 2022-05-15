<template>
<view id="CouponPanel">
  <view class="popup show" id="couponPopup">
    <view class="popup-mask" @tap="closeCouponPopup"></view>
    <view class="popup-container">
      <view class="coupon-popup-area">
        <view class="title">
          <view>选择助力券</view>
        </view>
        <view class="close-icon" @tap="closeCouponPopup">
          <image src="@/static/imgs/error@3x.png" mode="scaleToFill"></image>
			 <!-- <image src="@/static/imgs/check-white.png"></image> -->
		</view>
        <view class="coupon-content">
          <view class="coupon-tip"
            >您有<text id="couponCountSpan">{{ couponList.length }}</text
            >张助力券待使用，每次限用1张</view
          >
          <view class="coupon-sel-list">
            <view class="itemOne" v-for="(item, index) in couponList" :key="index">
              <view
                class="coupon-item"
                :class="{
                  
                  selected: index === currCouponIndex,
                }"
                :id="'couponItem' + index"
                @tap="chooseCoupon(item, index)"
              >
				<image style="position: absolute;left: 0;top: 0;width: 100%;height: 224rpx;" src="/static/imgs/couponUnuse.png" mode="" v-if="!item.isUse || item.isUse !== 'true'"></image>
				<image style="position: absolute;left: 0;top: 0;width: 100%;height: 224rpx;" src="/static/imgs/couponUse.png" mode="" v-else></image>
                <view class="coupon-item-left">
                  <view class="coupon-title">{{ item.discount }}</view>
                  <view class="coupon-name">{{ item.strategyName }}</view>
                </view>
                <view class="coupon-item-right">
                  <view class="main">
                    <view class="explain">
                      <view class="coupon-mame">
                        <text class="couponTitle">{{ item.couponName }}</text>
                        <text
						   style="display: inline-block;"
                          v-if="item.useDetail"
                          class="help"
                          @tap.stop="showTips(item)"
                          >!</text
                        > </view
                      ><view class="sub-dec">{{ item.useDesc }}</view>
                    </view>
                  </view>
                  <view class="sub"
                    >有效期{{ item.startTime }}~{{ item.endTime }}</view
                  >
                </view>
                <view class="select-tip">
				  <view class="check-img"></view>
                  <!-- <image src="/static/imgs/close.png"></image> -->
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="cus-dialog" id="tipsDialog" @tap="hideTips" v-if="isShowTips">
      <view class="dialog-mask"></view>
      <view class="dialog-body" id="popupHtml"> 
        <view style="text-align:center;">
            <rich-text :nodes="couponName"></rich-text>
        </view>
        <view>
            <rich-text :nodes="useDetail"></rich-text>
        </view>
      </view>
    </view>
  </view>
  </view>
</template>

<script>
import { uniPopup } from "@dcloudio/uni-ui";
import YIcons from "@/components/YIcons.vue";
import format from "@/common/format.js";
export default {
  components: {
    uniPopup,
    YIcons,
  },
  props: {
      url:null,
      params:null,
      orderVal: {
        type: String & Number,
        default: ""
      },
  },
  data() {
    return {
      couponList: [],
      currSelectedCoupon: null,
      currCouponIndex: -1,
      option: {
        couponId: null,
      },
      isShowTips:false,
      couponName:'',
      useDetail:'',
    };
  },
  created() {
    this.queryCanUseCoupons();
  },
  methods: {
      closeCouponPopup(){
        this.$emit('afterChoose', false);
      },
      chooseCoupon(item,index){
          if(!item.isUse || item.isUse!=="true"){
              return;
          }
          if (!this.orderVal) {
            uni.showToast({
                title: "请输入金额后再选助力券",
                icon: "none",
                duration: 3000,
            });
            return false;
          }
		if (index == this.currCouponIndex) {
			this.currCouponIndex = -1;
		} else {
			this.currCouponIndex = index;
		}
		this.setSelectCoupon(this.currCouponIndex)
      },
      setSelectCoupon(index){
        this.currCouponIndex = index;
		if (this.currCouponIndex - 0 > -1) {
            this.currSelectedCoupon = this.couponList[this.currCouponIndex];
            try {
                if (typeof this.currSelectedCoupon === 'string') {
                    this.currSelectedCoupon = JSON.parse(this.currSelectedCoupon);
                }
            } catch (e) {
                console.error(e);
                this.currSelectedCoupon = null;
            }		
		} else {
			this.currSelectedCoupon = null;
		}
    this.$emit('afterChoose', this.currSelectedCoupon);
      },
      showTips(item){
          this.couponName = item.couponName;
          this.useDetail = item.useDetail.replace(/(^\s+)|(\s+$)|\s+/g,'<br>');
          this.isShowTips = true;
          setTimeout(()=>{
              this.isShowTips = false;
          },3000)
        //   alert(8767)
      },
      hideTips(){
          this.isShowTips = false;
      },
    findIndex(list, compare) {
      for (var i = 0, len = list.length; i < len; ++i) {
        if (compare(list[i])) {
          return i;
        }
      }
      return -1;
    },
    queryCanUseCoupons() {
      this.$global.showModalLoading();
      this.$http
        .post(this.url, this.params)
        .then((rsp) => {
          uni.hideLoading();
          if (rsp && rsp.STATUS == "1") {
            this.list = rsp.couponsList || [];
            var isUseList = 0;
            this.list.forEach(function (item) {
              item.startTime = format.fmtDate(
                item.startTime
                  .replace(/-/g, "/")
                  .replace(/T/g, " ")
                  .replace(/\.\d*\+\d*/, ""),
                "yyyy/MM/dd"
              );
              item.endTime = format.fmtDate(
                item.endTime
                  .replace(/-/g, "/")
                  .replace(/T/g, " ")
                  .replace(/\.\d*\+\d*/, ""),
                "yyyy/MM/dd"
              );
              var obj = JSON.parse(item.couponSettingValue || "{}");
              item.discount = obj.discount || "";
              if (item.isUse && item.isUse === "true") {
                isUseList++;
              }
            });
            if (this.option && this.option.couponId) {
              var idx = this.findIndex(this.list, function (item) {
                return item.couponId == this.option.couponId;
              });
              if (idx !== -1) {
                this.currCouponIndex = idx;
              }
            }
            this.list.forEach((curr) => {
              if (curr.couponType == "DEPOSIT_RATE") {
                let num = JSON.parse(curr.couponSettingValue).raiseRate || "0";
                curr.discount = num + "%";
              } else {
                let num = Number(curr.discount) * 10 || "0";
                curr.discount = num + "折";
              }
            });
            this.couponList = this.list;
              this.$emit('afterRefreshCoupon', {
                list:this.couponList,
                number:isUseList,
                currCouponIndex:this.currCouponIndex
              });
          } else {
            uni.hideLoading();
            this.couponList = [];
            this.currCouponIndex = -1;
              this.$emit('afterRefreshCoupon', {
                list:this.couponList,
                number:0,
                currCouponIndex:-1
              });
            uni.showToast({
              title: rsp.MSG || "网络异常",
              icon: "none",
              duration: 3000,
            });
          }
          this.setSelectCoupon(this.currCouponIndex);
        })
        .catch((err) => {
          uni.hideLoading();
          uni.showToast({
            title: err.message || "网络异常",
            icon: "none",
            duration: 3000,
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
//  .popup {
//   z-index: 5;
//   height: 0;
// }

//  .popup.show {
//   display: block;
//   height: auto;
// }

//  .popup.show .popup-mask {
//   opacity: 1;
//   pointer-events: auto;
// }

//  .popup.show .popup-container {
//   -webkit-transform: translate(0, 0);
//   -ms-transform: translate(0, 0);
//   transform: translate(0, 0);
// }

//  .popup .popup-mask {
//   position: fixed;
//   left: 0;
//   right: 0;
//   top: 0;
//   bottom: 0;
//   z-index: 5;
//   background-color: rgba(100, 100, 100, 0.6);
//   pointer-events: none;
//   opacity: 0;
//   -webkit-transition: opacity 0.3s ease-in;
//   transition: opacity 0.3s ease-in;
// }

//  .popup .popup-container {
//   position: fixed;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   z-index: 6;
//   -webkit-transform: translate(0, 100%);
//   -ms-transform: translate(0, 100%);
//   transform: translate(0, 100%);
//   -webkit-transition: -webkit-transform 0.3s;
//   transition: -webkit-transform 0.3s;
//   transition: transform 0.3s;
//   transition: transform 0.3s, -webkit-transform 0.3s;
// }

//  .coupon-popup-area {
//   background-color: #fff;
//   border-radius: 10px 10px 0 0;
//   padding: 30px;
// }

//  .coupon-popup-area .title {
//   font-weight: 500;
//   font-size: 16px;
//   line-height: 22px;
//   color: #222222;
// }

//  .coupon-popup-area .coupon-content {
//   -webkit-box-flex: 1;
//   -webkit-flex: 1;
//   -ms-flex: 1;
//   flex: 1;
// }

//  .coupon-popup-area .coupon-tip {
//   margin: 20px 0 10px;
//   font-size: 12px;
//   line-height: 12px;
//   color: #353535;
// }

//  .coupon-popup-area .coupon-item {
//   position: relative;
//   margin-top: 10px;
//   background: #ffffff;
//   border: 1px solid #e84848;
//   box-sizing: border-box;
//   border-radius: 3px;
//   display: -webkit-box;
//   display: -webkit-flex;
//   display: -ms-flexbox;
//   display: flex;
// }

//  .coupon-popup-area .coupon-item.cannot-use {
//   background: #ffffff;
//   border: 1px solid #e1e1e1;
// }
//  .coupon-popup-area .coupon-item.cannot-use .explain,
//  .coupon-popup-area .coupon-item.cannot-use .sub,
//  .coupon-popup-area .coupon-item.cannot-use .explain .sub-dec {
//   color: #cbcbcb !important;
// }
//  .coupon-popup-area .coupon-item.cannot-use .coupon-mame {
//   line-height: 20px;
// }
//  .coupon-popup-area .coupon-item .coupon-mame .name {
//   display: inline-block;
//   vertical-align: middle;
// }
//  .coupon-popup-area .coupon-item .coupon-mame .help {
//   font-size: 10px;
//   display: inline-block;
//   line-height: 12px;
//   padding: 1px;
//   height: 16px;
//   width: 16px;
//   border-radius: 16px;
//   border: solid 1px #ae824f;
//   color: #ae824f;
//   margin-left: 5px;
//   margin-top: -2px;
//   vertical-align: middle;
//   text-align: center;
// }
//  .coupon-popup-area .coupon-item .select-tip {
//   display: none;
//   position: absolute;
//   top: 0;
//   right: 0;
//   width: 50px;
//   height: 50px;
//   border-top-right-radius: 3px;
//   background: linear-gradient(
//     45deg,
//     transparent,
//     transparent 50%,
//     #e84848 50%,
//     #e84848
//   );
// }

// .coupon-popup-area .coupon-item .select-tip .check-img {
// 	position: absolute;
// 	width: 36rpx;
// 	height: 27rpx;
// 	top: 12rpx;
// 	right: 2rpx;
// 	background: url('/static/imgs/check-white.png') no-repeat;
// 	background-size: contain;
// }

//  .coupon-popup-area .coupon-item:first-child {
//   margin-top: 0;
// }

//  .coupon-popup-area .coupon-item.selected .select-tip {
//   display: block;
// }

//  .coupon-popup-area .main {
//   display: -webkit-box;
//   display: -webkit-flex;
//   display: -ms-flexbox;
//   display: flex;
//   -webkit-box-pack: justify;
//   -webkit-justify-content: space-between;
//   -ms-flex-pack: justify;
//   justify-content: space-between;
//   -webkit-box-align: center;
//   -webkit-align-items: center;
//   -ms-flex-align: center;
//   align-items: center;
//   margin-bottom: 15px;
//   position: relative;
// }
//  .coupon-popup-area .main:after {
//   content: " ";
//   position: absolute;
//   left: 0;
//   bottom: -15px;
//   right: 0;
//   height: 1px;
//   border-top: 1px solid #dedfe0;
//   color: #dedfe0;
//   -webkit-transform-origin: center bottom;
//   -ms-transform-origin: center bottom;
//   transform-origin: center bottom;
//   -webkit-transform: scaleY(0.5);
//   -ms-transform: scaleY(0.5);
//   transform: scaleY(0.5);
// }
//  .coupon-popup-area .explain {
//   font-weight: 500;
//   font-size: 18px;
//   margin: 5px 0;
//   color: #222222;
// }

//  .coupon-popup-area .sub-dec {
//   margin-top: 2px;
//   font-size: 12px;
//   line-height: 17px;
//   color: #999999;
// }

//  .coupon-popup-area .sub {
//   font-size: 12px;
//   line-height: 38px;
//   color: #b3b3b3;
// }

//  .coupon-popup-area .close-icon {
//   position: absolute;
//   right: 15px;
//   top: 15px;
//   padding: 3px;
//   width: 56rpx;
//   height: 48rpx;
// }

//  .coupon-popup-area .close-icon image {
//   width: 56rpx;
//   height: 48rpx;
// }

//  .coupon-popup-area .coupon-sel-list {
//   min-height: 200px;
//   max-height: 400px;
//   overflow: auto;
//   -webkit-overflow-scrolling: touch;
//   overflow-scrolling: touch;
// }
//  .coupon-popup-area .coupon-item .coupon-item-left {
//   width: 80px;
//   display: -webkit-box;
//   display: -webkit-flex;
//   display: -ms-flexbox;
//   display: flex;
//   -webkit-box-align: center;
//   -webkit-align-items: center;
//   -ms-flex-align: center;
//   align-items: center;
//   -webkit-box-pack: justify;
//   -webkit-justify-content: center;
//   -ms-flex-pack: justify;
//   justify-content: center;
//   -ms-flex-direction: column;
//   -webkit-flex-direction: column;
//   flex-direction: column;
//   color: #e84848;
//   background-color: #f7d8d8;
//   font-size: 14px;
// }
//  .coupon-popup-area .coupon-item.cannot-use .coupon-item-left {
//   color: #c0c0c0;
//   background-color: #e1e1e1;
// }
//  .coupon-popup-area .coupon-item .coupon-item-left .coupon-title {
//   font-size: 22px;
// }
//  .coupon-popup-area .coupon-item .coupon-item-left .coupon-name {
//   text-align: center;
// }
//  .coupon-popup-area .coupon-item .coupon-item-right {
//   padding: 0 16px;
//   -ms-flex: 1;
//   -webkit-flex: 1;
//   -webkit-box-flex: 1;
//   flex: 1;
// }
//  .popup .popup-container .old-amt,
//  .popup .popup-container .old-amt-item {
//   text-decoration: line-through;
//   color: #b3b3b3;
// }
//  .popup .popup-container #popupIntTotAmt {
//   color: #fe7700;
// }
//  .cus-dialog{
//     z-index: 99;
//     position: fixed;
//     left: 0;
//     right: 0;
//     top: 0;
//     bottom: 0;
// }
//  .cus-dialog.active .dialog-mask,
//  .cus-dialog.active .dialog-body {
//   opacity: 1;
//   pointer-events: auto;
//   z-index: 9;
// }
//  .cus-dialog .dialog-mask {
//   position: fixed;
//   left: 0;
//   right: 0;
//   top: 0;
//   bottom: 0;
//   background: rgba(0, 0, 0, 0.3);
//   pointer-events: none;
//   -webkit-transition: opacity 0.2s linear;
//   transition: opacity 0.2s linear;
// }
//  .cus-dialog .dialog-body {
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   -webkit-transform: translate(-50%, -50%);
//   -ms-transform: translate(-50%, -50%);
//   transform: translate(-50%, -50%);
//   width: 266px;
//   min-height: 130px;
//   overflow: auto;
//   background-color: rgba(0, 0, 0, 0.8);
//   color: #fff;
//   text-align: left;
//   padding: 16px;
//   border-radius: 8px;
//   pointer-events: none;
//   -webkit-transition: opacity 0.2s linear;
//   transition: opacity 0.2s linear;
// }


.popup {
  /* display: none; */
  z-index: 5;
  height: 0;
}

.popup.show {
  display: block;
  height: auto;
}
.itemOne {
	margin-bottom: 20rpx;
	width: 100%;
	height: 224rpx;
}
.popup.show .popup-mask {
  opacity: 1;
  pointer-events: auto;
}

.popup.show .popup-container {
  -webkit-transform: translate(0, 0);
  -ms-transform: translate(0, 0);
  transform: translate(0, 0);
}

.popup .popup-mask {
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
.coupon-popup-area .coupon-item .select-tip .check-img {
	position: absolute;
	width: 27rpx;
	height: 21rpx;
	top: 12rpx;
	right: 2rpx;
	background: url('/static/imgs/check-white.png') no-repeat;
	background-size: contain;
}
.popup .popup-container {
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

.coupon-popup-area {
  background-color: #fff;
  border-radius: 20rpx 20rpx 0 0;
  padding: 60rpx 32rpx;
}

.coupon-popup-area .title {
  font-weight: 500;
  font-size: 32rpx;
  line-height: 44rpx;
  color: #222222;
}

.coupon-popup-area .coupon-content {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.coupon-popup-area .coupon-tip {
  margin: 40rpx 0 20rpx;
  font-size: 24rpx;
  line-height: 24rpx;
  color: #353535;
  border-radius: 12rpx;
}

.coupon-popup-area .coupon-item {
  position: relative;
  margin-top: 20rpx;
  box-sizing: border-box;
  border-radius: 6rpx;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: 100%;
  // background: url(../static/imgs/couponUse.png) no-repeat;
  background-size: contain;
}

.coupon-popup-area .coupon-item.cannot-use {
  // background: url(../static/imgs/couponUnuse.png) no-repeat;
  background-size: contain;
  color: #fff;
}
.coupon-popup-area .coupon-item.cannot-use .explain,
.coupon-popup-area .coupon-item.cannot-use .sub,
.coupon-popup-area .coupon-item.cannot-use .explain .sub-dec {
  color: #cbcbcb !important;
}
.coupon-popup-area .coupon-item.cannot-use .coupon-mame {
  width: 100%;
  line-height: 40rpx;
}
.couponTitle {
  width: 88%;
  display: inline-block;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  vertical-align: middle;
}
.coupon-popup-area .coupon-item .coupon-mame .name {
  display: inline-block;
  vertical-align: middle;
}
.coupon-popup-area .coupon-item .coupon-mame .help {
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
  margin-top: -4rpx;
  vertical-align: middle;
  text-align: center;
}
.coupon-popup-area .coupon-item .select-tip {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  width: 62rpx;
  height: 62rpx;
  border-top-right-radius: 16rpx;
  background: linear-gradient(
    45deg,
    transparent,
    transparent 50%,
    #e84848 50%,
    #e84848
  );
  // width: 60rpx;
  // height: 60rpx;
  // bottom: 10rpx;
  // right: 16rpx;
}

.coupon-popup-area .coupon-item .select-tip image {
  position: absolute;
  width: 24rpx;
  height: 20rpx;
  top: 8rpx;
  right: 6rpx;
}

.coupon-popup-area .coupon-item:first-child {
  margin-top: 0;
}

.coupon-popup-area .coupon-item.selected .select-tip {
  display: block;
}

.coupon-popup-area .main {
  margin-bottom: 42rpx;
  position: relative;
}
.coupon-popup-area .explain {
  font-weight: 500;
  font-size: 36rpx;
  margin-top: 14rpx;
  color: #222222;
}

.coupon-popup-area .sub-dec {
  margin-top: 10rpx;
  font-size: 24rpx;
  line-height: 28rpx;
  color: #999999;
}

.coupon-popup-area .sub {
  font-size: 24rpx;
  line-height: 66rpx;
  color: #b3b3b3;
  position: absolute;
  left: 32rpx;
  bottom: 0;
}

.coupon-popup-area .close-icon {
  position: absolute;
  right: 30rpx;
  top: 30rpx;
  padding: 6rpx;
  width: 56rpx;
  height: 56rpx;
}

.coupon-popup-area .close-icon image {
  width: 56rpx;
  height: 46rpx;
}

.coupon-popup-area .coupon-sel-list {
  min-height: 400rpx;
  max-height: 800rpx;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}

.coupon-popup-area .coupon-item .coupon-item-left {
  position: relative;
  width: 170rpx;
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
  // background-color: #f7d8d8;
  font-size: 28rpx;
}
.coupon-popup-area .coupon-item.cannot-use .coupon-item-left {
  color: #c0c0c0;
  // background-color: #e1e1e1;
}
.coupon-popup-area .coupon-item .coupon-item-left .coupon-title {
  font-size: 44rpx;
  color: #fff!important;
}
.coupon-popup-area .coupon-item .coupon-item-left .coupon-name {
  text-align: center;
  font-size: 20rpx;
  width: 90%;
  color:#fff;
}
.coupon-popup-area .coupon-item .coupon-item-right {
  position: relative;
  padding: 0 32rpx;
  -ms-flex: 1;
  -webkit-flex: 1;
  -webkit-box-flex: 1;
  flex: 1;
  padding-top: 6rpx;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}
.popup .popup-container .old-amt,
.popup .popup-container .old-amt-item {
  text-decoration: line-through;
  color: #b3b3b3;
}
.popup .popup-container #popupIntTotAmt {
  color: #fe7700;
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
//   opacity: 0;
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
//   opacity: 0;
  pointer-events: none;
  -webkit-transition: opacity 0.2s linear;
  transition: opacity 0.2s linear;
}
/deep/ #popupHtml div {
    width: 100%!important;
    overflow: auto!important;
    word-break: break-all!important;
}
</style>
