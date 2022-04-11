<template>
    <section id="viewsComponents">
        <HeaderView/>
    </section>

    <!--<section class="body" id="profil">
        <p>{{email}}</p>
        <p>{{password}}</p>
    </section>-->
</template>

<script>
/*function getId(){
  let productUrl = location.href;
  let url = new URL(productUrl);
  let idUrl = url.searchParams.get("id");
  return idUrl;
}
fetch (`http://localhost:3000/api/users/${getId()}`)
  .then(function(res){
    if (res.ok){
      return res.json();
    }
  })
  .then(function(user){
    new Vue({
        el: "#profil",
        data: {
            email : user.email,
            password : user.password
        }
    })
  })
  .catch(function(err){
    console.log(err);
    return;
  }
);*/
import HeaderView from '@/components/header.vue'
export default {
    name: "viewsComponents",
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