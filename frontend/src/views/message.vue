<template>
    <header class="header">

        <div class="header__logo">
            <a href="./#">
                <img src="../assets/icon-monochrome-black.webp" alt="Logo Groupomania" class="header__logo__img">
            </a>  
        </div>

        <div class="header__profil">
            <button class="header__profil__button" @click="showProfilList">
                Votre profil <font-awesome-icon icon="fa-solid fa-arrow-down" />
            </button>
            <div class="header__profil__show" v-show="profilShow">
                <ul>
                    <li>Gérer votre profil</li>
                    <li>Déconnexion <font-awesome-icon icon="fa-thin fa-arrow-right-from-bracket" /></li>
                </ul>
            </div>
        </div>
    </header>

    <section class="body">

    </section>
</template>

<script>
    export default {
        name: "MessageView",
        data: function (){
            return {
                profilShow: false
            }
        },
        methods: {
            showProfilList(){
                if (this.profilShow){
                    this.profilShow = false;
                } else {
                    this.profilShow = true;
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "../utils/variables.scss";
    body {
        background-color: rgb(221, 220, 220);
        .header {
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            background-color: map-get($color, fond_blue);
            box-shadow: 4px 4px 4px map-get($color, fond_orange);
            &__logo {
                img {
                    height: 50px;
                }
            }
            &__profil {
                &__button {
                    font: 15px bold;
                    cursor: pointer;
                    background-color: map-get($color, txt_orange);
                }
            }
        }
    }
</style>