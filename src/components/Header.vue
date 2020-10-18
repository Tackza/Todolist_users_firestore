<template>
  <div>
    <nav class="navbar navbar-light bg-primary">
      <div class="col"></div>
      <div class="col text-bold Text-Header">{{ userName }}'sTodoList</div>
      <div class="col text-right icon-logout">
        <i class="fas fa-sign-out-alt" @click="logout"></i>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => {
          this.$router.push({ name: "login" });
        })
        .catch(() => {
          console.log("error");
        });
    },
  },
  computed: {
    userName() {
      return this.$store.getters["fetchUsername"];
    },
  },
};
</script>

<style>
.Text-Header {
  font-size: 40px;
  color: white;
}
.icon-logout .fas {
  font-size: 40px;
  color: white;
  cursor: pointer;
}
</style>