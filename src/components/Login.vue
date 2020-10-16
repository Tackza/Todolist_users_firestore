<template>
  <div class="about">
    <div class="app-container">
      <form @submit.prevent="submit">
        <div class="form-group">
          <label for="exampleInputPassword1">Enter PhoneNumber</label>
          <input
            type="text"
            v-model="phoneNumber"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
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
