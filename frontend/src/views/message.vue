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

                <div class="messages__line"></div>

                <div class="messages__foot">
                    <span class="messages__foot__txt" v-for="user in users" :key="user">
                        <p v-if="user.admin || user.id == msg.userID">Modifier</p>
                        <p v-if="user.admin || user.id == msg.userID">Supprimer</p>
                    </span>
                    <span class="messages__foot__icons">
                        <i class="fa-solid fa-thumbs-up fa-xl" title="J'aime"></i><p v-if="nbrLikes >= 1">({{nbrLikes}})</p>
                        <i class="fa-solid fa-thumbs-down fa-xl" title="Je n'aime pas"></i><p v-if="nbrDislikes >= 1">({{nbrDislikes}})</p>
                        <i class="fa-solid fa-comments fa-xl" title="Écrire un commentaire"></i><p v-if="nbrComments >= 1">({{nbrComments}})</p>
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
                    <p>Nouveau message :</p>
                </div>

                <div class="message__body">
                    <textarea 
                        type="text" 
                        size="50" 
                        v-model="newMessageModel" 
                        pattern="^[a-z A-Z 0-9 à-ÿ ()',?;.:=!%¨^$*+-/#@°]$" 
                        rows="7" 
                        cols="93" 
                        autofocus>
                    </textarea>
                </div>

                <div class="message__foot">
                    <button class="message__foot__button" @click.prevent="newMessage">Annuler</button>
                    <button class="message__foot__button" @click.prevent="submitNewMessage()">Envoyer</button>
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
            nbrLikes: "",
            nbrDislikes: "",
            nbrComments: "",
            showNewMessage: false,
            users:"",
            newMessageModel: "",
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
        submitNewMessage(){
            let message = {
                author : this.user.pseudo,
                message : this.newMessageModel
            }
            fetch (`http://localhost:3000/api/messages/new`, {method: "post", headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify(message)})
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
                });
        },
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
                        transform: scale(1);
                        transition-property: transform;
                        transition-duration: 400ms;
                        &:hover{
                            transform: scale(1.25);
                        }
                    }
                    .fa-thumbs-down{
                        color: red;
                        margin-left: 15px;
                        cursor: pointer;
                        transform: scale(1);
                        transition-property: transform;
                        transition-duration: 400ms;
                        &:hover{
                            transform: scale(1.25);
                        }
                    }
                    .fa-comments{
                        color: blue;
                        margin-left: 15px;
                        cursor: pointer;
                        transform: scale(1);
                        transition-property: transform;
                        transition-duration: 400ms;
                        &:hover{
                            transform: scale(1.25);
                        }
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
                margin: 10px 0;
                &__button{
                    background-color: map-get($color, txt_blue);
                    border-radius: 50px;
                    color: white;
                    font-weight: bold;
                    padding: 5px 15px;
                    cursor: pointer;
                    transform: scale(1);
                    transition-property: transform;
                    transition-duration: 400ms;
                    &:hover {
                        transform: scale(1.25);
                    }
                }
            }
        }
    }
</style>