<template>
	<view class="y-form-item form-item " :class="(bottomBorder ? 'form-item-border-b': '') + ' ' + className">
		<view class="form-item-content">
			<text v-if="required" style="color: #EB2B2B;margin-right: 10rpx;vertical-align: middle;">*</text>
            <view class="form-item-label" v-if="$slots.label">
				<slot name="label"></slot>
			</view>
			<view class="form-item-label" v-else-if="label">
                {{label}}
            </view>
			<view class="form-item-input-area" :class="[!!format ? 'format' : '', align]" :style="showClear ? 'text-align:' + align:'text-align:' + align + ';padding-right:0;'">
                <template v-if="$slots.content">
                    <slot name="content"></slot>
                </template>
                <template v-else>
                    <!-- #ifdef H5 -->
                    <login-password v-if="inputType === 'login'" :value="showVal" @input="handleInput" :placeholder="placeholder"
                    :placeholder-class="placeholderClass" v-bind='$attrs' v-on='$listeners'  @tap="onFocus" @blur="onBlur()"/>
                    <money-input v-else-if="inputType === 'money'" :value="showVal" @input="handleInput" :placeholder="placeholder" :isDisabled="disabled"
                    :placeholder-class="placeholderClass" v-bind='$attrs' v-on='$listeners'  @tap="onFocus" @blur="onBlur()"/>
                    <number-input v-else-if="inputType === 'integer'" :value="showVal" @input="handleInput" :placeholder="placeholder" :isDisabled="disabled"
                    :placeholder-class="placeholderClass" v-bind='$attrs' v-on='$listeners'  @tap="onFocus" @blur="onBlur()"/>
                    <id-card v-else-if="inputType === 'idcard'" :value="showVal" @input="handleInput" :placeholder="placeholder"
                    :placeholder-class="placeholderClass" v-bind='$attrs' v-on='$listeners'  @tap="onFocus" @blur="onBlur()"/>
                    <trans-password v-else-if="inputType === 'trans'" :cells="false" :value="showVal" @input="handleInput" :placeholder="placeholder"
                    :placeholder-class="placeholderClass" v-bind='$attrs' v-on='$listeners'  @tap="onFocus" @blur="onBlur()"/>
                    
                    <input v-else :type="inputType"
                    :maxlength="maxlength" 
                    :password="password" 
                    :value="showVal" 
                    :disabled="disabled"
                    :style = "inputStyle"
                    :placeholder="placeholder"
                    :placeholder-class="placeholderClass"
                    :placeholder-style="placeholderStyleStr"
                    :focus="autoFocus"
                     @input="handleInput($event)"
                     @tap="handleTap($event)"
                     @focus="onFocus" @blur="onBlur()"
                     ref="inputRef"
                     />
                    <!-- #endif -->
                    <!-- #ifndef H5 -->
                    <input :type="inputType"
                    :maxlength="maxlength" 
                    :password="password" 
                    :value="showVal" 
                    :disabled="disabled"
                    :style = "inputStyle"
                    :placeholder="placeholder"
                    :placeholder-class="placeholderClass"
                    :placeholder-style="placeholderStyleStr"
                    :focus="autoFocus"
                     @input="handleInput($event)"
                     @tap="handleTap($event)"
                     @focus="onFocus" @blur="onBlur()"
                     />
                    <!-- #endif -->
                    
                    <y-icons type="clear" v-if="showClear && isFocus && showVal" :size="40" color="#CCCCCC" className="clear-icon" @onTap="clear"></y-icons>
                    <!-- <text v-if="!!format" class="format-text">{{formatValue}}</text> -->
                </template>
				
			</view>
			<view class="form-item-attach" v-if="$slots.attach">
				<slot name="attach"></slot>
			</view>
            <view class="form-item-attach" v-else-if="link">
                <view class="ymfont ymicon-jinru-xiaojiantou" style="color: #DBDBDB;margin-left: 32rpx;font-size: 28rpx;"></view>
            </view>
		</view>
	</view>
</template>

<script>
	import YIcons from '@/components/YIcons.vue';
	// import LoginPassword from '@/components/keyboard/LoginPassword.vue';
	// import IdCard from '@/components/keyboard/IdCard.vue';
	// import MoneyInput from '@/components/keyboard/MoneyInput.vue';
	// import NumberInput from '@/components/keyboard/NumberInput.vue';
 //    import TransPassword from '@/components/keyboard/TransPassword.vue';
    const formatArr = ['bankcard', 'mobile', 'money'];
    let timer = null;
	export default {
        model: {
        	prop: 'value',
        	event: 'input',
        },
		components: {
			YIcons,
			// LoginPassword,
			// IdCard,
			// MoneyInput,
			// NumberInput,
   //          TransPassword
		},
		props: {
			autoFocus: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			bottomBorder: {
				type: Boolean,
				default: true
			},
			className: {
				type: String,
				default: ''
			},
			inputType: {
				type: String,
				default: 'text'
			},
			password: {
				type: Boolean,
				default: false
			},
			maxlength: {
				type: [Number, String],
				default: -1
			},
			label: {
				type: String,
				default: ''
			},
			value: {
				type: String,
				default: undefined
			},
            inputStyle: {
                type: Object,
                default () {
                    return {}
                }
            },
			placeholder: {
				type: [Object, String],
				default: ''
			},
			placeholderClass: {
				type: String,
				default: 'input-placeholder'
			},
            placeholderStyle: {
                type: [Object, String],
                default: ''
            },
			showClear: {
				type: Boolean,
				default: false
			},
            required: {
                type: Boolean,
                default: false
            },
            align: {
                type: String,
                default: 'left'
            },
            link: {
                type: Boolean,
                default: false
            },
            // 输入时自动格式化，现只支持  bankcard:银行卡号   mobile:手机号，且inputType必须为tel
            format: {
                type: String,
                default: ''
            }
		},
		data() {
			return {
				isFocus: false,
                inputVal: ''
			};
		},
        mounted() {
            let type = this.inputType;
            if (formatArr.indexOf(this.format) !== -1) {
                type = 'tel';
            }
            if (type === 'tel') {
                this.$refs.inputRef.$el.getElementsByTagName('input')[0].type = 'tel';
            }
            this.$refs.inputRef && this.$refs.inputRef.$el.getElementsByTagName('input')[0].setAttribute('aria-label', this.placeholder);
        },
		methods: {
			onFocus () {
				this.isFocus = true;
				this.$emit('focus');
			},
			onBlur () {
				// 延时执行
				setTimeout(() => {
					this.isFocus = false;
				}, 100);
				this.$emit('blur');
			},
			clear () {
				this.$emit('input', '');
			},
			// #ifdef H5
			handleInput (result) {
				if (/^(login|money|integer|idcard|trans)$/.test(this.inputType)) {
                    this.inputVal = result;
					this.$emit('input', result);
				} else {
                    this.inputVal = result.detail.value;
					this.$emit('input', result.detail.value);
				}
			},
			// #endif
			// #ifndef H5
			handleInput ({detail:{value}}) {
				this.$emit('input', value);
			},
			// #endif
			
			handleTap ($event) {
				this.$emit('handleTap', $event)
			}
		},
        computed: {
            showVal () {
                return typeof this.value === 'undefined' ? this.inputVal : this.value;
            },
            placeholderStyleStr () {
                if (typeof this.placeholderStyle === 'string') return this.placeholderStyle;
                let styles = [];
                Object.keys(this.placeholderStyle).forEach(key => {
                    let tmpKey = key.replace(/([A-Z])/g, '-$1').toLocaleLowerCase();
                    styles.push(`${tmpKey}:${this.placeholderStyle[key]};`);
                });
                return styles.join('');
            }
        },
        watch: {
            value: {
                handler (newV, oldV) {
                    if (newV && formatArr.indexOf(this.format) !== -1) {
                        this.timer && clearTimeout(this.timer);
                        this.timer = setTimeout(() => {
                            let str = newV;
                            // 需格式化
                            if (!oldV || newV.length > oldV.length || newV.replace(/\s/g, '').indexOf(oldV.replace(/\s/g, '')) === -1) {
                                str = str.replace(/\s+/g, '');
                                switch(this.format) {
                                    case 'bankcard': {
                                        str = this.$format.fmtAcctNo(str);
                                    }break;
                                    case 'mobile': {
                                        str = this.$format.formatMobileNo(str);
                                    }break;
									case 'money': {
										str = this.$format.fmtMoney(str, 0);
										console.log('money: ' + str);
									}break;
                                }
                            } else {
                                str = str.replace(/\s+$/, '');
                            }
                            // 经测试发现输入快时可能超过maxLength长度
                            if (this.maxlength > 0) {
                            	str = str.substring(0, this.maxlength);
                            }
                            this.$emit('input', str);
                        }, 0);
                        
                    }
                },
                immediate: true
            },
            placeholder: {
                handler (newV, oldV) {
                    this.$refs.inputRef && this.$refs.inputRef.$el.getElementsByTagName('input')[0].setAttribute('aria-label', newV);
                },
                immediate: true
            }
            // showVal (newV, oldV) {
            //     if (this.format) {
            //         switch(this.format) {
            //             case 'bankcard': {
                            
            //             }break;
            //             case 'mobile': {
                            
            //             }break;
            //         }
            //     }
            // }
        }
	}
</script>

<style lang="scss">

</style>
