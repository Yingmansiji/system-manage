<template>
    <div class="login_page">
        <div class="page_body">
            <img src="../assets/images/logo.png">
            <div class="form">
                <el-form ref="form" :model="form" label-width="100px" :rules="rules">
                    <el-form-item label="用户名" prop="userName">
                        <el-input style="width: 200px" v-model="form.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" style="width: 200px" v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item label="二级密码" prop="secondaryPwd">
                        <el-input style="width: 200px" v-model="form.secondaryPwd"></el-input>
                    </el-form-item>
                    <el-form-item label="   ">
                        <el-checkbox v-model="form.rememberMe">记住我</el-checkbox>
                    </el-form-item>
                    <el-form-item label="  ">
                        <el-button type="primary" @click="login('form')">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
    ElCheckbox,
    ElCol,
    ElMessage,
} from "element-plus";

import {mapMutations} from "vuex";
import {login} from "@/assets/js/api";
import {setCookie} from "@/assets/js/utils";

export default {
    name: "login",
    components: {
        ElForm,
        ElFormItem,
        ElInput,
        ElButton,
        ElCheckbox,
        ElCol,
        ElMessage,
    },
    data() {
        return {
            form: {
                userName: "",
                password: "",
                secondaryPwd: "",
                rememberMe: false,
            },
            rules: {
                userName: [
                    {
                        required: true,
                        message: "请输入用户名!",
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "请输密码!",
                        trigger: "blur",
                    },
                ],
                secondaryPwd: [
                    {
                        required: true,
                        message: "请输入二级密码!",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        ...mapMutations(["ETH-TOKEN"]),
        login(formName) {
            let _this = this;
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    login({
                        userName: this.form.userName,
                        pwd: this.form.password,
                        secondaryPwd: this.form.secondaryPwd,
                    })
                        .then((res) => {
                            if (res.code === "200") {
                                let data = res.data;
                                ElMessage.success("登录成功！");
                                setCookie("ETH-TOKEN", data.token, data.expiredTime);
                                data.realName &&
                                window.localStorage.setItem("realName", data.realName);
                                window.sessionStorage.setItem("ETH-TOKEN", data.token);
                                window.localStorage.setItem("ETH-TOKEN", data.token);
                                _this.$router.go(0)// 刷新页面，进入管理页
                            } else {
                                ElMessage.error(
                                    res.msg ? res.msg : "用户名或密码错误，请重新输入"
                                );
                            }
                        })
                        .catch((error) => {
                            console.error("登录失败", error);
                            ElMessage.error(
                                error.msg ? error.msg : "用户名或密码错误，请重新输入"
                            );
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
    },
};
</script>

<style scoped lang="less">
.login_page {
    width: 100vw;
    height: 100vh;
    background: url("../assets/images/bg.jpg") no-repeat;
    background-size: 100% 100%;
}
.page_body{
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
}
img {
    width:200px;
}

.form {
    background-color: rgba(182, 178, 178, 0.2);
    border: 1px solid #b6b2b2;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 350px;
    width: 450px;
}

.el-form {
    display: flex;
    flex-flow: column;
    width: 100%;

    /deep/ .el-form-item__label {
        flex: 1;
    }

    /deep/ .el-form-item__content {
        flex: 2;
    }
}
</style>
