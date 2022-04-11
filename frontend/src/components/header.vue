<template>
    <header class="header">

        <div class="header__logo">
            <router-link to="/">
                <img src="../assets/icon-monochrome-white.webp" alt="Logo Groupomania" class="header__logo__img">
            </router-link>  
        </div>

        <div class="header__profil">
            <button class="header__profil__button" @click="showProfilList">
                Profil de email <i class="fa-solid fa-arrow-down"></i>
            </button>
            <div class="header__profil__show" v-show="profilShow">
                <ul>
                    <li>
                        <router-link to="/profil?id=idUrl">
                            <i class="fa-solid fa-gear"></i> Gérer mon profil
                        </router-link>
                    </li>
                    <br>
                    <li>
                        <router-link to="/">
                            <i class="fa-solid fa-arrow-right-to-bracket"></i> Déconnexion
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        name: "HeaderView",
        data: function (){
            return {
                profilShow: false,
                idUrl: ""
            }
        },
        methods: {
            showProfilList(){
                if (this.profilShow){
                    this.profilShow = false;
                } else {
                    this.profilShow = true;
                }
            },
            getId(){
                let productUrl = location.href;
                let url = new URL(productUrl);
                let idUrl = url.searchParams.get("id");
                return idUrl;
            }
        }
    }
</script>

<style lang="scss">
    @import "../utils/variables.scss";
    .header {
        width: 100%;
        padding: 1% 0;
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
                font: 20px bold;
                border-radius: 50px;
                padding: 0 10px;
                cursor: pointer;
                background-color: map-get($color, txt_orange);
            }
            &__show {
            position: absolute;
            background-color: map-get($color, txt_orange);
            margin-top: 30px;
            height: 100px;
                ul {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    li {
                        list-style-type: none;
                        font: 20px bold;
                        cursor: pointer;
                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }
            }
        }
    }
</style>