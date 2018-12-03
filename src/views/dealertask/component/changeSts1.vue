<template>

        <tag type="dot" :color="stsColor">
            <span v-if="stateId">
                <button class="statusBtn" type="submit" @dblclick="handleComplete(3)">待处理</button>
            </span>
            <span v-if="!stateId">
                <span class="statusBtn1">处理完成</span>
            </span>
        </tag>

</template>

<script>
    import axios from 'axios';
    export default {
        name: "changeSts",
        props: {
            stateId: '',
            stsColor: '',
            stsChange: false,
            id: ''
        },
        data () {
            return {
                msg1: 1,
                msg2: 2,
                // stateForm:{
                //     id: this.id,
                //     stateId: 0
                // },
                stateInformation2:{
                    id: this.id,
                    stateId: 0,
                    time: 0
                },
            }
        },
        methods: {
            init () {

            },
            handleComplete(i){
                if(confirm("确定完成了吗？")){
                    this.stateInformation2.stateId = i;
                    this.stateInformation2.time = this.$route.params.time + 1;
                    axios.put('/api/material/update_repairHandle', this.stateInformation2, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then((response) => {
                        this.$router.go(0)
                        // console.log(response);
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
            },
            // changeSts () {
            //     //update_mail
            //     // console.log(this.stateForm.id)
            //     this.stateForm.mailStateId = 3;
            //     axios.put('/api/material/update_mail', this.stateForm, {
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     }).then((response) => {
            //         console.log(response);
            //         this.$router.go(0)
            //     }).catch(function (error) {
            //         console.log(error);
            //     });
            // }
        },
        mounted () {
            this.init();
        },
        watch: {
            '$route' () {
                this.init();
                this.$router.go(0)
            },
        }
    }
</script>

<style scoped>
.statusBtn{
    border: none;
    color:red;
    background-color: #FFFFFF;
}
.statusBtn1{
    border: none;
    color: green;
    background-color: #FFFFFF;
}
</style>