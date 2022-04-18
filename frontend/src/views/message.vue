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

        <section id="newMessage" v-if="showNewMessage">
            <NewMessageView/>
        </section>
    </span>
</template>

<script>
import HeaderView from '@/components/header.vue'
import NewMessageView from '@/components/newMessage.vue'
export default {
    name: "#viewsComponents",
    components:{
        HeaderView,
        NewMessageView
    },
    data: function (){
        return {
            msgs: null,
            showNewMessage: false
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
            this.showNewMessage = true;
        }
    },
    mounted(){
        this.showMessages();
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
</style>