<template>
    <!--<div>-->
    <div class="nav_page">
        <el-aside>
            <ul class="nav_bar" ref="nav_bar">
                <nav-item
                        v-for="(navItem, index) in routersList"
                        :model="navItem"
                        :itemKey="index"
                />
            </ul>
        </el-aside>
        <el-main>
            <el-tabs
                    v-model="editableTabsValue"
                    type="card"
                    class="demo-tabs"
                    closable
                    @tab-remove="removeTab"
                    @edit="addTab"
            >
                <el-tab-pane
                        v-for="item in state.editableTabs"
                        :key="item.name"
                        :label="item.name"
                        :name="item.name"
                >
                    <!--<div :id="'iframe'+item.id"></div>-->
                    <iframe target="_parent" :id="'iframe'+item.id" :src="'http://localhost:4004' + item.url"
                            :width="frameWidth"
                            :height="frameHeight"/>
                </el-tab-pane>
            </el-tabs>
        </el-main>
    </div>
</template>
<script setup>
    import {ElTabs, ElTabPane, ElButton, ElAside, ElMain} from "element-plus";
    import navItem from "@/components/navItem";
    import store from "../store";
    import {ref, toRefs, computed, watch, reactive, nextTick, onMounted, onBeforeUnmount} from "vue";

    const state = reactive({
        editableTabs: store.state.tabItems
    })

    const props = defineProps({
        routersList: {type: Array, default: []}
    })

    const editableTabsValue = ref(store.state.tabItems[0].name);

    const nav_bar = ref()
    const frameWidth = ref(500)
    const frameHeight = ref(500)


    onMounted(() => {
        // initFrame()
        nextTick(() => {
            frameWidth.value = document.body.clientWidth - nav_bar.value.clientWidth;
            frameHeight.value = document.body.clientHeight - 60
        })
        window.addEventListener("resize", windowResize);
    });


    // 初始化窗口
    const initFrame = () => {
        state.editableTabs.map(tab => {
            let frame = document.getElementById("iframe" + tab.id)
            frame.innerHTML =
                '<object target="_parent"  type="text/html" data="http://localhost:4004' + tab.url + '" width="' + (document.body.clientWidth - nav_bar.value.clientWidth) + '" height="' + (document.body.clientHeight - 60) + '" id="iframeObject' + tab.id + '"></object>';
        })
    }

    // 重新设置窗口高度宽度
    const windowResize = () => {
        nextTick(() => {
            frameWidth.value = document.body.clientWidth - nav_bar.value.clientWidth
            frameHeight.value = document.body.clientHeight - 60
        })
        /*state.editableTabs.map(tab => {
            let frame = document.getElementById("iframe" + tab.id);
            nextTick(() => {
                frame.style.width =
                    document.body.clientWidth - nav_bar.value.$el.clientWidth + "px";
                frame.style.height = (document.body.clientHeight - 60) + "px";
            })
        })*/
    }

    const setFrameUrl = (val) => {
        state.editableTabs = store.state.tabItems;
        editableTabsValue.value = store.state.currentTab.name;
    }

    const removeTab = (targetName) => {
        const tabs = state.editableTabs
        let activeName = editableTabsValue.value
        if (activeName === targetName) {
            tabs.forEach((tab, index) => {
                if (tab.name === targetName) {
                    const nextTab = tabs[index + 1] || tabs[index - 1]
                    if (nextTab) {
                        activeName = nextTab.name
                    }
                }
            })
        }

        editableTabsValue.value = activeName
        state.editableTabs = tabs.filter((tab) => tab.name !== targetName)
        console.log('editableTabs', state.editableTabs);
        store.commit("tabItems", state.editableTabs);
    }

    const newFrameUrl = computed(() => {
        return store.state.frameSrc;
    })

    watch(newFrameUrl,
        (val) => {
            setFrameUrl(val);
        },
        {
            deep: true// 深度监听
        }
    )

    onBeforeUnmount(() => {
        window.removeEventListener("resize", windowResize);
    })
</script>

<style scoped lang="less">
    .ant-layout, .el-main {
        background-color: #fff;
        padding: 0;
    }

    .nav_page {
        display: flex;
        flex-direction: row;
    }

    .nav_bar {
        background: #000c17;
        height: 100vh;
        overflow-y: auto;
        flex-shrink: 0;
    }

    ul {
        padding: 0;
        color: #ffffff;
        list-style: none;
        font-size: 14px;
    }

    iframe {
        border-width: 0;
    }
</style>