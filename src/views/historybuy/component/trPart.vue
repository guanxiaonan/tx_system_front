<template>
    <tr>
        <td rowspan="4" colspan="1" align="center">
            {{shoppingRecord[1].time}}
        </td>
        <td>
            {{""}}
        </td>
        <td>
            {{""}}
        </td>
        <td>
            {{""}}
        </td>
        <td rowspan="4" colspan="1" align="center">
            {{shoppingRecord[1].priceAll}}
        </td>
    </tr>
    <tr v-for="item  in shoppingRecord[1].content" align="center">
        <td>
            {{item.productName}}
        </td>
        <td>
            {{item.quantity}}
        </td>
        <td>
            {{item.price}}
        </td>
    </tr>
</template>

<script>
    export default {
        name: "trPart",
        props: ['shoppingRecord']
    }
</script>

<style scoped>

</style>