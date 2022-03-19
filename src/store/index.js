import {createStore} from "vuex";

export default createStore({
    state() {
        return {
            "ETH-TOKEN": "",
            frameSrc: localStorage.getItem("curUrl") || "/app/task/taskList",
            activeIndex: localStorage.getItem("activeIndex") || "运营平台",
            tabItems: JSON.parse(localStorage.getItem("tabItems")) || [
                /*{
                ancestorIds: [],
                authorize: true,
                haveChild: false,
                iconCls: "",
                id: 3,
                name: "任务列表",
                pid: 1,
                pname: "",
                resource: [],
                type: "menu",
                url: "/app/task/taskList",
                weight: 2
            }*/
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
                    weight: 2
                }
            ],
            currentTab: JSON.parse(localStorage.getItem("currentTab")) || {
                ancestorIds: [],
                authorize: true,
                haveChild: false,
                iconCls: "",
                id: 3,
                name: "任务列表",
                pid: 1,
                pname: "",
                resource: [],
                type: "menu",
                url: "/app/task/taskList",
                weight: 2
            }
        }
    },
    mutations: {
        "ETH-TOKEN"(state, value) {
            state["ETH-TOKEN"] = value;
        },
        frameSrc(state, value) {
            state.frameSrc = value;
            localStorage.setItem("curUrl", value)
        },
        tabItems(state, value) {
            state.tabItems = value;
            localStorage.setItem("tabItems", JSON.stringify(value))
        },
        currentTab(state, value) {
            state.currentTab = value;
            localStorage.setItem("currentTab", JSON.stringify(value))
        },
        activeIndex(state, value) {
            state.activeIndex = value;
            localStorage.setItem("activeIndex", value)
        }
    },
    actions: {},
    modules: {},
});
