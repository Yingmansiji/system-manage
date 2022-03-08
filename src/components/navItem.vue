<template>
    <li :key="itemKey">
        <div @click="toggle">
            <div
                    v-if="hasChild"
                    class="icon"
                    :class="[open ? 'folder-open' : 'folder']"
            >
                {{ model.name }}
            </div>
            <div v-if="!hasChild" class="icon file-text">{{ model.name }}</div>
        </div>
        <ul v-show="open" v-if="hasChild">
            <nav-item
                    class="nav-item"
                    v-for="(item, index) in model.resource"
                    :model="item"
                    :itemKey="index"
            ></nav-item>
        </ul>
    </li>
</template>

<script>
    export default {
        name: "navItem",
        props: ["model", "itemKey"],
        data() {
            return {
                open: false,
            };
        },
        computed: {
            hasChild() {
                return this.model.resource && this.model.resource.length;
            },
        },
        methods: {
            toggle() {
                if (this.hasChild) {
                    this.open = !this.open;
                } else {
                    this.$store.commit("currentTab", this.model);
                    let flag = this.$store.state.tabItems.findIndex((item) => item.name == this.model.name);
                    if (flag < 0) {
                        this.$store.commit("tabItems", [...this.$store.state.tabItems, this.model]);
                    }
                    this.$store.commit("frameSrc", this.model.url);
                    window.localStorage.setItem('curUrl', this.model.url);
                }
            },
        },
    };
</script>

<style>
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        font-size: 14px;
    }

    li {
        background: #000c17;
        padding: 0 20px;
    }

    li > div {
        cursor: pointer;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
    }

    .folder-open::after {
        content: "";
        width: 20px;
        height: 20px;
        border-bottom: 8px solid #b6b2b2;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        position: relative;
        top: -14px;
        left: 8px;
    }

    .folder::after {
        content: "";
        width: 20px;
        height: 20px;
        border-top: 8px solid #b6b2b2;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        position: relative;
        top: 14px;
        left: 8px;
    }
</style>
