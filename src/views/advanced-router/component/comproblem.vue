<template>
    <div class="modal-mask" v-show="show" transition="modal">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-header">
                    <slot name="header">
                        default header
                    </slot>
                </div>

                <div class="modal-body">
                    <slot name="body">
                        default body
                    </slot>
                </div>

                <div class="modal-footer">
                    <slot name="footer">
                        default footer
                        <button class="modal-default-button"
                                @click="changeShow">
                            关闭
                        </button>
                    </slot>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "comproblem",
        props: {
            show: {
                type: Boolean,
                required: true, // 必需且是bool类型的
                twoWay: true   // 双向绑定
            },
        },
        // props: ['initialCounter'],
        // data: function () {
        //     return { counter: this.initialCounter }
        // }
        data () {
            return {
                exit: false
            }
        },
        methods: {
            changeShow(){
                this.$emit("listenToChildren", this.exit)
            }
        },

        // mounted () {
        //     this.init();
        // },
    }
</script>

<style scoped>

</style>