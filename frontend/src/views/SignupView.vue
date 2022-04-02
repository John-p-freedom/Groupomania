<!--------------------------------HTML-------------------------------->
<template>
    <!--<section class="signup" v-show="showSignup" id="signup">-->
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

            <input type="email" name="email" id="emailSignup" size="25" placeholder="Ex: exemple@email.fr" maxlength="50" required>
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
</template>

<!--------------------------------JAVASCRIPT-------------------------------->
<script>
  let emailSignup = document.querySelector("#emailSignup");
  let emailSignupError = document.querySelector("#emailSignupError");

  emailSignup.addEventListener("change", () => {
    validEmailSignup(this);
  });

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

  passwordSignup.addEventListener("change", () => {
    validPasswordSignup(this);
  });
  
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
  @import "../utils/variables.scss";
  @import "../utils/mixins.scss";
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
</style>