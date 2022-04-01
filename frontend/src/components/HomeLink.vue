<template>
    <div class="header">

      <div class="header__logo">
        <img src="../assets/icon-monochrome-white.png" alt="Logo groupomania">
      </div>

      <div class="header__line"></div>

      <nav class="header__nav">
        <!--<p @click="showSignup = !showSignup">Inscription</p>
        <p @click="showLogin = !showLogin">Connection</p>-->
        <routeur-link to="/signup" @click="showSignup = !showSignup">Inscription</routeur-link>
        <routeur-link to="/login" @click="showLogin = !showLogin">Connection</routeur-link>
      </nav>
    </div>
    <routeur-view/>
</template>

<script>
    export default {
        name: "HomeLink"
    }
    const log = new Vue({
            el: '#login',
            data: {
                showLogin: false
            }
    })
    const sign = new Vue({
            el: '#signup',
            data: {
                showSignup: false
            }
    })
</script>

<style lang="scss">
    @import "../utils/variables.scss";
    @import "../utils/mixins.scss";
    body {
    background-image: url("../assets/Fond_group.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    .header {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: map-get($color,fond_blue);
      height: 200px;
      &__logo{
        margin-top: 20px;
        display: flex;
        justify-content: center;
        img{
          height: 90px;
        }
      }
      &__line{
        background-color: map-get($color, txt_orange);
        height: 3px;
      }
      &__nav{
        display: flex;
        justify-content: space-around; 
        router-link{
          color: white;
          font-size: 2em;
          margin-top: 1px;
          cursor: pointer;
          &:hover{
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>