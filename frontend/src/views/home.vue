<template>
  <div>
    <div class="header">

      <div class="header__logo">
        <img src="../assets/icon-monochrome-white.png" alt="Logo groupomania">
      </div>

      <div class="header__line"></div>

      <nav class="header__nav">
        <p @click="ShowSignupSwitch">Inscription</p>
        <p @click="ShowLoginSwitch">Connection</p>
      </nav>
    </div>

    <section class="login" v-if="ShowLogin" id="login">

      <div class="login__title">
        <h2>Identifiez-vous</h2>
      </div>

      <div class="login__form">
        <form method="post">

          <div class="login__form__email">
            <label for="email">
              <strong>Email :</strong>
            </label>

            <input type="texte" name="email" @change="emailLoginChange" size="25" placeholder="Ex: exemple@email.com" maxlength="50" required>
            <p v-if="emailLoginErrorShow">Adresse email invalide, veuillez respecter le format exemple@email.com</p>
          </div>

          <div class="login__form__password">
            <label for="password">
              <strong>Mot de passe :</strong>
            </label>

            <input type="password" name="password" @change="passwordLoginChange" size="25" maxlength="50" required>
            <p v-if="passwordLoginErrorShow">Le mot de passe doit contenir au minimum une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial</p>
          </div>

          <div class="login__form__submit">
            <input type="submit" value="Envoyer" formaction="" formenctype="" formmethod="post" formtarget=""/>
          </div>

        </form>
      </div>
    </section>

    <section class="signup" v-if="ShowSignup" id="signup">

      <div class="signup__title">
        <h2>Inscrivez-vous</h2>
      </div>

      <div class="signup__form">
        <form method="post">

          <div class="signup__form__email">
            <label for="email">
              <strong>Email :</strong>
            </label>

            <input type="email" name="email" @change="emailSignupChange" size="25" placeholder="Ex: exemple@email.com" maxlength="50" required>
            <p v-if="emailSignupErrorShow">Adresse email invalide, veuillez respecter le format exemple@email.com</p>
          </div>

          <div class="signup__form__password">
            <label for="password">
              <strong>Mot de passe :</strong>
            </label>

            <input type="password" name="password" @change="passwordSignupChange" size="25" maxlength="50" required>
            <p v-if="passwordSignupErrorShow">Le mot de passe doit contenir au minimum une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial</p>
          </div>

          <div class="signup__form__submit">
            <input type="submit" id="order" value="Envoyer" formmethod="post"/>
          </div>

        </form>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
      name: "HomeView",
      data: function (){
        return {
          ShowSignup: false,
          ShowLogin: false,
          emailLoginErrorShow: false,
          passwordLoginErrorShow: false,
          emailSignupErrorShow: false,
          passwordSignupErrorShow: false
        }
      },
      methods: {
        ShowLoginSwitch(){
          this.ShowLogin = true;
          this.ShowSignup = false;
        },
        ShowSignupSwitch(){
          this.ShowSignup = true;
          this.ShowLogin = false;
        },
        emailLoginChange(){
          let regExpEmailLogin = new RegExp ("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$", "g");
          if (!regExpEmailLogin.test(this.value)){
            return this.emailLoginErrorShow = true;
          }
        },
        passwordLoginChange(){
          let regExpPasswordLogin = new RegExp ("^ (?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|]).{8,32}$");
          if (!regExpPasswordLogin.test(this.value)){
            return this.passwordLoginErrorShow = true;
          }
        },
        emailSignupChange(){
          let regExpEmailSignup = new RegExp ("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$", "g");
          if (!regExpEmailSignup.test(this.value)){
            return this.emailSignupErrorShow = true;
          }
        },
        passwordSignupChange(){
          let regExpPasswordSignup = new RegExp ("^ (?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|]).{8,32}$");
          if (!regExpPasswordSignup.test(this.value)){
            return this.passwordSignupErrorShow = true;
          }
        }
      }
  }

  /*let order = document.querySelector("#order");
  order.addEventListener("click", function send(){

    let user = {
      email : document.querySelector("#emailSignup").value,
      password : document.querySelector("#passwordSignup").value,
      admin : false
    };

    if (validEmailSignup(emailSignup) && validPasswordSignup(passwordSignup)){

      fetch ("http://localhost:3000/api/users/signup", {method: "post", headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify(user)})
        .then(function(res){
          if (res.ok){
            return res.json();
          }
        })
        .then(function(){
          
        })
        .catch(function(error){
          console.log(error);
        })
    }     
  });*/
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
        p{
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
    .signup{
      @include form;
    }
    .login{
      @include form;
    }
  }
</style>