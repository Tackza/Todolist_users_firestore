<template>
  <div class="container mt-4">
    <form @submit.prevent="submit">
      <div class="input-group mb-3 ">
        <input
          type="text"
          class="form-control"
          placeholder="Enter Your PhoneNumber"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          v-model="phoneNumber"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="submit"
            id="button-addon2"
          >
            Click
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      phoneNumber: null,
    };
  },
  methods: {
    submit() {
      this.$store
        .dispatch("init", this.phoneNumber)
        .then(() => {
          console.log("pass");
          this.$router.push({ name: "todolist" });
        })
        .catch(() => console.log("error"));
    },
  },
};
</script>
<style scoped>
#nav {
  padding: 30px;
}
.form-control{
    width: 20px;
}
</style>
