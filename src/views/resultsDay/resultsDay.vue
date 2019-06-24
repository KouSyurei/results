<template>
    <div style="overflow: hidden">
            <van-loading style="margin: 4rem auto" v-if='isloading' size="24px" vertical>加载中...</van-loading>
        <div v-if='!isloading'>
        <header>
            <!-- <span>商务每日上午11:50前，下午17:00前两次填报</span> -->
            <span>当天数据当天填报，以最新为准</span>
            <!-- <img src="../../assets/resultDay/close.png" alt=""> -->
        </header>
        <div style="height:0.2rem"></div>
        <div style="padding: 0 0.14rem 0 0.14rem">
            <van-field @focus='params.collection=""' v-model="params.collection" type="number" input-align='right' label="实际收款（元）" label-width='100px'
                placeholder="请填写实际收款" :readonly='!isFillTime' required />
            <van-field @focus='params.sign=""' v-model="params.sign" type="number" input-align='right' label="签单量（个）" label-width='100px'
                placeholder="请填写实际签单量" :readonly='!isFillTime' required />
            <van-field @focus='params.results=""' v-model="params.results" type="number" input-align='right' label="业绩（元）" label-width='100px'
                placeholder="请填写业绩" :readonly='!isFillTime' required />
        </div>
        <div style="width:100%;text-align: center;margin-top:0.4rem">
            <van-button :disabled='isdisabled' style="width:6.9rem;" @click="submit" type="info" >提交</van-button>
        </div>
    </div>
    </div>
    
</template>

<script>
    import {
        Dialog
    } from 'vant'
    export default {
        data() {
            return {
                isloading:false,
                params: {
                    collection: '',
                    sign: '',
                    results: '',
                },
                isFillTime: true,  //false是否在填写时间内
                isReadonly: false
            }
        },
        created(){
            // this.fillTime()
            /*
            * 如果过了填报时间（this.isFillTime:false）并且填报了显示填过的数据
            * 如果没有填报显示“无”
            * */
            this.overTime()
            // alert(this.params.collection)
        },
        mounted () {
        },
        methods: {
            // fillTime () {     //判断当前是否为填报时间
            //     let now = new Date()
            //     let nowTime = now.setHours(now.getHours(),now.getMinutes());
            //     let amWork = now.setHours('9','00');
            //     let pmWork = now.setHours('15','00')
            //     let amTime = now.setHours('11','50');
            //     let pmTime = now.setHours('17','00');
            //     if((amWork<nowTime && nowTime<amTime) || (nowTime > pmWork && nowTime < pmTime)){
            //         this.isFillTime = true
            //     }
            // }
            
            fillTime () {     //判断当前是否为填报时间
                let now = new Date()
                let nowTime = now.setHours(now.getHours(),now.getMinutes());
                let pmTime = now.setHours('17','00');
                if(nowTime<pmTime){
                    // this.isFillTime = true
                }
            },
            overTime () {
                if (true){
                    this.isloading = true
                     this.$get('/fill/processData?loginName='+sessionStorage.userId).then(res=>{
                        // eslint-disable-next-line no-console
                        console.log("过了填报时间，并且填报过")
                        this.isloading = false
                        // eslint-disable-next-line no-console
                        console.log(res.data)
                        if(res.data){
                            // eslint-disable-next-line no-console
                            console.log(res.data.receive_money_day)
                            this.$set(this.params,'collection', res.data.receive_money_day)
                            this.$set(this.params,'sign', res.data.sign_contract_num)
                            this.$set(this.params,'results', res.data.performance_day)
                            console.log(this.params)
                        }else {
                            // this.$set(this.params,'collection', 0)
                            // this.$set(this.params,'sign', 0)
                            // this.$set(this.params,'results', 0)
                        }
                    })
                }
            },
            // 提交
            submit() {
                console.log(99990)
                let paramData = {
                    loginName:sessionStorage.userId,
                    // date:'2019-05-31%2011:29:00',
                    receiveMoneyDay:this.params.collection,
                    signContractNum: this.params.sign,
                    performanceDay: this.params.results,
                }
                console.log(paramData)
                this.isloading = true
                this.$get('/fill/process/'+ paramData.loginName +'/'+ paramData.receiveMoneyDay + '/' + paramData.signContractNum
                + '/' + paramData.performanceDay).then(res=>{
                    this.isloading = false
                    console.log(res)
                    if (res.msg === '操作成功') {
                        this.$router.push({name:'successPage'})
                    }
                }).catch(e=>{
                    // eslint-disable-next-line no-console
                    console.log(e)
                })
            },
            // 修改
            update() {
                Dialog.confirm({
                    cancelButtonColor: '#999999',
                    confirmButtonColor: '#333333',
                    title: '操作提醒',
                    message: '确定修改今日业绩？'
                }).then(() => {
                    // on confirm
                }).catch(() => {
                    // on cancel
                })

            }
        },
        computed: {
            isdisabled: function () {
                console.log(123321)
                if (this.params.collection && this.params.sign && this.params.results) {
                    return false
                } else {
                    return true
                }
            }
        },
    }
</script>


<style scoped>
    header {
        padding: 0 0.17rem 0 0.3rem;
        background-color: #FFFCED;
        display: flex;
        align-items: center;
        justify-content: space-between
    }

    header span {
        font-size: 0.28rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(255, 133, 47, 1);
        line-height: 0.72rem;
    }

    header img {
        height: 0.48rem;
        width: 0.48rem;
    }
</style>
