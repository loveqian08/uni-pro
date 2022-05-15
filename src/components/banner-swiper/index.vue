<template>
	<view class="banner-swiper">
		<view class="">
			<swiper class="imageContainer"
				:style="{'height': initHei + 'rpx'}"
				@change="handleChange" 
				circular  
				:indicator-active-color="'#fff'"
				:indicator-color="'rgba(0, 0, 0, .3)'"
				:indicator-dots="imgList.length > 1" 
				:autoplay="autoplay"
				>
				<block v-for="(item,index) in imgList" :key="index">
					<swiper-item class="swiperitem">
						<image class="itemImg" :class="currentIndex == index ? 'swiperactive': ''" :src="item" lazy-load ></image>
					</swiper-item>
				</block>
			</swiper>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			initHei: {
				type: Number & String,
				default: ()=> {
					return 200;
				}
			},
			imgList: {
				type: Array,
				default: () => {
					return [
						'../../static/imgs/myScores/bannerTest.png',
						// '../../static/imgs/myScores/bannerTest.png',
						// '../../static/imgs/myScores/bannerTest.png',
					]
				}
			}
		},
		data(){
			return {
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				currentIndex: 0
			}
		},
		methods: {
			handleChange () {},
			 changeIndicatorDots(e) {
					this.indicatorDots = !this.indicatorDots
				},
				changeAutoplay(e) {
					this.autoplay = !this.autoplay
				},
				intervalChange(e) {
					this.interval = e.target.value
				},
				durationChange(e) {
					this.duration = e.target.value
				}
		}
		
	}	
</script>
<style lang="scss">
	// 3D轮播样式
	.imageContainer {
		width: 100%;
	}
	
	.swiperitem {
		height: 180rpx;
		box-sizing: border-box;
		position: relative;
		.swiperText {
			display: flex;
			flex-direction: column;
			align-items: center;
			position: absolute;
			top: 56rpx;
			left: 51rpx;
			z-index: 998;
			width:162rpx;
			height:163rpx;
			background:rgba(255,255,255,1);
			border-radius:8rpx;
			padding:10rpx;
			.name {
				font-size:26rpx;
				font-weight:500;
				color:rgba(253,57,91,1);
				line-height:37rpx;
				margin-bottom: 10rpx;
			}
			.zq,.cz {
				font-size:20rpx;
				color:rgba(253,57,91,1);
				line-height:35rpx;
			}
			.addNl {
				width:120rpx;
				height:26rpx;
				background:rgba(253,57,91,1);
				border-radius:13rpx;
				font-size:20rpx;
				font-weight:500;
				color:rgba(255,255,255,1);
				text-align: center;
				line-height: 26rpx;
				margin-top: 10rpx;
			}
			
		}
	}
	
	.itemImg {
		position: absolute;
		width: 100%!important;
		height: 95%;
		border-radius: 15rpx;
		z-index: 5;
		top: 0;
		// box-shadow:0px 4rpx 15rpx 0px rgba(153,153,153,0.24);
	}
	
	.swiperactive {
		width: 95%;
		opacity: 1;
		z-index: 10;
		top: 0%;
		transition: all .2s ease-in 0s;
	}
	
	.zhankai{
		text-align: center;
		.iconfont{
			margin-left: 10rpx;
		}
	}
	/deep/ uni-swiper .uni-swiper-slides {
		// inset: 0 0rpx 0 0!important;
	}
</style>