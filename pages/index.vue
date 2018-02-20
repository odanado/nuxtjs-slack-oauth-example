<template>
  <div class="container">
    <div>
      <h1>Hello, {{ $store.state.name }} </h1>
      <img :src="$store.state.imageUrl">
    </div>
</div></template>

<script>
export default {
};
</script>

<style>

img {
  width: 100px;
  height: 100px;
  border-radius: 100px;
  margin: 15px 0;
}

</style>
