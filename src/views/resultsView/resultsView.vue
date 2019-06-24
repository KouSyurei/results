<template>
        <div class="container" style="overflow: hidden">
                <van-loading style="margin: 4rem auto" v-if='isloading' size="24px" vertical>加载中...</van-loading>
                <div v-if='!isloading'>
            <div v-for="(item,index) in showData" :key="index" class="content">
                <div class="title flexRow pRightLeft"  @click="openChild(item.level,item.level_id) ">
                    <div class="text">
                        <div class="rectangular"></div>
                        <span class="titleText">{{item.level_name}}</span>
                    </div>
                    <div class="icon" v-if='!isHidde'><van-icon name="arrow"  color="#9B9EA0" /></div>
                </div>
                <div class="border flexRow pRightLeft">
                    <div>
                        <div class="dataTitle">日业绩</div>

                        <div class="otherColor">{{item.performance_day?item.performance_day:0}}</div>
                    </div>
                    <div>
                        <div class="dataTitle">日目标</div>
                        <div class="anotherColor">{{item.target_value_day?item.target_value_day:0}}</div>
                    </div>
                    <div>
                        <div class="dataTitle">进度</div>
                        <div class="anotherColor">{{item.target_value_day == 0 || item.performance_day == 0 ?'无': Math.floor(item.performance_day/item.target_value_day*100)+ '%'}}
                            </div>
                    </div>
                </div>
                <div class="border flexRow pRightLeft">
                    <div>
                        <div class="dataTitle">周业绩</div>
                        <div class="otherColor">{{item.performance_week?item.performance_week:0}}</div>
                    </div>
                    <div>
                        <div class="dataTitle">周目标</div>
                        <div class="anotherColor">{{item.target_value_week?item.target_value_week:0}}</div>
                    </div>
                    <div>
                        <div class="dataTitle ">进度</div>
                        <div class="anotherColor">
                                {{item.target_value_week == 0 || item.performance_week == 0 ?'无': Math.floor(item.performance_week/item.target_value_week*100)+ '%'}}
                        </div>
                    </div>
                </div>
                <div class="border flexRow pRightLeft">
                    <div>
                        <div class="dataTitle">月业绩</div>
                        <div class="otherColor ">{{item.performance_month?item.performance_month:0}}</div>
                    </div>
                    <div>
                        <div class="dataTitle ">月目标</div>
                        <div class="anotherColor">{{item.target_value_month?item.target_value_month:0}}</div>
                    </div>
                    <div>
                        <div class="dataTitle ">进度</div>
                        <div class="anotherColor">
                            <!-- {{ (item.performance_month/item.target_value_month)== 'Infinity'||'NaN'?'无':item.target_value_month == 0 ? 0.00+'%':
                            Math.floor(item.performance_month/item.target_value_month*100)+ '%'}} -->
                            {{item.target_value_month == 0 || item.performance_month == 0 ?'无': Math.floor(item.performance_month/item.target_value_month*100)+ '%'}}
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </template>

        <script>
            export default {
                name: "resultsView",
                data(){
                    return {
                        isloading:false,
                        showData:[] ,    //第一次打開頁面渲染該id下的數據
                        isMore: false,   //點擊業態下屬是否還是有子組織，id是員工的默認為false
                        isHidde: false,  //点击菜单是商务（level=3）隐藏箭头图标
                        flag:1,        //1 業態 2事業部 3部門 4人員
                        type:'',

                    }
                },
                created () {
                    // alert(sessionStorage.roleName+'=='+sessionStorage.userId)
                    console.log(typeof 123)
                    if(sessionStorage.roleName == '1'){ // 事业部总
                        sessionStorage.pageLevel = '2'  // 事业部门总在第二个层级页面
                        this.type = 'business'
                    }else if(sessionStorage.roleName == '2'){ // 部门经理
                        sessionStorage.pageLevel = '3'      // 事业部门经理在第三个层级页面
                        this.type = 'dept'
                    }else if(sessionStorage.roleName == '3'){ // 个人
                        sessionStorage.pageLevel = '4'      // 个人在第后一个页面
                    this.isHidde = true
                        this.type = 'person'
                    }else if(sessionStorage.roleName == '4'){ // 业态总
                        sessionStorage.pageLevel = '1'
                        this.type = 'yt'
                    }else if(sessionStorage.roleName == '4'){
                        sessionStorage.pageLevel = '1'
                        this.type = 'yt'
                    }
                    this.isloading = true
                    // alert(sessionStorage.roleName+"=="+this.type+'=-'+sessionStorage.userId)
                        this.$get('/fill/achievement?type='+this.type+'&init='+'1'+'&loginName=' + sessionStorage.userId).then(res=>{
                            console.log(res.data.length)
                            this.isloading = false
                            if(res.data.length == '0'){
                                this.$router.replace({
                                    name:'placeholder'
                                })
                            }
                            let ytData = JSON.stringify(res.data);
                            console.log(res.data)
                            sesessionStorage.ytData = ytData;
                            if(res.data.length === 0){
                                this.showData =
                                    [{level_name:'无',
                                        performance_day:'无',
                                        target_value_day:'无',
                                        performance_month:'无',
                                        target_value_month:'无',
                                        target_value_week:'无',
                                        performance_week:'无',
                                        performance_day:'无',
                                        progressTool:'无'
                                    }]
                            }else {
                                this.showData = res.data;
                            }
                        }).catch(error => {
                            console.log(error)
                        })
                },
                mounted() {
                },
                methods: {
                    openChild(level,level_id) {
                        if(this.isHidde){
                            return
                        }
                        let url = level === 1 ? '/fill/achievement?type=business&id='+level_id+'&init=0' :
                            level === 2 ? '/fill/achievement?type=dept&id='+level_id+'&init=0' :
                                level === 3 ? '/fill/achievement?type=person&id='+level_id+'&init=0' : "";
                        this.isMore = url === '' ? false : true;
                        // this.hidden = level === 4 ? true : false;
                        console.log(level)
                        if(level == 3){
                            console.log('等级4')
                            this.isHidde= true
                            console.log(this.isHidde)
                        }
                         console.log(url)
                         this.isloading = true
                            this.$get(url).then(res=> {
                                // console.log(res)
                                // return
                                this.isloading = false
                                if (res.data.length) {
                                    console.log(res.data)
                                    this.isMore = true
                                    this.showData = res.data
                                } else {
                                    this.isMore = false
                                   this.$router.replace({
                                       name:'placeholder'
                                   })
                                }
                            }).catch(error=> {
                                console.log(error)
                            })
                            console.log(this.isHidde)
                        // }
                        // alert(this.isHidde)
                    }
                }
            }
        </script>

        <style lang="scss" scoped>
            .container{
                width: 100%;
                background-color: #F5F5F5;
            }
            .content{
                margin-top: 0.2rem;
            }
            .title{
                height: 0.85rem;
                background-color: #fff;
            }
            .rectangular{
                width: 0.08rem;
                height: 0.28rem;
                background-color: #1D90F5;
            }
            .text{
                display: flex;
                flex-direction: row;
                align-items: center;
            }
            .titleText{
                font-size: 0.32rem;
                font-family: 'PingFang-SC-Bold';
                font-weight: Bold;
                margin-left: 0.24rem;
            }
            .otherColor{
                color: #373B41;
            }
            .anotherColor{
                color: #F54743;
            }
            .icon{width: 0.15rem;height: 0.3rem;padding-right: 0.1rem}
            .border{
                border-top:0.01rem #EEEEEE solid;
                background-color: #ffffff;
                height: 1.51rem;
                div:nth-child(1){width: 35%}
                div:nth-child(2){width: 40%}
                div:nth-child(3){width: 25%}
                div{
                    div{
                        text-align: left;
                    }
                    .dataTitle{
                        font-family:'PingFang-SC-Medium' ;
                        font-size: 0.28rem ;
                        color: #9B9EA0;
                    }
                    div:nth-child(2){
                        font-size:0.32rem ;
                        font-family: 'PingFang-SC-Bold';
                        font-weight: bold;
                    }
                }
            }
            .flexRow{
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
            }
            .pRightLeft{
                padding-left: 0.3rem;
                padding-right: 0.3rem;
            }
        </style>
