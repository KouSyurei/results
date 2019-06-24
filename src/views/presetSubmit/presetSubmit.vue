<template>
    <div style="overflow: hidden">
        <van-loading style="margin: 4rem auto" v-if='isloading' size="24px" vertical>加载中...</van-loading>
        <div v-if='!isloading'>
        <header>
            <span v-if="showPerformancePreType=='0'">每日17点到20点填写明日业绩目标</span>
            <span v-if="showPerformancePreType=='1'">每周最后一个工作日20点前填写下周业绩目标</span>
            <span v-if="showPerformancePreType=='2'">每月最后两个工作日填写下月业绩目标</span>
            <!-- <img src="../../assets/resultDay/close.png" alt=""> -->
        </header>
        <div style="height:0.2rem"></div>
        <div class="nav">
            <div class="title">
                <!-- <img :src="test" alt=""> -->
                <img v-if="showPerformancePreType=='0'" src="../../assets/resultsHome/rimubiao.png" alt="">
                <img v-if="showPerformancePreType=='1'" src="../../assets/resultsHome/zhoumubiao.png" alt="">
                <img v-if="showPerformancePreType=='2'" src="../../assets/resultsHome/yuemubiao.png" alt="">
                <span>预设业绩{{typeName[showPerformancePreType]}}目标</span>
            </div>
            <div v-for="(item,index) in listArr" :key="index" class="list">
                <span>{{ item.name }}</span>
                <van-field :disabled='overTime' type="number" v-model="listArr[index].target_value"
                    :placeholder='"请填写"+typeName[0]+"目标(元)"' />
            </div>
        </div>
        <div v-if='!overTime' style="margin-top:0.4rem;width:100%;text-align: center">
            <van-button @click='submit("successPage")' style="color:white;width:6.9rem" type="info">提交</van-button>
        </div>
    </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {
        Notify
    } from 'vant'
    export default {
        mounted() {
            this.userId = sessionStorage.userId
            this.roleName = sessionStorage.roleName
            this.showPerformancePreType = this.$route.query.performancePreType
            console.log(this.showPerformancePreType)
            this.getData()
        },
        data() {
            return {
                isloading:false,
                userId: '',
                roleName: '',
                showPerformancePreType: '',
                performancePreType: '',
                listArr: [],
                listValue: [],
                overTime: '',
                typeName: ['日', '周', '月'],
                test: '../../assets/resultsHome/rimubiao.png',
                typeImg: ['../../assets/resultsHome/rimubiao.png', '../../assets/resultsHome/zhoumubiao.png',
                    '../../assets/resultsHome/yuemubiao.png'
                ]
            }
        },
        methods: {
            getData() {
                if (this.showPerformancePreType == '0') {
                    this.performancePreType = 'dailyPerformanceTarget'
                } else if (this.showPerformancePreType == '1') {
                    this.performancePreType = 'weeklyPerformanceTarget'
                } else if (this.showPerformancePreType == '2') {
                    this.performancePreType = 'monthPerformanceTarget'
                }
                this.isloading = true
                this.$get('/performancePrefillController/forwardPage/' + this.userId + '/' + this.performancePreType).then(
                    res => {
                        this.isloading = false
                        this.listArr = res.data
                        this.overTime = res.overTime
                        console.log(res)
                    })

            },
            submit(url) {
                console.log(this.listArr)
                let data = {
                    roleName: sessionStorage.roleName,
                    userName: sessionStorage.userId,
                    performancePreType: this.performancePreType,
                    performanceTargetList: this.listArr
                }
                this.isloading = true
                axios.post('/performancePrefillController/saveBusPerformanceTarget', data).then(res => {
                    this.isloading = false
                    if (res.data.code == '0') {
                        this.$router.push({
                            name: url
                        })
                    } else {
                        Notify(res.data.msg)
                    }
                })
            }
        }
    }
</script>
<style>
    .list .van-cell {
        padding-left: 0
    }
</style>


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

    .nav {
        padding: 0.26rem 0.3rem 0 0.3rem;
        background-color: white
    }

    .title {
        display: flex;
        align-items: center;
        height: 1rem;
    }

    .title img {
        height: 0.48rem;
        width: 0.48rem;
        display: inline-block;
        margin-right: 0.18rem
    }

    .title span {
        font-size: 0.32rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(55, 59, 65, 1);
        line-height: 0.18rem;
    }

    .list {
        border-bottom: 3px #EEEEEE solid;
        height: 1.44rem;
        margin-top: 0.2rem
    }

    .list span {
        font-size: 0.28rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(55, 59, 65, 1);
        line-height: 0.6rem;
    }
</style>
