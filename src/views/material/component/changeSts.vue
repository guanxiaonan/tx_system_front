<template>

        <tag type="dot" :color="stsColor">
            <span v-if="mailStateId">
                <button class="statusBtn" type="submit" @dblclick="changeSts">未寄</button>
            </span>
            <span v-if="!mailStateId">
                <span class="statusBtn1">已寄</span>
            </span>
        </tag>

</template>

<script>
    import axios from 'axios';
    export default {
        name: "changeSts",
        props: {
            mailStateId: '',
            stsColor: '',
            stsChange: false,
            id: ''
        },
        data () {
            return {
                msg1: 1,
                msg2: 2,
                stateForm:{
                    id: this.id,
                    mailStateId: 0
                },
            }
        },
        methods: {
            init () {

            },
            changeSts () {
                //update_mail
                // console.log(this.stateForm.id)
                this.stateForm.mailStateId = 2;
                axios.put('/api/material/update_mail', this.stateForm, {
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