<template>
    <div>
        <div class="nav">
            <img src="../../assets/successPage/success.png" alt="">
            <label>{{ msg }}提交成功</label>
            <van-button @click='changeUrl' style="color:white;width:2rem" type="info">查看业绩</van-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            msg:'业绩'
        }
    },
    methods:{
        changeUrl(){
            this.$router.push({
                name: 'resultsView'
            })
        }
    }
}
</script>


<style scoped>
.nav{
    padding-top: 1.2rem;
    height: 3.12rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center
}
img{
    height:1.2rem;
    width: 1.2rem
}
label{
font-size:0.3rem;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(55,59,65,1);
line-height:0.36rem;  
}
</style>

