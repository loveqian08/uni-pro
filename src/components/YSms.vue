<template>
	<button class="y-sms send-code-btn" :class="className" :loading="loading"
		:size="size" :plain="plain" @tap="sendCode">
		{{codeBtnTxt}}
	</button>
</template>

<script>
	import validatorUtils from '@/common/validatorUtils.js';
	let timer = 0;
	export default {
		props: {
			className: {
				type: String,
				default: ''
			},
			size: {
				type: String,
				default: 'mini'
			},
			plain: {
				type: Boolean,
				default: true
			},
			mobileNo: {
				type: String,
				default: ''
			},
			url: {
				type: String,
				default: '/app/transMbSmsSend'
			},
			tranCode: {
				type: String,
				default: ''
			},
			/**
			 * 发验证码时附加参数
			 */
			params: {
				type: Object,
				default: function () {
					return {};
				}
			},
			/**
			 * 有附加参数时的附加规则
			 */
			rules: {
				type: Object,
				default: function () {
					return {};
				}
			},
			/**
			 * 有附加参数时，需验证的属性
			 */
			fields: {
				type: Array,
				default: function () {
					return [];
				}
			},
			fromYjd: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				sending: false, // 是否正在发送验证码
				time: 60,
				sendCount: 0,
                loading: false
			};
		},
		methods: {
			sendCode (cb) {
				if (this.sending) {
					typeof cb ==='function' && cb();
					return;
				};
                if (this.loading) return;
                this.loading = true;
				validatorUtils.validateField({
					mobileNo: this.mobileNo,
					...this.params
				}, this.validRules, this.validFields, (res, error) => {
					if (res) {
						uni.showLoading({
							title: '发送验证码',
							mask: true
						});
						this.$http.post(this.url, {
							CUST_MOBILE: this.mobileNo,
							SMS_TYPE: 'CHKCODE',
							TRAN_CODE: this.tranCode,
							...this.params
						}).then(rsp => {
							uni.hideLoading();
							if (rsp.STATUS == 1) {
								uni.showToast({
									title: '验证码发送成功',
									icon: 'none'
								});
								this.sending = true;
								this.sendCount += 1;
								timer = setInterval(() => {
									this.time--;
									if (this.time <= 0) {
										this.sending = false;
										this.time = 60;
										clearInterval(timer);
									}
								}, 1000);
								typeof cb ==='function' && cb();
							} else {
								clearInterval(timer);
								uni.showToast({
									title: rsp.MSG,
									icon: 'none'
								});
							}
						}).finally(() => {
                            this.loading = false;
                        });
					}
				});
			}
		},
		computed: {
			codeBtnTxt () {
				let txt = '发送验证码';
				if (this.fromYjd) {
					txt = '获取验证码';
				}
				if (this.sending) {
					txt = this.time + 's';
				} else if (this.sendCount > 0) {
					txt = '重新发送验证码'
				}
				return txt;
			},
			validRules () {
				return {
					mobileNo: [
						{
							required: true,
							message: '请输入手机号'
						},
						{
							min: 11,
							max: 11,
							message: '请输入正确的手机号'
						},
						{
							type: 'mobile',
							message: '请输入正确的手机号'
						}
					],
					...this.rules
				};
			},
			validFields () {
				return ['mobileNo', ...this.fields];
			},
			validParams () {
				return {
							CUST_MOBILE: this.mobileNo,
							SMS_TYPE: 'CHKCODE',
							TRAN_CODE: this.tranCode,
							...this.params
						};
			}
		},
		destroyed () {
			clearInterval(timer);
		}
	}
</script>

<style lang="scss">

</style>
