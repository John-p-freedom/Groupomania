<template>
    <!--<section class="login" v-show="showLogin" id="login">-->
    <section class="login">

      <div class="login__title">
        <h2>Identifiez-vous</h2>
      </div>

      <div class="login__form">
        <form method="post">

          <div class="login__form__email">
            <label for="email">
              <strong>Email :</strong>
            </label>

            <input type="texte" name="email" id="emailLogin" size="25" placeholder="Ex: Jean@groupomania.com" maxlength="50" required>
            <p id="emailLoginError"></p>
          </div>

          <div class="login__form__password">
            <label for="password">
              <strong>Mot de passe :</strong>
            </label>

            <input type="password" name="password" id="passwordLogin" size="25" maxlength="50" required>
            <p id="passwordLoginError"></p>
          </div>

          <div class="login__form__submit">
            <input type="submit" value="Envoyer" formaction="" formenctype="" formmethod="post" formtarget=""/>
          </div>

        </form>
      </div>
    </section>
</template>

<script>
    //Pourquoi les addEventListener font beuguer le site et ne veulent pas fonctionner ? (error : Cannot read properties of null (reading 'addEventListener')) 
    /*let emailLogin = document.querySelector("#emailLogin");
    let emailLoginError = document.querySelector("#emailLoginError");

    if (emailLogin){
        emailLogin.addEventListener("change", () => {
        validEmailLogin(this);
        });
    }

    let validEmailLogin = (emailLoginFunction) => {
        let RegExpForEmailLogin = new RegExp ("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$", "g");
        if (RegExpForEmailLogin.test(emailLoginFunction.value)){
        emailLoginError.innerHTML = "Adresse email valide";
        emailLoginError.style.color = "lime";
        emailLoginError.classlist.remove("text-danger");
        emailLoginError.classlist.add("text-sucess");
        return true;
        }else{
        emailLoginError.innerHTML = "Adresse email invalide, veuillez respecter le format exemple@email.fr";
        emailLoginError.style.color = "red";
        emailLoginError.classlist.remove("text-sucess");
        emailLoginError.classlist.add("text-danger");
        return false;
        }
    };

    let passwordLogin = document.querySelector("#passwordLogin");
    let passwordLoginError = document.querySelector("#passwordLoginError");

    passwordLogin.addEventListener("change", () => {
        validPasswordLogin(this);
    });
    
    let validPasswordLogin = (passwordLoginFunction) => {
        let RegExpForPasswordLogin = new RegExp ("^ (?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|]).{8,32}$");
        if (RegExpForPasswordLogin.test(passwordLoginFunction.value)){
        passwordLoginError.innerHTML = "Mot de passe sécurisé valide";
        passwordLoginError.style.color = "lime";
        passwordLoginError.classlist.remove("text-danger");
        passwordLoginError.classlist.add("text-sucess");
        return true;
        }else{
        passwordLoginError.innerHTML = "Le mot de passe doit contenir entre 8 et 32 caractères avec au minimum une majuscule, une minuscule, un chiffre et un caractère spécial";
        passwordLoginError.style.color = "red";
        passwordLoginError.classlist.remove("text-sucess");
        passwordLoginError.classlist.add("text-danger");
        return false;
        }
    };*/
</script>

<style lang="scss">
    @import "../utils/variables.scss";
    @import "../utils/mixins.scss";
    .login{
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: map-get($color, fond_orange);
    height: 400px;
    margin: 15px 30% 15px 30%;
      &__title{
        font-size: 25px;
        margin-bottom: 40px;
      }
      &__form{
        &__email{
          margin-bottom: 40px;
          label{
            @include label;
          }
          input{
            @include input;
          }
        }
        &__password{
          margin-bottom: 40px;
          label{
            @include label;
          }
          input{
            @include input;
          }
        }
        &__submit{
          display: flex;
          justify-content: center;
          input{
            background-color: map-get($color, txt_blue);
            border-radius: 50px;
            color: white;
            font: 20px bold;
            padding: 10px 25px;
            cursor: pointer;
          } 
        }
      }
    }
</style>