<template>
    <div>
        <Table :columns="column" :data="tableDealer" @on-select="selectDealer"></Table>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {

        name: "orderDealer",
        data() {
            return {
                column: [
                    {
                        title: '名称',
                        align: 'center',
                        key: 'vendName'
                    },
                    {
                        title: '地址',
                        align: 'center',
                        key: 'vendAddress'
                    },
                    {
                        title: '经销地址',
                        align: 'center',
                        key: 'vendArea'
                    },
                    {
                        align: 'center',
                        type: 'selection',
                    }
                ],
                tableDealer: []
            }
        },
        methods: {
            getData() {
                axios.get(`api/material/vendors`).then((res) => {
                    this.tableDealer = res.data.data
                })
            },
            selectDealer(selection , row) {
                this.$emit("setOrderDealer",row.vendId);
            }
        },
        mounted() {
            this.getData()
        }
    }
</script>

<style scoped>

</style>