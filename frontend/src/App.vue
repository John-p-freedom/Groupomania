<!--------------------------------HTML-------------------------------->
<template>
  <div id="app">

    <!--HEADER-->
    <div class="header">

      <div class="header__logo">
        <img src="./assets/icon-monochrome-white.png" alt="Logo groupomania">
      </div>

      <div class="header__line"></div>

      <nav class="header__nav">
        <p>Inscription</p>
        <p>Connection</p>
      </nav>

  </div>

    <!--LOGIN-->
    <div class="login">

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
    </div>

    <!--SIGNUP-->
    <section class="signup">

      <div class="signup__title">
        <h2>Inscrivez-vous</h2>
      </div>

      <div class="signup__form">
        <form method="post">

          <div class="signup__form__email">
            <label for="email">
              <strong>Email :</strong>
            </label>

            <input type="texte" name="email" id="emailSignup" size="25" placeholder="Ex: exemple@email.fr" maxlength="50" required>
            <p id="emailSignupError"></p>
          </div>

          <div class="signup__form__password">
            <label for="password">
              <strong>Mot de passe :</strong>
            </label>

            <input type="password" name="password" id="passwordSignup" size="25" maxlength="50" required>
            <p id="passwordSignupError"></p>
          </div>

          <div class="signup__form__submit">
            <input type="submit" id="order" value="Envoyer" formaction="" formenctype="" formmethod="post" formtarget=""/>
          </div>

        </form>
      </div>
    </section>
  </div>
</template>

<!--------------------------------JAVASCRIPT-------------------------------->
<script>

  //LOGIN
  let emailLogin = document.querySelector("#emailLogin");
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

  if (passwordLogin){
    passwordLogin.addEventListener("change", () => {
      validPasswordLogin(this);
    });
  }
  
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
  };

  fetch ("http://localhost:3000/api/user/login")
    .then(function(res){
        if (res.ok){
            return res.json();
        }
    })
    .then(function(table){
      for (let users of table){
        console.log(users);
      }
    })
    .catch(function(err){
      console.log(err);
    }
);

  //SIGNUP
  let emailSignup = document.querySelector("#emailSignup");
  let emailSignupError = document.querySelector("#emailSignupError");

  if (emailSignup){
    emailSignup.addEventListener("change", () => {
      validEmailSignup(this);
    });
  }

  let validEmailSignup = (emailSignupFunction) => {
    let RegExpForEmailSignup = new RegExp ("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$", "g");
    if (RegExpForEmailSignup.test(emailSignupFunction.value)){
      emailSignupError.innerHTML = "Adresse email valide";
      emailSignupError.style.color = "lime";
      emailSignupError.classlist.remove("text-danger");
      emailSignupError.classlist.add("text-sucess");
      return true;
    }else{
      emailSignupError.innerHTML = "Adresse email invalide, veuillez respecter le format exemple@email.fr";
      emailSignupError.style.color = "red";
      emailSignupError.classlist.remove("text-sucess");
      emailSignupError.classlist.add("text-danger");
      return false;
    }
  };

  let passwordSignup = document.querySelector("#passwordSignup");
  let passwordSignupError = document.querySelector("#passwordSignupError");

  if (passwordSignup){
    passwordSignup.addEventListener("change", () => {
      validPasswordSignup(this);
    });
  }
  
  let validPasswordSignup = (passwordSignupFunction) => {
    let RegExpForPasswordSignup = new RegExp ("^ (?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|]).{8,32}$");
    if (RegExpForPasswordSignup.test(passwordSignupFunction.value)){
      passwordSignupError.innerHTML = "Mot de passe sécurisé valide";
      passwordSignupError.style.color = "lime";
      passwordSignupError.classlist.remove("text-danger");
      passwordSignupError.classlist.add("text-sucess");
      return true;
    }else{
      passwordSignupError.innerHTML = "Le mot de passe doit contenir entre 8 et 32 caractères avec au minimum une majuscule, une minuscule, un chiffre et un caractère spécial";
      passwordSignupError.style.color = "red";
      passwordSignupError.classlist.remove("text-sucess");
      passwordSignupError.classlist.add("text-danger");
      return false;
    }
  };

  /*fetch ("http://localhost:3000/api/users/login")
    .then(function(res){
        if (res.ok){
            return res.json();
        }
    })
    .then(function(table){
      for (let users of table){
        console.log(users);
      }
    })
    .catch(function(err){
      console.log(err);
    }
);*/

  let order = document.querySelector("#order");
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
  });  

</script>

<!--------------------------------CSS-------------------------------->
<style lang="scss">

  //IMPORT ALL
  @import "./utils/variables.scss";
  @import "./utils/mixins.scss";

  body {
    background-image: url("./assets/Fond_group.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    
    //HEADER
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

    //LOGIN
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

    //SIGNUP
    .signup{
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

  }

</style>