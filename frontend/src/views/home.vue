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
          </div>

          <div class="login__form__password">
            <label for="passwordLogin">
              <strong>Mot de passe :</strong>
            </label>
            <input :type="passwordLoginType" v-model="passwordLoginModel" name="passwordLogin" id="passwordLogin" size="25" maxlength="50" required>
            <i @click="switchPasswordLoginShow" class="fa-solid" :class="passwordLoginIcon"></i>
          </div>

          <p v-if="errorShowLogin">Identifiant et/ou mot de passe incorrect.</p>

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

          <div class="signup__form__pseudo">
            <label for="pseudo">
              <strong>Pseudo :</strong>
            </label>
            <input type="text" name="pseudo" id="pseudoSignup" v-model="pseudoSignupModel" size="25" maxlength="50" required>
            <p v-if="pseudoErrorShowSignup">Votre pseudo doit être compris entre 3 et 10 lettres et les seuls caractères accepter sont les lettres de A à Z en minuscule ou majuscule et sans accents.</p>
          </div>

          <div class="signup__form__email">
            <label for="email">
              <strong>Email :</strong>
            </label>
            <input type="email" name="email" id="emailSignup" v-model="emailSignupModel" size="25" placeholder="Ex: exemple@email.com" maxlength="50" required>
            <p v-if="emailErrorShowSignup">Veuillez respecter le format exemple@email.com</p>
          </div>

          <div class="signup__form__password">
            <label for="password">
              <strong>Mot de passe :</strong>
            </label>
            <input :type="passwordSignupType" v-model="passwordSignupModel" name="passwordSignup" id="passwordSignup" size="25" maxlength="50" required>
            <i @click="switchPasswordSignupShow" class="fa-solid" :class="passwordSignupIcon"></i>
            <p v-if="passwordErrorShowSignup">Le mot de passe doit contenir entre 8 et 32 caractères avec au minimum 1 lettre majuscule, 1 lettre minuscule, 1 chiffre et 1 caractère spécial</p>
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
        errorShowLogin: false,
        ShowSignup: false,
        pseudoSignupModel: "",
        pseudoErrorShowSignup: "",
        emailSignupModel: "",
        emailErrorShowSignup: false,
        passwordSignupType: "password",
        passwordSignupModel: "",
        passwordSignupIcon: "fa-eye-slash",
        passwordErrorShowSignup: false,
      }
    },
    methods: {
      ShowLoginSwitch(){
        this.ShowLogin = true;
        this.ShowSignup = false;
      },
      switchPasswordLoginShow(){
        this.passwordLoginType = this.passwordLoginType === "password" ? "text" : "password";
        this.passwordLoginIcon = this.passwordLoginIcon === "fa-eye-slash" ? "fa-eye" : "fa-eye-slash";
      },
      orderSubmitLogin(){
        const self = this;
        let user = {
          email : this.emailLoginModel,
          password : this.passwordLoginModel,
        };
        fetch ("http://localhost:3000/api/users/login", {method: "post", headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify(user)})
          .then(function(res){
            if (res.ok){
              return res.json();
            }
          })
          .then(function(data){
            user = data.token;
            sessionStorage.setItem("user", JSON.stringify(user));
            self.$router.push({path:"/message"});
          })
          .catch(function(){
            self.errorShowLogin = true;
          })
      },
      ShowSignupSwitch(){
        this.ShowSignup = true;
        this.ShowLogin = false;
      },
      switchPasswordSignupShow(){
        this.passwordSignupType = this.passwordSignupType === "password" ? "text" : "password";
        this.passwordSignupIcon = this.passwordSignupIcon === "fa-eye-slash" ? "fa-eye" : "fa-eye-slash";
      },
      orderSubmitSignup(){
        const self = this;
        let RegExpForPseudo = new RegExp ("^[a-zA-Z]{3,10}$");
        let testPseudo = RegExpForPseudo.test(this.pseudoSignupModel);
        let RegExpForEmail = new RegExp ("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$", "g");
        let testEmail = RegExpForEmail.test(this.emailSignupModel);
        let RegExpForPassword = new RegExp ("^[a-zA-Z0-9!@#|§:;.,?<>$%^&*]{8,32}");
        let testPassword = RegExpForPassword.test(this.passwordSignupModel);
        if (!testPseudo){
          return this.pseudoErrorShowSignup = true;
        }
        if (!testEmail){
          return this.emailErrorShowSignup = true;
        }
        if (!testPassword){
          return this.passwordErrorShowSignup = true;
        }
        if (testEmail && testPassword){
          let User = {
            pseudo : this.pseudoSignupModel,
            email : this.emailSignupModel,
            password : this.passwordSignupModel,
            admin : false
          };
          fetch ("http://localhost:3000/api/users/signup", {method: "post", headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify(User)})
          .then(function(res){
            if (res.ok){
              return res.json();
            }
          })
          .then(function(data){
            let user = data.token;
            sessionStorage.setItem("user", JSON.stringify(user));
            self.$router.push({path:"/message"});
          })
          .catch(function(error){
            console.log(error);
          })
        }
      }
    },
    mounted(){
      (() => {
        if (window.localStorage) {
          if (!localStorage.getItem('reload')) {
            localStorage['reload'] = true;
            window.location.reload();
          } else {
            localStorage.removeItem('reload');
          }
        }
      })();
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
      @include home;
    }
    .login{
      @include home;
    }
  }
</style>