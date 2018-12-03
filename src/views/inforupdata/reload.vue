<template>
    <div class="row mt-3">


        <button @click="getData">删除</button>
    </div>
</template>

<script>
    import axios from 'axios'
    import Cookies from 'js-cookie'
    export default{
        data(){
            return{
                data: [],
                formItemIn: {
                    chatId: 8,
                    layerId: 1,
                    responderId: 6,
                    reviewerId: 5,
                    chatContent: "阿斯蒂芬",
                    chatDate: new Date(),
                    topLayer: 0,

                },
                userForm: {
                    id: Cookies.get('loginId'),
                    phone: '111111',
                },
                staffId: '1',
                shoppingRecord1: [
                    {
                        vendId:2,
                        date: new Date(),
                        priceAll: 10000,
                        potName: '蒸锅3',
                        prodtypeNum: '222',
                        priceSingle: 30
                    },
                    {
                        vendId:3,
                        date: new Date(),
                        priceAll: 10000,
                        potName: '蒸锅1',
                        prodtypeNum: '222',
                        priceSingle: 30
                    },
                    {
                        vendId:1,
                        date: new Date(),
                        priceAll: 10000,
                        potName: '蒸锅2',
                        prodtypeNum: '222',
                        priceSingle: 30
                    },
                ],
                staffItem:
                    {
                        staffId: '11',
                        staffName: '名2',
                        staffSex: '男',
                        staffPhone: '1231231222',
                        staffJob: '保洁',
                        staffDate: new Date(),
                        staffDept: '后勤部'
                    },

                vendor: {
                    userpwd: 123,
                    vendName: "张uw",
                    vendPhone: '13412341111',
                    vendEmail: '12313@qq.com',
                    vendAddress: '浙江杭州',
                    vendArea: '223600',
                }
            }
        },
        methods:{

            getData() {
                // axios.put(`api/material/update_staff`,this.staffItem,{
                //     headers: {
                //         'Content-Type': 'application/json'
                //     }
                // }).then((res) => {
                //     console.log(res)
                // }).catch(function (error) {
                //     console.log(error);
                // });
                console.log(this.vendor);
                axios.post(`api/user/register_vendor`,this.vendor).then((res) => {
                    console.log(res);
                    console.log(11111111111111)
                });
            },

            chatSubmit() {
                axios.put('/api/material/update_customer', this.userForm, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    console.log(response);

                }).catch(function (error) {
                    console.log(error);
                });
            }
        },
        mounted() {
            // this.getData()
        }
    }

</script>

<style scoped>

</style>