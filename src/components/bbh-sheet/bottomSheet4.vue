<template>
	<view class="content">
		<view class="sheet" :class="{sheetShow:isShowBottom,sheeHide:!isShowBottom}" @touchmove.stop.prevent="moveHandle">
			<view  class="sheetView" :class="{sheetView_active:isShowBottom}">
				<view class="title">
					<view class="titleTop"></view>
					<!-- <view class="close" @tap="closeSheet()">×</view> -->
					<view class="close-icon" @tap="closeSheet">
						<y-icons type="closeempty" :size="36" color="#353535" />
					</view>
				</view>
				
				<view style="margin: 50rpx;">
					<checkbox-group name="">
						<label>
							<checkbox class="cyan check" checked disabled="true" value="1" style="transform:scale(0.7); margin-top: -20rpx;"/>
							<text>本人已同意并阅读</text>
						</label>
						<text class="text-primary"  @tap.stop="navToAgree_danbao">《融资担保服务申请书》</text>
						<text class="text-primary"  @tap.stop="navToAgree_chaxun">《个人征信查询报送授权书》</text>
					</checkbox-group>
				</view>
				
				
				<view class="btn-wrap">
					<button class="primary-btn" plain @tap="submit">提交</button>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import YIcons from '@/components/YIcons.vue';
	export default {
		name : "bottomSheet",
		components: {
			YIcons
		},
		props: {
			isShowBottom : Boolean,
			list: Array,
			title: String
		},
		data() {
			return {
				current: 0
			}
		}, 
		methods: {
			closeSheet() {					
				this.$emit('closeBottom');
			},
			//点击单行
			submit(value, index) {
				this.current = index;
				this.$emit('submit', value);
			},
			stopEvent() {						//@click.stop防止事件冒泡
				
			},
			moveHandle() {						//不让页面滚动
				
			},
			setIndex (v) {
				this.current = v;
			},
			navToAgree_danbao () {
				uni.navigateTo({
					url: '/pages/agreements/agreements?type=danbao'
				});
			},
			navToAgree_chaxun () {
				uni.navigateTo({
					url: '/pages/agreements/agreements?type=chaxun'
				});
			}
		}
	}
</script>

<style scoped>
	/* sheet弹窗 */
	.sheet{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 120%;
		left: 0upx;
		bottom: 0upx;
		right: 0upx;
		background:rgba(0,0,0,0.3);
		z-index: 10000;
	}
	
	/* 显示时候的动画默认0.5s */
	.sheetView{
		width: 100%;
		height: 0upx;
		position: absolute;
		bottom: 0upx;
		background: white;
		z-index: 10001;
		transition: all 0.5s;
		border-radius: 10rpx 10rpx 0 0;
	}
	.sheetShow{
		top:0upx !important;
	}
	/* 关闭时的动画，时间自己可以设置0.5s*/
	.sheeHide{
		top:120% !important;
		transition: all 0.5s;		
	}
	
	/* 项目需求根据设计稿要展示的高度,超出这个高度就自动滚动*/
	.sheetView_active{
		height: 770rpx;
	}
	
	.title {
		display: flex;
		justify-content: space-between;
		padding: 58rpx 60rpx;
		font-style: normal;
		font-size: 32rpx;
		color: #222222;
		font-weight: 600;
		position: relative;
	}
	.close-icon{
		position: absolute;
		right: 30rpx;
		top: 30rpx;
		padding: 6rpx;
		border-radius: 50%;
		background-color: #f0f0f0;
		width: 54rpx;
		height: 54rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.close {
		width: 30rpx;
		height: 30rpx;
		text-align: center;
		line-height: 30rpx;
		border-radius: 30rpx;
		font-weight: 100;
		color: #8C8C8C;
		background-color: #F0F0F0;
	}
	.item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 120rpx;
		margin: 0 60rpx;
	}
	.itemText {
		font-family: PingFang SC;
		font-style: normal;
		font-weight: 500;
		font-size: 14px;
		letter-spacing: -0.2048px;
		color: #353535;
	}
	.img {
		width: 40rpx;
		height: 40rpx;
	}
	
</style>
