<template>
	<view class="submitInfo">
		<view class="title">请输入您的信息</view>
		<template v-if="formType=='form'">
			<y-form-item
			label="楼栋号"
				input-type="number"
				maxlength="6" 
				align="right" 
				:bottomBorder="true"
				placeholder="请输入您的楼栋号" 
				v-model="form.houseNo">
			</y-form-item>
			<y-form-item 
			label="联系人"
				align="right" 
				:bottomBorder="true"
			    input-type="text"
				:maxlength="13" 
				placeholder="请输入联系人" 
				v-model="form.userName">
			</y-form-item>
			<y-form-item
			label="手机号"
				align="right" 
				:bottomBorder="true"
			    input-type="text"
				:maxlength="13" 
				placeholder="请输入手机号码" 
				v-model="form.phone">
			</y-form-item>
			<y-form-item
			label="在家时间段"
				align="right" 
				:bottomBorder="true"
			    input-type="text"
				:maxlength="13" 
				placeholder="请输入在家时间段" 
				v-model="form.time">
			</y-form-item>
		</template>
		<template v-else>
			<y-form-item
			label="小区名称"
				input-type="number"
				maxlength="6" 
				align="right" 
				:bottomBorder="true"
				placeholder="请输入小区名称" 
				v-model="form.houseName">
			</y-form-item>
			<y-form-item 
			label="房东姓名"
				align="right" 
				:bottomBorder="true"
			    input-type="text"
				:maxlength="13" 
				placeholder="请输入房东姓名" 
				v-model="form.fdName">
			</y-form-item>
		</template>
		
		<!-- <view class="submitBtn" @tap="submit">提交</view> -->
		<button class="submitBtn" type="primary" @tap="submit">提交</button>
		<view v-if="isSuccess">
			<view class="wait">等待平台审核，稍等5分钟不要离开...</view>
			 <video id="myVideo" 
				src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4"
			    @error="videoErrorCallback" 
				:danmu-list="danmuList" 
				enable-danmu danmu-btn 
				:enable-progress-gesture="false"
				:show-progress="false"
				show-fullscreen-btn>
			 </video>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				danmuList: [{
						text: '第 1s 出现的弹幕',
						color: '#ff0000',
						time: 1
					},
					{
						text: '第 3s 出现的弹幕',
						color: '#ff00ff',
						time: 3
					}
				],
				danmuValue: '',
				isSuccess: true,
				form: {
					userName: '',
					houseName: '',
					houseNo: '',
					fdName: '',
					time: ''
				},
				formType: ''
			}
		},
		onLoad({ type = '' }) {
			this.formType = type;
		},
		methods: {
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			submit () {
				if (!this.form.userName) {
					uni.showToast({
						icon: 'none',
						title: `请输入您的${this.form.userName}`
					})
					return false;
				}
				if (!this.form.houseName) {
					uni.showToast({
						icon: 'none',
						title: `请输入您的${this.form.houseName}`
					})
					return false;
				}
				this.$global.showModalLoading();
				let obj = {
					...this.form
				}
				this.$http.post('xxx', obj).then(res => {
					uni.hideLoading();
					if (res && res.code == '1') {
						
					} else {
						uni.showToast({
							icon: 'none',
							title: res.MSG
						})
					}
				}).catch(err => {
					uni.hideLoading();
					uni.showToast({
						icon: 'none',
						title: err.MSG || '请求出错，请稍候再试'
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.submitInfo {
	padding-top: 70rpx;
	width: 100%;
	.title {
		font-size: 48rpx;
		line-height: 40rpx;
		text-align: center;
		margin-bottom: 90rpx;
	}
	.submitBtn {
		width: 686rpx;
		margin: 100rpx auto;
		text-align: center;
		line-height: 82rpx;
		border-radius: 20rpx;
	}
	.wait {
		font-size: 26rpx;
		width: 100%;
		text-align: center;
		margin-bottom: 20rpx;
		
	}
	#myVideo {
		width: 100%;
	}
}
</style>
