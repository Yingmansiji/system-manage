<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {},
  beforeCreate() {
    console.log("beforeCreate")
  },
  created() {
    console.log("created")
  },
  beforeMount() {console.log("beforeMount")},
  mounted() {console.log("mounted")},
  beforeUpdate() {console.log("beforeUpdate")},
  updated() {console.log("updated")},
  beforeUnmount() {console.log("beforeUnmount")},
  unmounted() {console.log("unmounted")},
  errorCaptured() {console.log("errorCaptured")},
  renderTracked() {console.log("renderTracked")},
  renderTriggered() {console.log("renderTriggered")},
  activated() {console.log("activated")},
  deactivated() {console.log("deactivated")},
};
</script>

<style lang="less"></style>
