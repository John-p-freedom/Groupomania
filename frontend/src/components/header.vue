<template>
    <header class="header">
        <div class="header__logo">
            <router-link to="/message">
                <img src="../assets/icon-monochrome-white.webp" alt="Logo Groupomania" class="header__logo__img">
            </router-link>  
        </div>

        <div class="header__profil" v-for="user in users" :key="user">
            <button class="header__profil__button" @click="showProfilList">
                Profil de {{user.pseudo}} <i class="fa-solid fa-arrow-down"></i>
            </button>
            <div class="header__profil__show" v-show="profilShow">
                <div class="header__profil__show__icons">
                    <i class="fa-solid fa-gear header__profil__show__icons__params"></i>
                    <i class="fa-solid fa-arrow-right-to-bracket header__profil__show__icons_params"></i>
                </div>
                <div class="header__profil__show__router">
                    <router-link to="/profil" class="header__profil__show__router__link">Gérer votre profil</router-link>
                    <router-link to="/" class="header__profil__show__router__link" @click="deleteStorage()">Déconnexion</router-link>
                </div>
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
                users:""
            }
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
                .then(function(user){
                    self.users = user;
                })
                .catch(function(err){
                    console.error(err);
                })
            },
            deleteStorage(){
                sessionStorage.removeItem("user");
            },
            showProfilList(){
                if (this.profilShow){
                    this.profilShow = false;
                } else {
                    this.profilShow = true;
                }
            }
        },
        mounted(){
            this.getStorage();
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
            width: 15%;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            font-size: 20px;
                &__icons {
                    display: flex;
                    flex-direction: column;
                    color: map-get($color, txt_blue);
                    margin: 15px 0;
                    &__params {
                        margin: 10px 0;
                    }
                }
                &__router {
                    display: flex;
                    flex-direction: column;
                    margin: 18px 0;
                    &__link {
                        text-decoration: none;
                        color: black;
                        margin: 5px;
                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }
            }
        }
    }
</style>