<template>

        <tag type="dot" :color="stsColor">
            <span v-if="compState">
                <button class="statusBtn" type="submit" @dblclick="changeSts">未处理</button>
            </span>
            <span v-if="!compState">
                <span class="statusBtn1">处理完成</span>
            </span>
        </tag>

</template>

<script>
    import axios from 'axios';
    export default {
        name: "changeSts",
        props: {
            compState: '',
            stsColor: '',
            stsChange: false,
            compId: ''
        },
        data () {
            return {
                msg1: 1,
                msg2: 2,
                stateForm:{
                    compId: this.compId,
                    compState: 2
                },
            }
        },
        methods: {
            init () {

            },
            changeSts () {
                //update_mail
                // console.log(this.stateForm.id)
                // this.stateForm.compState = 2;
                console.log(this.stateForm);
                axios.put('/api/material/update_complaint', this.stateForm, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    console.log(response);
                    this.$router.go(0)
                }).catch(function (error) {
                    console.log(error);
                });
            }
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