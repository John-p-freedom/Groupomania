<!--Reste à faire:
gérer modification user-->
<template>
<span id="viewsComponents">
    <section id="header">
        <HeaderView/>
    </section>

    <section class="profil" id="profil" v-for="user in users" :key="user">
      <div class="profil__title">
        <h1>Profil de {{user.pseudo}}</h1>
        <h4 v-if="user.admin">Compte administateur</h4>
        <h4 v-else>Compte utilisateur</h4>
      </div>

      <div class="profil__change">

        <p>Votre pseudo est : <strong>{{user.pseudo}}</strong></p>
        <div class="profil__change__pseudo">
          <label for="newPseudo">Votre nouveau pseudo : </label>
          <input type="text" name="pseudo" id="newPseudo" v-model="newPseudoModel" size="25" maxlength="50">
          <p v-if="newPseudoErrorShow">Votre pseudo doit être compris entre 3 et 10 lettres et les seuls caractères accepter sont les lettres de A à Z en minuscule ou majuscule et sans accents.</p>
        </div>

        <p>Votre adresse email est : <strong>{{user.email}}</strong></p>
        <div class="profil__change__email">
          <label for="newEmail">Votre nouvelle adresse email : </label>
          <input type="email" name="newEmail" id="newEmail" v-model="newEmailModel" size="25" placeholder="Ex: exemple@email.com" maxlength="50">
          <p v-if="newEmailErrorShow">Veuillez respecter le format exemple@email.com</p>
        </div>

        <div class="profil__change__password">
          <label for="newPassword">Nouveau mot de passe : </label>
          <input :type="newPasswordType" v-model="newPasswordModel" name="newPassword" id="newPassword" size="25" maxlength="50">
          <i @click="switchNewPasswordShow" class="fa-solid" :class="newPasswordIcon"></i>
          <p v-if="newPasswordErrorShow">Le mot de passe doit contenir entre 8 et 32 caractères avec au minimum 1 lettre majuscule, 1 lettre minuscule, 1 chiffre et 1 caractère spécial</p>
        </div>

      </div>

      <div class="profil__submit">
        <div class="profil__submit__modify">
          <button @click.prevent="modifyProfile()">Valider les modifications</button>
        </div>

        <div class="profil__submit__delete">
          <button @click.prevent="deleteProfile()">Supprimer votre compte</button>
        </div>
      </div>
    </section>
</span>
</template>

<script>
import HeaderView from '@/components/header.vue'
export default {
  name: "viewsComponents",
  components:{
    HeaderView
  },
  data: function (){
    return {
        users:"",
        newPseudoModel: "",
        newPseudoErrorShow: "",
        newEmailModel: "",
        newEmailErrorShow: false,
        newPasswordType: "password",
        newPasswordModel: "",
        newPasswordIcon: "fa-eye-slash",
        newPasswordErrorShow: false,
        userId: ""
    };
  },
  methods: {
    getStorage(){
      const token = JSON.parse(sessionStorage.getItem("user"));
      const self = this;
      fetch (`http://localhost:3000/api/users/storage`, { headers: new Headers({'Authorization': 'Bearer '+token})}) 
        .then(function(res){
            if (res.ok){
                return res.json();
            }
        })
        .then(function(userValues){
            self.users = userValues;
            self.userId = userValues.user.id;
        })
        .catch(function(err){
            console.error(err);
        })
    },
    switchNewPasswordShow(){
      this.newPasswordType = this.newPasswordType === "password" ? "text" : "password";
      this.newPasswordIcon = this.newPasswordIcon === "fa-eye-slash" ? "fa-eye" : "fa-eye-slash";
    },
    modifyProfile(){
      let RegExpForPseudo = new RegExp ("^[a-zA-Z]{3,10}$");
      let testPseudo = RegExpForPseudo.test(this.newPseudoModel);
      let RegExpForEmail = new RegExp ("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$", "g");
      let testEmail = RegExpForEmail.test(this.newEmailModel);
      let RegExpForPassword = new RegExp ("^[a-zA-Z0-9!@#|§:;.,?<>$%^&*]{8,32}");
      let testPassword = RegExpForPassword.test(this.newPasswordModel);
      if (this.newPseudoModel == "" && this.newEmailModel == "" && this.newPasswordModel == ""){
        alert("Veuillez inscrire vos modifications avant de valider")
      }
      //let user = {};
      if (!testPseudo && this.newPseudoModel != ""){ 
        this.newPseudoErrorShow = true;
      } else if (testPseudo){
        this.newPseudoErrorShow = false;
        //user = {pseudo : this.newPseudoModel};
      } 
      if (!testEmail && this.newEmailModel != ""){
        this.newEmailErrorShow = true;
      } else if (testEmail){
        this.newEmailErrorShow = false;
        //user = {email : this.newEmailModel};
      }
      if (!testPassword && this.newPasswordModel != ""){
        this.newPasswordErrorShow = true;
      } else if (testPassword){
        this.newPasswordErrorShow = false;
        //user = {password : this.newPasswordModel};
      }
      /*const token = JSON.parse(sessionStorage.getItem("user"));
      const self = this;
      fetch (`http://localhost:3000/api/users/${self.userId}`, {method: "put", headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify(user)})
        .then(function(res){
          if (res.ok){
            return res.json();
          }
        })
        .then(function(){
          location.reload();
        })
        .catch(function(err){
          console.log(err);
        });*/
    },
    deleteProfile(){
      const token = JSON.parse(sessionStorage.getItem("user"));
      const self = this;
      fetch (`http://localhost:3000/api/users/${self.userId}`, {method: "delete", headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}})
        .then(function(res){
          if (res.ok){
            return res.json();
          }
        })
        .then(function(){
          sessionStorage.removeItem("user");
          self.$router.push({path:"/"});
        })
        .catch(function(err){
          console.log(err);
        });
    }
  },
  mounted(){
    this.getStorage();
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
    @include body;

    .profil{
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: map-get($color, fond_orange);
      margin: 15px 30% 15px 30%;
      &__title{
        text-align: center;
      }
      &__change{
        p{
        text-align: left;
        }
        &__pseudo{
          @include profil;
        }
        &__email{
          @include profil;
        }
        &__password{
          @include profil;
          .fa-solid{
            cursor: pointer;
          }
        }
        &__valid{
          @include profil;
          .fa-solid{
            cursor: pointer;
          }
        }
      }
      &__submit{
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-bottom: 30px;
      }
    }
</style>