<template>
    <div style="overflow: hidden">
        <button @click="changeUrl('testWatch')">toTest</button>
         <van-loading style="margin: 4rem auto" v-if='isloading' size="24px" vertical>加载中...</van-loading>
        <div v-if="replace"
            style="display: flex;flex-direction: column;align-items: center;margin-top: 3rem"
            size="24px" vertical>
            <img src="../../assets/iboss_errorpage_nodata.png" style="width: 2.5rem;height: 3.5rem;" />
            <span style="margin-top: 0.3rem;">业绩填报仅限商务端使用</span>
            <span>如需开通请联系技术支持</span>
        </div>
        <div >
        <header>
            <div v-if="roleName==2||roleName==3 || roleName == 4" @click='changeUrl("resultsDay")'>
                <div class="nav">
                    <div class="firImg">
                        <img src="../../assets/resultsHome/meiriyeji.png" alt="">
                    </div>
                    <div @click='changeUrl("resultsDay")' class="iconimg">
                        <label>每日业绩</label><span>商务填表</span>
                        <p><span>当天数据当天填报，以最新为准</span></p>
                    </div>
                    <van-icon name="arrow" color="#9B9EA0" />
                </div>
            </div>
        </header>
        <div style="height:0.2rem"></div>
        <!-- 目标预设(只能团队经理和事业部总经理可见)-->
        <div v-if="roleName==1 || roleName==2 || roleName == 4">
            <span
                style="display: inline-block;margin-left: 0.34rem;font-size:0.32rem;font-family:PingFang-SC-Bold;font-weight:bold;color:rgba(55,59,65,1);line-height:1.09rem;">目标预设</span>
            <div class="nav">
                <div class="firImg">
                    <img src="../../assets/resultsHome/rimubiao.png" alt="">
                </div>
                <div @click='changeUrl("presetSubmit","0")' class="iconimg">
                    <label>日目标</label>
<!--                    <img v-if="iscomplete.isfilleddailypreperformancetarget==1" src="../../assets/resultsHome/true.png" alt="">-->
                    <img  src="../../assets/resultsHome/true.png" alt="">
                    <p><span>每日17点到20点填写明日业绩目标</span></p>
                </div>
                <van-icon name="arrow" color="#9B9EA0" />
            </div>
            <div @click='changeUrl("presetSubmit","1")' class="nav">
                <div class="firImg">
                    <img src="../../assets/resultsHome/zhoumubiao.png" alt="">
                </div>
                <div class="iconimg">
                    <label>周目标</label>
<!--                    <img v-if="iscomplete.isfilleweeklypreperformancetarget==1" src="../../assets/resultsHome/true.png" alt="">-->
                    <img  src="../../assets/resultsHome/false.png" alt="">
                    <p><span>每周最后一个工作日20点前填写下周业绩目标</span></p>
                </div>
                <van-icon name="arrow" color="#9B9EA0" />
            </div>
            <div @click='changeUrl("presetSubmit","2")' class="nav">
                <div class="firImg">
                    <img src="../../assets/resultsHome/yuemubiao.png" alt="">
                </div>
                <div class="iconimg">
                    <label>月目标</label>
<!--                    <img v-if="iscomplete.isfilledmonthpreperformancetarget==1" src="../../assets/resultsHome/true.png" alt="">-->
                    <img  src="../../assets/resultsHome/false.png" alt="">
                    <p><span>每月最后两个工作日填写下月业绩目标</span></p>
                </div>
                <van-icon name="arrow" color="#9B9EA0" />
            </div>
        </div>
        <div style="height:0.2rem"></div>
        <!-- 查看业绩 -->
        <footer v-if="!replace">
            <div @click='changeUrl("resultsView")' class="nav">
                <div class="firImg">
                    <img src="../../assets/resultsHome/chakanyeji.png" alt="">
                </div>
                <div style="width:4.6432rem">
                    <label>查看业绩</label>
                </div>
                <van-icon name="arrow" color="#9B9EA0" />
            </div>
        </footer>
    </div>

    </div>
</template>

<script>
export default{
    created(){
        sessionStorage.userid = '';
        sessionStorage.roleName = '';
        let code  = this.$route.query.code;
        // let code = '112233'
        // alert(code)
        this.$get('http://211.149.178.98:8088/api/sso/get_ssoinfo?code=' + code).then(res=>{

            // alert(res.userid)

            // sessionStorage.userId = res.userid
            // this.userId = res.userid
            sessionStorage.userId = '3191070';
            this.userId = '3191070';
            this.getUserIdentity()
        }).catch(err=>{
            console.log(err)
        })
    },


    data(){
        return {
            isloading:false,
            replace:false,      //没有任何权限
            userId:'',
            roleName:'',
            iscomplete:{
                isfilleddailypreperformancetarget:'',
                isfilleweeklypreperformancetarget:'',
                isfilledmonthpreperformancetarget:'',
            }
        }
    },
    methods:{
        // 获取用户身份
        getUserIdentity(){
            this.isloading = true
            this.$get('/performancePrefillController/fillPrePerformanceStatus/'+this.userId).then(res=>{
                // alert(res.code)
                // alert(res.roleName)
                if (res.code === 0) {
                this.isloading = false
                this.roleName = res.roleName
                console.log(res)
                sessionStorage.roleName = res.roleName
                // this.iscomplete = res.data
                } else {
                    this.isloading = false
                    this.roleName = res.roleName
                    console.log(res)
                    sessionStorage.roleName = res.roleName
                    // this.iscomplete = null
                    this.replace = true
                }
            })
        },
        // 页面跳转
        changeUrl(url,id){
            this.$router.push({
                name:url,
                query:{
                    performancePreType:id
                }
            })
        }
    }
}
</script>



<style scoped>
    .nav {
        background-color: white;
        padding: 0.4rem 0.13rem 0.4rem 0.3rem;
        display: flex;
        align-items: center;
        justify-content: space-between
    }

    .firImg img {
        height: 1rem;
        width: 1rem;
    }

    .nav label {
        font-size: 0.32rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(55, 59, 65, 1);
        line-height: 0.18rem;
        display: inline-block;
        margin-right: 0.2rem
    }

    .nav p {
        margin: 0
    }

    .nav span {
        font-size: 0.24rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(155, 158, 160, 1);
        line-height: 0.18rem;
    }
    .iconimg{
        width:4.83rem
    }

    .iconimg img {
        height: 0.24rem;
        width: 0.24rem;
    }
</style>
