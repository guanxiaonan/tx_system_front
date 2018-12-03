<template>
    <div>
        <div>
            <card>
                <row>
                    <Col span="2">
                       <label for="1">图标显示</label>
                       <input type="radio" id="1" v-model="displayStyle" value="true" @click="load" />
                    </Col>
                    <Col span="2">
                        <label for="2">列表显示</label>
                        <input type="radio" id="2" v-model="displayStyle" value="false"  @click="unload" checked="checked" />
                    </Col>
                </row>
            </card>
        </div>
        <div class="margin-bottom-10"></div>
        <div>
            <icon-display v-if="displayStyle"></icon-display>
            <list-display v-else="displayStyle"></list-display>
        </div>
    </div>
</template>

<script>
    import iconDisplay from './component/iconDisplay'
    import listDisplay from './component/listDisplay'
    export default {
        name: "goods",
        components: {
            'icon-display': iconDisplay,
            'list-display': listDisplay
        },
        data () {
            return {
                displayStyle: false,
            }
        },
        methods: {
            init () {},
            load () {
                this.displayStyle = true;
                // console.log("icon" + this.displayStyle)
            },
            unload () {
                this.displayStyle = false;
                // console.log("list" + this.displayStyle)
            }
        },
        mounted () {
            this.init();
            // this.load();
            // this.unload()
        }
    }
</script>

<style scoped>

</style>