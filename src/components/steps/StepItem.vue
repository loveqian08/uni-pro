<template slot-scope="{ data }">
	<view class="y-step-item-container">
		<view class="title-wrap">
			<view class="circle">{{ index }}</view>
			<view calss="text">
				<span> {{ title }} </span>
			</view>
		</view>
		<view class="content-wrap">
			<slot></slot>
		</view>
		<view class="dash" :style="{height: !isLastItem ? dashHeight - trimHeight + 'px' : '0'}"></view>
	</view>
</template>

<script>
	export default {
		name: '',
		mounted() {
			this.getStepItemHeight()
			// this.$nextTick(function() {

			// })
		},
		props: {
			index: {
				type: Number
			},
			title: {
				type: String
			},
			itemData: {
				type: Object
			},
			// 是否最后一个项，是则不显示掉虚线
			isLastItem: {
				type: Boolean,
				default: false
			},
			// 左侧曲线截取高度
			trimHeight: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				dashHeight: 0,
				titleHeight: 0
			}
		},
		methods: {
			getStepItemHeight() {
				let that = this;
				this.$nextTick(function() {
					let info = uni.createSelectorQuery().in(this).select(".y-step-item-container");
					info.boundingClientRect(function(data) { //data - 各种参数
						that.dashHeight = data.height // 获取元素宽度
					}).exec()


					// let textInfo = uni.createSelectorQuery().in(this).select(".text");
					// textInfo.boundingClientRect(function(data) { //data - 各种参数
					// 	// 　　　  　that.titleHeight = data.height  // 获取元素宽度
					// 	console.log(data)
					// }).exec()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
/* #ifdef MP-YMYH */
	$BaseColor: #ED3362;
	/* #endif */
	/* #ifndef MP-YMYH */
	$BaseColor: #68C0CD;
	/* #endif */
	$WhiteColor: #FFFFFF;

	.y-step-item-container {
		position: relative;
	}

	.dash {
		position: absolute;
		left: 14rpx;
		top: 6rpx;
		width: 1px;
		border-left: 1px dashed $BaseColor;
	}

	.title-wrap {
		display: flex;
		color: $BaseColor;

		.circle {
			z-index:2;
			width: 28rpx;
			height: 28rpx;
			line-height: 28rpx;
			border-radius: 100%;
			background-color: $BaseColor;
			color: $WhiteColor;
			margin: 6rpx 8rpx 0 0;
			font-size: 24rpx;
			text-align: center;
		}

		.text {
			font-size: 32rpx;
		}
	}

	.content-wrap {
		margin-left: 36rpx;
	}
</style>
