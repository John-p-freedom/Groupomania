<!--------------------------------JAVASCRIPT-------------------------------->
<script>
    export default {
        name: "headerLink"
    }
</script>

<!--------------------------------HTML-------------------------------->
<template>

  <header class="header">

    <div class="header__logo">
      <img src="../assets/icon-monochrome-white.png" alt="Logo groupomania">
    </div>

    <div class="header__line"></div>

    <nav class="header__nav">
      <button @click="showSignup">Signup</button>
      <button @click="showLogin">Login</button>
    </nav>

  </header>

</template>

<!--------------------------------CSS-------------------------------->
<style lang="scss">

  @import "../utils/variables.scss";

  body {
    background-image: url("../assets/Fond_group.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    .header {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
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
        button{
          background: none;
          color: white;
          font-size: 2em;
        }
      }
    }
  }

</style>