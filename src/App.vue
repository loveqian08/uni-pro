<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
@import '@/styles/fonts/iconfont.css';
/*
适老化版本的图标字体
*/
@import '@/styles/accessibility/fonts/iconfont.css';
@import 'styles/themes/var.css';
@import 'styles/mixins.scss';
@import 'styles/themes/index.scss';
@import 'styles/accessibility.scss';

/*每个页面公共css */
page {
	font-family: PingFangSC-Regular;
    min-height: 100%;
    display: flex;
    background-color: #fff;
    /* font-family: PingFangSC-Regular, 'Helvetica Neue', 'Hiragino Sans GB', Helvetica, 'Microsoft YaHei', Arial; */
    margin: 0;
    user-select: none;
    -webkit-user-select: none;
    font-family: PingFangSC,PingFangSC-Regular, 'Helvetica Neue', 'Hiragino Sans GB', Helvetica, 'Microsoft YaHei', Arial; ;
    font-size: 28rpx;
    color: #333333;
    letter-spacing: 0;
    // 限制字体大小（不跟随客户系统字体大小，IOS有效）
    -webkit-text-size-adjust: 100% !important;
}

view.page-content {
    width: 100%;
    box-sizing: border-box;
    flex: 1;
    color: #333;
    background-color: #f8f8f8;

    /deep/ radio::before,
    checkbox::before {
        font-weight: bold;
        transform: scale(1.4);
    }

    --primary: #e84848;
    --primary-hover-color: #{lighten($color: #e84848, $amount: 10)};
    --primary-gradient: linear-gradient(270deg, #ED3362 0%, #FB9784 100%);
    
    .ymfont {
      font-size: 32rpx;
    }
    .ymfont-access {
      font-size: 32rpx;
    }
}

switch.primary .wx-switch-input,
checkbox.primary .wx-checkbox-input,
radio.primary .wx-radio-input,
switch.primary .uni-switch-input,
checkbox.primary .uni-checkbox-input,
radio.primary .uni-radio-input {
    background-color: #D8D8D8 !important;
    color: #fff !important;
    border-color: transparent !important;
    &::before{
        font: normal normal normal 14px/1 uni;
        content: "\EA08";
        font-size: 22px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-48%) scale(.73);
    }
}
switch.primary[checked] .wx-switch-input,
checkbox.primary[checked] .wx-checkbox-input,
radio.primary[checked] .wx-radio-input,
switch.primary .uni-switch-input-checked,
checkbox.primary .uni-checkbox-input-checked,
radio.primary .uni-radio-input-checked {
    background: linear-gradient(270deg, #ED3362 0%, #FB9784 100%);
    color: #fff !important;
    border-color: transparent !important;
}

img,
image {
    object-position: center;
    will-change: transform; // 防止页面image元素太多而出现闪一下的情况
    &.full {
        width: 100%;
        height: 100%;
    }

    &.fill {
        object-fit: fill;
    }

    &.contain {
        object-fit: contain;
    }

    &.cover {
        object-fit: cover;
    }

    &.none {
        object-fit: none;
    }

    &.scale-down {
        object-fit: scale-down;
    }
}

.flex-center {
    @include center;
}
.flex-v-center {
    @include v-center;
}
.flex-h-center {
    @include h-center;
}

@keyframes rotateAni {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}

.b {
    position: relative;

    &:before {
        box-sizing: border-box;
        content: ' ';
        position: absolute;
        left: 0;
        top: 0;
        width: 200%;
        height: 200%;
        border: 1px solid $borderColor;
        color: $borderColor;
        transform-origin: 0 0;
        transform: scale(0.5);
    }
}

.b-t {
    position: relative;

    &:before {
        box-sizing: border-box;
        content: ' ';
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid $borderColor;
        color: $borderColor;
        transform-origin: center top;
        transform: scaleY(0.5);
    }
}

.b-b {
    position: relative;

    &:after {
        box-sizing: border-box;
        content: ' ';
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid $borderColor;
        color: $borderColor;
        transform-origin: center bottom;
        transform: scaleY(0.5);
    }
}

.b-l {
    position: relative;

    &:before {
        box-sizing: border-box;
        content: ' ';
        position: absolute;
        top: 0;
        left: 0;
        width: 1px;
        height: 100%;
        border-left: 1px solid $borderColor;
        color: $borderColor;
        transform-origin: left center;
        transform: scaleX(0.5);
    }
}

.b-r {
    position: relative;

    &:after {
        box-sizing: border-box;
        content: ' ';
        position: absolute;
        top: 0;
        right: 0;
        width: 1px;
        height: 100%;
        border-right: 1px solid $borderColor;
        color: $borderColor;
        transform-origin: right center;
        transform: scaleX(0.5);
    }
}

.del-text {
    text-decoration: line-through;
    color: $uni-text-color-grey;
}

.flex-padding {
    flex: 1;
    & ~ view,
    & ~ button,
    & ~ image {
        flex-shrink: 0;
    }
}
.btn-wrap {
    padding: 0 32rpx;
    &.large{
        padding: 0 60rpx;
    }
}
.ym-btn{
    width: 100%;
    height: 100rpx;
    line-height: 100rpx;
    font-size: 32rpx;
    border-radius: 8rpx;
    font-weight: 400;
    &+.ym-btn{
        margin-top: 30rpx;
    }
    
    &.round {
        border-radius: 5000rpx;
    }
    
    &.no-b{
        border: none;
        &::after {
            border: none;
        }
    }
    
    &.primary-gray{
        background: #EEEEEE;
        color: #EB2B2B;
        border: none;
        &::after {
            border: none;
        }
    }
    &.plain-btn{
        color: #999999;
        background-color: transparent;
        border: none;
        &::after {
            border: none;
        }
    }
}
.primary-btn[class] {
    // width: 670rpx;
    width: 100%;
    height: 100rpx;
    line-height: 100rpx;
    font-size: 32rpx;
    color: #ffffff;
    background: var(--primary-gradient);
    border-radius: 8rpx;
    border: none;
    &.fixed {
        position: fixed;
        margin: 0;
        left: 75rpx;
        right: 75rpx;
        bottom: 30rpx;
    }
    &.button-hover {
        
        background: linear-gradient(270deg, #{lighten($color: #ED3362, $amount: 10)} 0%, #{lighten($color: #FB9784, $amount: 10)} 100%);
    }

    &::after {
        border: none;
    }

    &.round {
        border-radius: 5000rpx;
    }
    
    
    &[disabled]{
        color: #FFFFFF;
        background: linear-gradient(90deg, #B7B7B7 0%, #D8D8D8 100%);
        &.button-hover{
            background: linear-gradient(90deg, #B7B7B7 0%, #D8D8D8 100%);
        }
    }
    
    &.plain{
        border: 1px solid #EB2B2B;
        background: none;
        color: #EB2B2B;
        
        &.button-hover{
            border-color: #{lighten($color: #EB2B2B, $amount: 30)};
            color: #{lighten($color: #EB2B2B, $amount: 30)};
        }
        
        &[disabled]{
            color: #D8D8D8;
            border-color: #D8D8D8;
            &.button-hover{
                color: #D8D8D8;
                border-color: #D8D8D8;
                background: none;
            }
        }
    }
}

.form-group {
    --label-width: 180rpx;
    padding: 0 32rpx;
    & + .form-group {
        margin-top: 20rpx;
    }

    .checkbox-area {
        margin-top: 20rpx;
        font-size: 24rpx;
        line-height: 40rpx;
        color: #888888;
        checkbox-group{
            position: relative;
            padding-left: 56rpx;
            checkbox{
                position: absolute;
                left: -2px;
            }
        }
    }
    checkbox {
        transform: scale(0.8) translateY(-4rpx);
        margin-right: 10rpx;
    }
    
    &.white-bg{
        background-color: #fff;
    }
    
    .form-item{
        &:last-child{
            &::after{
                display: none;
            }
        }
    }
    
    &.last-has-border, .last-has-border{
        .form-item{
            &:last-child{
                &::after{
                    display: block;
                }
            }
        }
    }
}

.label-up {
    .form-item {
        height: 120rpx;
        padding-top: 36rpx;
        position: relative;
        .form-item-label {
            position: absolute;
            width: auto;
            font-size: 24rpx;
            line-height: 38rpx;
            color: #bfbcca;
            top: 16rpx;
            image {
                width: 40rpx;
                height: 40rpx;
                margin-right: 16rpx;
            }
        }
    }
}
.form-item {
    @include v-center;
	width: 100%;
	padding: 0 40rpx;
	box-sizing: border-box;
    min-height: 100rpx;
}
.form-item-border-b {
    /* border-bottom: 1px solid $borderColor; */
    position: relative;

    &:after {
        box-sizing: border-box;
        content: ' ';
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid $borderColor;
        color: $borderColor;
        transform-origin: center bottom;
        transform: scaleY(0.5);
    }
}
.form-item-label {
    width: var(--label-width);
    line-height: 44rpx;
    font-size: 28rpx;
    color: #666666;
}
.form-item-content {
    flex: 1;
    height: 100%;
    @include v-center;
}
.form-item-input-area {
    position: relative;
    flex: 1;
    padding-right: 50rpx;
    input {
        width: 100%;
        font-size: 28rpx;
        &:placeholder {
            line-height: 44rpx;
            font-size: 28rpx;
            color: #BBBBBB;
        }
    }
    .clear-icon[class] {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(0, -50%);
        font-size: 1.2em !important;
    }
    
}
/deep/ .input-placeholder {
    line-height: 44rpx;
    font-size: 28rpx;
    color: #BBBBBB;
}
.form-item-attach {
    font-size: 0;
}
.send-code-btn[class] {
    border: none;
    color: var(--primary);
    background-color: transparent;
    font-size: 28rpx;
    &[disabled] {
        background-color: transparent;
    }
}
.gray-padding {
    height: 20rpx;
    background: #f5f6f9;
}
.cu-form-group {
    min-height: 100rpx;
    .title {
        padding-right: 30rpx;
        font-weight: 500;
        font-size: 28rpx;
        line-height: 38rpx;
        color: #000000;
        height: 60rpx;
        line-height: 60rpx;
        min-width: calc(6em + 30rpx);
    }
    picker,
    .arrow {
        position: relative;
        padding-right: 40rpx;
        &::after {
            font-family: cuIcon;
            display: block;
            content: '\e6a3';
            position: absolute;
            font-size: 34rpx;
            color: #8799a3;
            line-height: 100rpx;
            width: 60rpx;
            text-align: center;
            top: 0;
            bottom: 0;
            right: -20rpx;
            margin: auto;
        }
    }
    .arrow {
        flex: 1;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 0;
        &::after {
            position: relative;
            padding-right: 12rpx;
            width: 40rpx;
        }
        > view {
            flex: 1;
            text-align: right;
            margin-right: -10rpx;
        }
    }
    input {
        font-size: 30rpx;
        color: #353535;
        padding-right: 20rpx;
        text-align: right;
        font-size: 28rpx;
    }
    /deep/.placeholder-gray {
        font-size: 28rpx;
        line-height: 38rpx;
        color: #d7d9db;
    }
    textarea {
        margin: 32rpx 0 30rpx;
        height: 2.6em;
        color: #353535;
        text-align: right;
        font-size: 28rpx;
    }
}

uni-switch .uni-switch-input.uni-switch-input-checked{
    background: var(--primary-gradient)!important;
    border-color: var(--primary)!important;;
}


.text-red{
    color: var(--red);
}
/**
 * 单行文本，超出显示省略号
 */
.single-line-text{
    @include sl;
}
/**
 * 两行文本，超出显示省略号
 */
.double-line-text{
    @include clamp(2);
}

/* #ifdef WEB-H5-TEST || WEB-H5-LOCAL */
::-webkit-scrollbar { /* 滚动条整体样式 */
  width: 0;     /*高宽分别对应横竖滚动条的尺寸*/
  background: transparent;
}
::-webkit-scrollbar-thumb { /* 滚动条里面小方块 */
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: #eeeeee;
}
::-webkit-scrollbar-track { /* 滚动条里面轨道 */
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0);
  border-radius: 10px;
  display: none;
}
::-webkit-scrollbar-track-piece {
    display: none;
}

page { overflow: overlay;} /* 需要滚动的地方加上这个class */
page ::-webkit-scrollbar { /* 组件内滚动条不显示 */
  display: none;
}
page:hover ::-webkit-scrollbar { /* 悬停时滚动条才显示 */ 
  display: block; 
}
/* #endif */


</style>

