<template>
	 <!-- v-bind="$attrs" v-on="$listeners" -->
    <y-form-item
       
        input-type="tel"
        :label="label"
        :placeholder="placeholder"
        :maxlength="23"
        align="right"
        format="bankcard"
        v-model="cardNo"
        @blur="queryCardBin(cardInfo.STATUS != 1)"
    >
    </y-form-item>
</template>

<script>
	import YFormItem from '@/components/YFormItem.vue';
    export default {
        name:"YBankCardInput",
        props: {
            label: {
                type: String,
                default: '卡号'
            },
            placeholder: {
                type: String,
                default: '请输入卡号'
            },
            url: {
                type: String,
                default: '/eleAcct/chkUpCstInf1'
            },
            isOnceAjax: {
                type: Boolean,
                default: true
            }
        },
		components: {
		    YFormItem
		},
        data() {
            return {
                cardNo: '',
                cardInfo: {},
                loading: false
            };
        },
        methods: {
            queryCardBin(update) {
                if (this.loading || !this.cardNo.replace(/\s+/g, '')) return Promise.reject();
                this.loading = true;
                if (update) {
                    this.cardInfo = {};
                    this.cardPromise = null;
                }
                if (this.cardInfo.STATUS) {
                    this.loading = false;
                    return Promise.resolve(this.cardInfo);
                } else if (this.cardPromise) {
                    this.loading = false;
                    return this.cardPromise;
                }
                this.cardPromise = this.$http
                    [this.isOnceAjax ? 'onceAjax': 'post'](this.url, {
                        AcctNoCrdNo: this.cardNo.replace(/\s+/g, ''),
                        ACCT: this.cardNo.replace(/\s+/g, ''),
                        queryType: '1'
                    })
                    .then(res => {
                        this.cardInfo = {
                            ...res,
                            acctNo: this.cardNo.replace(/\s+/g, '')
                        };
                        this.$emit('onUpdateCardInfo', {...this.cardInfo});
                        if (res.STATUS == '1') {
                            this.cardPromise = null;
                            return Promise.resolve(res);
                        }
                        else {
                            // uni.showToast({
                            //     title: res.MSG,
                            //     icon: 'none'
                            // });
                            return Promise.reject(res);
                        }
                    }).finally(() => {
                        this.loading = false;
                    });
                return this.cardPromise;
            },
        },
        watch: {
            'cardNo' (v) {
                if (this.searchTimer) clearTimeout(this.searchTimer);
                this.searchTimer = setTimeout(() => {
                    let tmp = v.replace(/\s+/g, '');
                    if (tmp.length >= 11) {
                        this.queryCardBin(true);
                    }
                }, 500)
            }
        }
    }
</script>

<style lang="scss">
.ymicon-saomiao {
    font-size: 40rpx;
    margin-left: 32rpx;
    color: #666;
}
</style>
