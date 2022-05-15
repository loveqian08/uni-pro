<template>
	<!-- 页面名称 -->
	<view class="custom-top-tab">
		<view class="item-wrap"
		   v-for="(item, index) in tabData"
		   :key="index"
		   :style="{width: tabWidth}"
		   :class="{'active': activeItem(index)}">
			<text>{{item.name}}</text>
			<!-- <view class="traingle"></view>
			<view class="traingle traingle-bg"></view> -->
			<!-- <image  class="step-icon" src="@/static/imgs/step-icon.png" mode="scaleToFill">
			</image> -->
			<image v-if="Number(activeIndex) -1  !== index && index + 1 !== 4" src="@/static/imgs/step-icon.png" mode="scaleToFill"  class="step-icon">
			</image>
			<image  v-if="Number(activeIndex) - 1 === index && index + 1 !== 4" src="@/static/imgs/step-icon2.png" mode="scaleToFill"  class="step-icon">
			</image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		computed: {
			tabWidth() {
				if (this.tabData.length) {
					return 100 / this.tabData.length + '%'
				} else {
					return 0
				}
			}
		},
		props: {
			// 传入数据 [{
			// 	name: '注册/登录'
			// }, {
			// 	name: '实名认证'
			// }, {
			// 	name: '企业四要素'
			// }, {
			// 	name: '营业执照'
			// }]
			tabData: {
				type: Array
			},
			// 激活index值
			activeIndex: {
				type: Number,
				default: 1
			}
		},
		methods: {
			activeItem(index) {
				if (index + 1 > this.activeIndex) {
					return false
				} else {
					return true
				}
			}
		}
			
	}
</script>

<style scoped lang="scss">
$ActiveColor: #89D6E2;	
$Grey: #DEDEDE;
$White: #FFFFFF;
	
.custom-top-tab{
	position: relative;
	display: flex;
	overflow: hidden;
	height: 52rpx !important;
}

.item-wrap{
	position: relative;
	height: 52rpx;
	line-height: 56rpx !important;
	font-size: 24rpx;
	text-align: center;
	color: $White;
	background-color: $Grey;
	width: 25%;
	.traingle{
		position: absolute;
		right: -22rpx;
		top: -2rpx;
		width: 0;
		height: 0;
		border-top: 27rpx solid transparent;
		border-left: 22rpx solid $Grey;
		border-bottom: 27rpx solid transparent;
		z-index: 3;
	}
	
	.traingle-bg{
	   position: absolute;
	   right: -25rpx;
	   top: -2rpx;
	   width: 0;
	   height: 0;
	   border-top: 27rpx solid transparent;
	   border-left: 22rpx solid $White;
	   border-bottom: 27rpx solid transparent;
	   z-index: 2;
	}
	.step-icon {
		display: inline-block;
		width: 24rpx;
		height:52rpx;
		position: absolute;
		right: -1rpx;
		top: 0;
	}
	&.active{
		background-color: $ActiveColor;
		
		.traingle{
			border-left: 22rpx solid $ActiveColor;
		}
		
		.traingle-bg{
			border-left: 22rpx solid $White;
		}
	}
}

.trangle{
	
}
</style>
