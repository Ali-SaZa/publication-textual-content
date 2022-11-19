<template>
  <div>
    <button @click="test">test</button>
    <h4>sss</h4>
  </div>
</template>

<script>
export default {
  name: "homePage",
  methods: {
    test() {
      console.log("sss", this.$route);
    },
  },
};
</script>

<style scoped></style>
