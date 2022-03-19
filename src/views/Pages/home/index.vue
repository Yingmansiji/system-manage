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
            routersList: [
                {
                    ancestorIds: [],
                    authorize: true,
                    haveChild: true,
                    iconCls: "",
                    id: 6,
                    name: "CMS",
                    pid: 1,
                    pname: "",
                    type: "menu",
                    url: "",
                    weight: 2,
                    isUse: true,
                    resource:[
                        {
                            ancestorIds: [],
                            authorize: true,
                            haveChild: false,
                            iconCls: "",
                            id: 1,
                            name: "栏目",
                            pid: 1,
                            pname: "",
                            resource: [],
                            type: "menu",
                            url: "/category",
                            weight: 2,
                            isUse: true
                        },
                        {
                            ancestorIds: [],
                            authorize: true,
                            haveChild: false,
                            iconCls: "",
                            id: 2,
                            name: "点赞管理",
                            pid: 1,
                            pname: "",
                            resource: [],
                            type: "menu",
                            url: "/like",
                            weight: 2,
                            isUse: true
                        },
                        {
                            ancestorIds: [],
                            authorize: true,
                            haveChild: false,
                            iconCls: "",
                            id: 3,
                            name: "阅读文章活动",
                            pid: 1,
                            pname: "",
                            resource: [],
                            type: "menu",
                            url: "/readArticleActivity",
                            weight: 2,
                            isUse: true
                        },
                        {
                            ancestorIds: [],
                            authorize: true,
                            haveChild: false,
                            iconCls: "",
                            id: 4,
                            name: "评论管理",
                            pid: 1,
                            pname: "",
                            resource: [],
                            type: "menu",
                            url: "/comment",
                            weight: 2,
                            isUse: true
                        },
                        {
                            ancestorIds: [],
                            authorize: true,
                            haveChild: false,
                            iconCls: "",
                            id: 5,
                            name: "内容素材库",
                            pid: 1,
                            pname: "",
                            resource: [],
                            type: "menu",
                            url: "/material",
                            weight: 2,
                            isUse: true
                        },
                        {
                            ancestorIds: [],
                            authorize: true,
                            haveChild: false,
                            iconCls: "",
                            id: 6,
                            name: "文章管理",
                            pid: 1,
                            pname: "",
                            resource: [],
                            type: "menu",
                            url: "/articles",
                            weight: 2,
                            isUse: true
                        },
                        {
                            ancestorIds: [],
                            authorize: true,
                            haveChild: false,
                            iconCls: "",
                            id: 7,
                            name: "微信公众号文章抓取",
                            pid: 1,
                            pname: "",
                            resource: [],
                            type: "menu",
                            url: "/gzhInfo",
                            weight: 2,
                            isUse: true
                        }
                    ]
                }
            ]
        };
    },
    mounted() {
        this.getMenuList();
    },
    methods: {
        async getMenuList() {
            let result = await getMenu();
            if (result.code == "200" && result.success) {
                this.routersList = [...this.routersList, ...result.data];
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
