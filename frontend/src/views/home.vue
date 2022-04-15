<!--Reste à faire:
RELOAD PAGE
regex password encore à configurer-->
<template>
  <div>
    <div class="header">
      <div class="header__logo">
        <img src="../assets/icon-monochrome-white.webp" alt="Logo groupomania">
      </div>

      <div class="header__line"></div>

      <nav class="header__nav">
        <p @click="ShowSignupSwitch">Inscription</p>
        <p @click="ShowLoginSwitch">Connexion</p>
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
            <input type="email" name="email" id="emailLogin" v-model="emailLoginModel" size="25" placeholder="Ex: exemple@email.com" maxlength="50" required>
            <p v-if="validEmailLogin()">Veuillez respecter le format exemple@email.com</p>
          </div>

          <div class="login__form__password">
            <label for="passwordLogin">
              <strong>Mot de passe :</strong>
            </label>
            <input :type="passwordLoginType" v-model="passwordLoginModel" name="passwordLogin" id="passwordLogin" size="25" maxlength="50" required>
            <i @click="switchPasswordLoginShow" class="fa-solid" :class="passwordLoginIcon"></i>
            <p v-if="validPasswordLogin()">Le mot de passe doit contenir entre 8 et 32 caractères avec au minimum 1 lettre majuscule, 1 lettre minuscule, 1 chiffre et 1 caractère spécial</p>
          </div>

          <div class="login__form__submit">
            <input type="submit" value="Envoyer" @click.prevent="orderSubmitLogin" formmethod="post"/>
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
            <input type="email" name="email" id="emailSignup" v-model="emailSignupModel" size="25" placeholder="Ex: exemple@email.com" maxlength="50" required>
            <p v-if="validEmailSignup()">Veuillez respecter le format exemple@email.com</p>
          </div>

          <div class="signup__form__password">
            <label for="password">
              <strong>Mot de passe :</strong>
            </label>
            <input :type="passwordSignupType" v-model="passwordSignupModel" name="passwordSignup" id="passwordSignup" size="25" maxlength="50" required>
            <i @click="switchPasswordSignupShow" class="fa-solid" :class="passwordSignupIcon"></i>
            <p v-if="validPasswordSignup()">Le mot de passe doit contenir entre 8 et 32 caractères avec au minimum 1 lettre majuscule, 1 lettre minuscule, 1 chiffre et 1 caractère spécial</p>
          </div>

          <div class="signup__form__submit">
            <input type="submit" @click.prevent="orderSubmitSignup" value="Envoyer" formmethod="post"/>
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
        ShowLogin: true,
        emailLoginModel: "",
        passwordLoginType: "password",
        passwordLoginModel: "",
        passwordLoginIcon: "fa-eye-slash",
        ShowSignup: false,
        emailSignupModel: "",
        passwordSignupType: "password",
        passwordSignupModel: "",
        passwordSignupIcon: "fa-eye-slash"
      }
    },
    methods: {
      ShowLoginSwitch(){
        this.ShowLogin = true;
        this.ShowSignup = false;
      },
      validEmailLogin(){
        let RegExpForEmail = new RegExp ("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$", "g");
        let test = RegExpForEmail.test(this.emailLoginModel);
        if (this.emailLoginModel == ""){
          return false;
        }
        if (test){
          return false;
        } else {
          return true;
        }
      },
      switchPasswordLoginShow(){
        this.passwordLoginType = this.passwordLoginType === "password" ? "text" : "password";
        this.passwordLoginIcon = this.passwordLoginIcon === "fa-eye-slash" ? "fa-eye" : "fa-eye-slash";
      },
      validPasswordLogin(){
        let RegExpForPassword = new RegExp ("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|]){8,32}$");
        let test = RegExpForPassword.test(this.passwordLoginModel);
        if (this.passwordLoginModel == ""){
          return false;
        }
        if (test){
          return false;
        } else {
          return true;
        }
      },
      orderSubmitLogin(){
        const self = this;
        let user = {
          email : document.querySelector("#emailLogin").value,
          password : document.querySelector("#passwordLogin").value,
        };
        if (!this.validEmailLogin() && !this.validPasswordLogin()){
          fetch ("http://localhost:3000/api/users/login", {method: "post", headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify(user)})
            .then(function(res){
              if (res.ok){
                return res.json();
              }
            })
            .then(function(){
              self.$router.push({path:"/message"});
            })
            .catch(function(error){
              console.log(error);
            })
        }
      },
      ShowSignupSwitch(){
        this.ShowSignup = true;
        this.ShowLogin = false;
      },
      validEmailSignup(){
        let RegExpForEmail = new RegExp ("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$", "g");
        let test = RegExpForEmail.test(this.emailSignupModel);
        if (this.emailSignupModel == ""){
          return false;
        }
        if (test){
          return false;
        } else {
          return true;
        }
      },
      switchPasswordSignupShow(){
        this.passwordSignupType = this.passwordSignupType === "password" ? "text" : "password";
        this.passwordSignupIcon = this.passwordSignupIcon === "fa-eye-slash" ? "fa-eye" : "fa-eye-slash";
      },
      validPasswordSignup(){
        let RegExpForPassword = new RegExp ("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|]).{8,32}$");
        let test = RegExpForPassword.test(this.passwordSignupModel);
        if (this.passwordSignupModel == ""){
          return false;
        }
        if (test){
          return false;
        } else {
          return true;
        }
      },
      orderSubmitSignup(){
        const self = this;
        let user = {
          email : document.querySelector("#emailSignup").value,
          password : document.querySelector("#passwordSignup").value,
          admin : false
        };
        if (!this.validEmailSignup() && !this.validPasswordSignup()){
          fetch ("http://localhost:3000/api/users/signup", {method: "post", headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify(user)})
          .then(function(res){
            if (res.ok){
              return res.json();
            }
          })
          .then(function(){
            self.$router.push({path:"/message"});
          })
          .catch(function(error){
            console.log(error);
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../utils/variables.scss";
  @import "../utils/mixins.scss";
  @import "../utils/keyframes.scss";
  body {
  background-image: url("../assets/Fond_group.webp");
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