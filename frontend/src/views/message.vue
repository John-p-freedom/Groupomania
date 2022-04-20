<!--Reste à faire:
RELOAD PAGE
paramétrer une erreur si non authentifié
Configurer section new pour nouveau message
"bouton" modifier et supprimer à afficher ou non en fonction de admin et user
paramétrer like, dislike et commentaires-->
<template>
    <span id="viewsComponents">
        <section id="header">
            <HeaderView/>
        </section>

        <section id="wall" v-for="msg in msgs" :key="msg">
            <div class="messages">
                <div class="messages__head">
                    <p>Message écrit par <strong>{{msg.author}}</strong> :</p>
                </div>

                <div class="messages__body">
                    <p>{{msg.message}}</p>
                </div>

                <div class="messages__foot">
                    <span class="messages__foot__txt">
                        <p>Modifier</p>
                        <p>Supprimer</p>
                    </span>
                    <span class="messages__foot__icons">
                        <i class="fa-solid fa-thumbs-up fa-xl" title="J'aime"></i>
                        <i class="fa-solid fa-thumbs-down fa-xl" title="Je n'aime pas"></i>
                        <i class="fa-solid fa-comments fa-xl" title="Écrire un commentaire"></i>
                    </span>
                </div>
            </div>
        </section>

        <div class="newMessageIcon" @click.prevent="newMessage">
            <i i class="fa-solid fa-message fa-3x" title="Écrire un nouveau message"></i>
        </div>

        <section id="new" v-if="showNewMessage">
            <div class="newMessage">
                <div class="newMessage__head">
                    <p>Message écrit par <strong>{{user.pseudo}}</strong> :</p>
                </div>

                <div class="message__body">
                    <textarea 
                        type="text" 
                        size="50" 
                        v-model="newMessageText" 
                        pattern="^[a-z A-Z 0-9 à-ÿ ()',?;.:=!%¨^$*+-/#@°]$" 
                        rows="5" 
                        cols="50" 
                        autofocus>
                    </textarea>
                </div>

                <div class="message__line"></div>

                <div class="message__foot">
                    <button @click.prevent="newMessage">Annuler</button>
                    <button @click.prevent="submitNewMessage">Envoyer</button>
                </div>
            </div>
        </section>
    </span>
</template>

<script>
import HeaderView from '@/components/header.vue'
export default {
    name: "#viewsComponents",
    components:{
        HeaderView
    },
    data: function (){
        return {
            msgs: null,
            showNewMessage: false,
            user:"",
            newMessageText: "",
        };
    },
    methods:{
        showMessages(){
            const self = this;
            fetch (`http://localhost:3000/api/messages/all`)
                .then(function(res){
                    if (res.ok){
                        return res.json();
                    }
                })
                .then(function(messages){
                    self.msgs = messages;
                })
                .catch(function(err){
                    console.error(err);
                })
        },
        newMessage(){
            if (!this.showNewMessage){
                this.showNewMessage = true;
            } else {
                this.showNewMessage = false;
            }
        },
        getStorage(){
        const token = JSON.parse(sessionStorage.getItem("user"));
        const self = this;
        fetch (`http://localhost:3000/api/users/profile`, { headers: new Headers({'Authorization': 'Bearer '+token})}) 
            .then(function(res){
                if (res.ok){
                    return res.json();
                }
            })
            .then(function(user){
                console.log(user);
                self.user = user;
            })
            .catch(function(err){
                console.error(err);
            })
        },
    },
    mounted(){
        this.showMessages();
        this.getStorage();
    }
}
</script>

<style lang="scss">
    @import "../utils/variables.scss";
    @import "../utils/mixins.scss";
    @include body;

    #wall{
        display: flex;
        justify-content: center;
        margin-top: 60px;
        font-size: 16px;
        .messages{
            border: 3px solid map-get($color, fond_orange);
            background-color: white;
            width: 50%;
            &__head{
                text-align: left;
                strong{
                    font-weight: bold;
                }
            }
            &__line{
                background-color: map-get($color, fond_blue);
                height: 2px;
            }
            &__foot{
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 35px;
                &__txt{
                    display: flex;
                    p{
                        margin-right: 20px;
                        cursor: pointer;
                        &:hover{
                            text-decoration: underline;
                        }
                    }
                }
                &__icons{
                    .fa-thumbs-up{
                        color: green;
                        cursor: pointer;
                    }
                    .fa-thumbs-down{
                        color: red;
                        margin-left: 15px;
                        cursor: pointer;
                    }
                    .fa-comments{
                        color: blue;
                        margin-left: 15px;
                        cursor: pointer;
                    }
                }
            }
        }
    }
    .newMessageIcon{
        position: fixed;
        right: 0;
        width: 12em;
        top: 95%;
        margin-top: -2.5em;
        .fa-message{
            color: map-get($color,fond_blue);
            cursor: pointer;
        }
    }
     #new{
        display: flex;
        justify-content: center;
        margin-top: 60px;
        font-size: 16px;
        .message{
            border: 3px solid map-get($color, fond_orange);
            background-color: white;
            width: 50%;
            &__head{
                text-align: left;
                strong{
                    font-weight: bold;
                }
            }
            &__foot{
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 35px;
            }
        }
    }
</style>