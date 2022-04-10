<template>
    <section id="appHeader">
        <HeaderView/>
    </section>

    <section class="body">

    </section>
</template>

<script>
/*function getId(){
  let productUrl = location.href;
  let url = new URL(productUrl);
  let idUrl = url.searchParams.get("id");
  return idUrl;
}*/
import HeaderView from '@/components/header.vue'
export default {
    name: "appHeader",
    components:{
        HeaderView
    }
}
</script>

<style lang="scss">
    @import "../utils/variables.scss";
    @import "../utils/mixins.scss";
    @include body;
</style>