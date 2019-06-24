<template>
    <div class="container">
<!--        <p>请记住关闭！</p>-->
        <input type="text" v-model="value" />
        <div class="watchArr">
            <button @click="change">点击</button>
            <ul v-for="(item,index) in arr">
                <li :key="index">{{item}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "testWatch",
        data(){
            return {
                value: 'vue.js',    //测试监听input框事件
                i:0,
                arr: new Array(11).fill(0)  //测试监听数据值变化
            }
            },
            watch:{
            // value:function (value,oldeValue) {
            //     console.log(value)
            //     console.log(oldeValue)
            // }
            value: {
                handler: function(value, oldeValue) {
                    console.log(value)
                    console.log(oldeValue)
                },
                deep: true
            }
        },
        methods: {
        //    https://blog.csdn.net/qq_33300789/article/details/79555808
            change () {
                this.arr = new Array(11).fill(this.i++)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container{
        width: 100%;
        height: 100%;
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .watchArr{
            display: flex;
            flex-direction: row;
        }
    }
</style>
