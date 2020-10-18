<template>
  <div class="home">
    <Header />
    <Todolist />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "../components/Header";

export default {
  name: "Home",
  components: {
    Todolist,
    Header,
  },
};
</script>
