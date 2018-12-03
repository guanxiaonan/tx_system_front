<template>
    <div>
        <Table :columns="column" :data="tableDealer" @on-select="selectStaff"></Table>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {

        name: "orderStaff",
        data() {
            return {
                column: [
                    {
                        title: '姓名',
                        align: 'center',
                        key: 'staffName'
                    },
                    {
                        title: '电话',
                        align: 'center',
                        key: 'staffPhone'
                    },
                    {
                        title: '员工编号',
                        align: 'center',
                        key: 'staffId'
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
                axios.get(`api/material/staff`).then((res) => {
                    this.tableDealer = res.data.data
                })
            },
            selectStaff(selection , row) {
                this.$emit("setOrderStaff",row.staffId);
            }
        },
        mounted() {
            this.getData()
        }
    }
</script>

<style scoped>

</style>