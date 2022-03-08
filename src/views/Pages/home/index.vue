<template>
    <el-container class="library_page">
        <sider-menu :routersList="routersList" class="library_page_nav"></sider-menu>
    </el-container>
</template>

<script>
    import siderMenu from "@/components/navList";
    import {getMenu} from "@/assets/js/api";
    import {ElContainer, ElHeader} from 'element-plus'

    export default {
        name: "homePage",
        components: {
            siderMenu, ElContainer, ElHeader
        },
        data() {
            return {
                routersList: []
            };
        },
        mounted() {
            this.getMenuList();
        },
        methods: {
            async getMenuList() {
                let result = await getMenu();
                if (result.code == "200" && result.success) {
                    this.routersList = result.data;
                }
            }
        },
    };
</script>

<style lang="less" scoped>
    .el-header {
        padding: 0;
    }

    .library_page {
        background-color: #ffffff;
        overflow: hidden;
        height: 100%;
    }
</style>
