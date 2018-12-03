<template>
    <div id="main" class="app-main">
        <router-view></router-view>
    </div>
</template>

<script>

    export default {
        data () {
            return {
                theme: this.$store.state.app.themeColor,
                name: '天喜控股集团'
            };
        },

        mounted () {

        },

        beforeDestroy () {

        },
        methods: {

        },
        // created: function(){
        //     document.title = this.$t(this.name)
        // },
        // watch: {
        //     '$route'(){
        //         document.title = this.$t(this.name)
        //     }
        // }
    };
</script>

<style>
.app-main{
    width: 100%;
    height: 100%;
}
</style>
