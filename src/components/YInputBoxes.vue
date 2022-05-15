<template>
    <view class="ym-input-box">
    	<text class="field-wrap" :style="{borderColor: curIndex == index ? '#00ff00' : '#CCCCCC'}" v-for="(code, index) in codeLength" :key="index">{{text[index]}}</text>
		<view class="enter-back">
			<input  auto-blur
					type="tel"
					:show-confirm-bar="false"
                    :maxlength="codeLength"
					ref="vcodeInput"
					v-model="value"
					placeholder="验证码"
                    
                    />
				<!-- 	v-bind="$attrs"
					v-on="$listeners" -->
		</view>
    </view>
</template>

<script>
	export default {
		name: 'ym-input-box',
		props: {
			// 是否自动获取焦点
			autofocus:{
				type: Boolean,
				default: true
			},
			// 最大输入长度（默认6）
			codeLength: {
				type: Number,
				default: 6,
			},
			// 是否自动完成（达到最大输入长度）
			isAutoComplete:{
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				focus:false, // 真实输入框是否获取焦点
				// text:[],     // 输入数据数组
				value: '',   // 真实输入框值
				curIndex: 0, // 当前获取焦点输入框下标
			}
		},
        mounted() {
            this.$refs.vcodeInput.$el.getElementsByTagName('input')[0].type = 'tel';  
        },
        computed: {
            text () {
                return this.value.split('');
            }
        },
		watch:{
			// 输入变化时
			value(newValue, oldVal) {
                if (newValue === oldVal) return;
                if (/\D/g.test(newValue)) {
                    this.$nextTick(function(){
                        this.value = newValue.replace(/\D/g, '');
                    });
                    return;
                }
                let tmpIndex = newValue.length - 1;
				this.curIndex = tmpIndex < 0 ? 0 : tmpIndex;
				this.$emit('vcodeInput', newValue);
				// 回调
				if(this.isAutoComplete){
					if(newValue.length >= this.codeLength) {
                        this.$emit('complete', this.value);
                        uni.hideKeyboard();
					}
				}
			}
		},
		methods: {
			
		},
	}
</script>

<style lang="scss" scoped>
	.ym-input-box{
		display: flex;
		align-items: center;
		justify-content: space-between;
        overflow: hidden;
        position: relative;
		.field-wrap{
			border-radius: 8rpx;
			border: 2rpx solid #CCCCCC;
			width: 92rpx;
			height: 92rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
			font-size: 40rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #333333;
			line-height: 56rpx;
		}
		.enter-back{
			position: absolute;
            top: 0;
			left: -400rpx;
            right: 0;
            height: 100%;
            input{
                height: 100%;
            }
		}
	}
</style>