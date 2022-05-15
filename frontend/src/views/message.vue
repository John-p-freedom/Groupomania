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
                        <p v-if="user.admin || user.id == msg.userId">Modifier</p>
                        <p v-if="user.admin || user.id == msg.userId" @click.prevent="deleteMessage(msg.id)">Supprimer</p>
                    </span>
                    <span class="messages__foot__icons">
                        <i class="fa-solid fa-thumbs-up fa-xl" title="J'aime"></i>
                        <p v-if="nbrLikes >= 1">({{nbrLikes}})</p>
                        <i class="fa-solid fa-thumbs-down fa-xl" title="Je n'aime pas"></i>
                        <p v-if="nbrDislikes >= 1">({{nbrDislikes}})</p>
                        <i class="fa-solid fa-comments fa-xl" title="Écrire un commentaire" @click.prevent="viewComment(msg.id)"></i>
                        <span v-for="com in coms" :key="com">
                            <p v-if="msg.id == com.messageId">({{coms.length}})</p>
                        </span>
                    </span>
                </div>
            </div>

            <div class="comments" v-if="showComment && showCommentMessageId == msg.id">
                <div class="comments__view" v-for="com in coms" :key="com">
                    <div class="comments__view__head">
                        <p>Commentaire écrit par <strong>{{com.author}}</strong> :</p>
                    </div>

                    <div class="comments__view__body">
                        <p>{{com.comment}}</p>
                    </div>

                    <div class="comments__view__foot" v-for="user in users" :key="user">
                        <p v-if="user.admin || user.id == com.userId">Modifier</p>
                        <p v-if="user.admin || user.id == com.userId">Supprimer</p>
                    </div>
                </div>

                <div class="comments__new">
                    <form method="post" class="comments__new__form">
                        <label for="newComment"><strong>{{userPseudo}} : </strong></label>
                        <input type="text" name="newComment" v-model="newCommentModel" size="55" autofocus required/>
                        <input type="submit" value="Soumettre" @click.prevent="submitNewComment(msg.id)" class="comments__new__form__submit"/>
                    </form>
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
            showComment: "",
            coms: null,
            showNewMessage: false,
            users:"",
            userPseudo: "",
            userId: "",
            newMessageModel: "",
            newCommentModel: "",
            showCommentMessageId: null,
        };
    },
    methods:{
        showMessages(){
            const token = JSON.parse(sessionStorage.getItem("user"));
            const self = this;
            fetch (`http://localhost:3000/api/messages/all`, { headers: new Headers({'Authorization': 'Bearer '+token})})
                .then(function(res){
                    if (res.ok){
                        return res.json();
                    }
                })
                .then(function(messages){
                    self.msgs = messages.message;
                })
                .catch(function(err){
                    console.error(err);
                })
        },
        showComments(){
            const self = this;
            fetch (`http://localhost:3000/api/comments/all`)
                .then(function(res){
                    if (res.ok){
                        return res.json();
                    }
                })
                .then(function(comments){
                    self.coms = comments.comment;
                })
                .catch(function(err){
                    console.error(err);
                })
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
            .then(function(userValues){
                self.users = userValues;
                self.userPseudo = userValues.user.pseudo;
                self.userId = userValues.user.id;
            })
            .catch(function(err){
                console.error(err);
            })
        },
        deleteMessage(messageId){
            const token = JSON.parse(sessionStorage.getItem("user"));
            fetch (`http://localhost:3000/api/messages/${messageId}`, {method: "delete", headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}})
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
        newMessage(){
            if (!this.showNewMessage){
                this.showNewMessage = true;
            } else {
                this.showNewMessage = false;
            }
        },
        viewComment(messageId){
            if (!this.showComment){
                this.showCommentMessageId = messageId;
                this.showComment = true;
            } else {
                this.showCommentMessageId = null;
                this.showComment = false;
            }
        },
        submitNewMessage(){
            let message = {
                author : this.userPseudo,
                message : this.newMessageModel,
                userId : this.userId
            }
            const token = JSON.parse(sessionStorage.getItem("user"));
            fetch (`http://localhost:3000/api/messages/new`, {method: "post", headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}, body: JSON.stringify(message)})
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
        submitNewComment(messageId){
            let comment = {
                author : this.userPseudo,
                comment : this.newCommentModel,
                userId : this.userId,
                messageId
            }
            const token = JSON.parse(sessionStorage.getItem("user"));
            fetch (`http://localhost:3000/api/comments/new`, {method: "post", headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}, body: JSON.stringify(comment)})
                .then(function(res){
                    if (res.ok){
                        return res.json();
                    }
                })
                .then(function(){
                    //location.reload();
                })
                .catch(function(err){
                    console.log(err);
                });
        },
    },
    mounted(){
        this.showMessages();
        this.showComments();
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

    #wall{
        display: flex;
        flex-direction: column;
        align-items: center;
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
                    display: flex;
                    align-items: center;
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
        .comments{
            &__view{
                border: 3px solid map-get($color, fond_blue);
                background-color: white;
                &__head{
                    text-align: left;
                    strong{
                        font-weight: bold;
                    }
                }
                &__foot{
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    p {
                        cursor: pointer;
                        &:hover{
                            text-decoration: underline;
                        }
                    }
                }
            }
            &__new{
                &__form{
                    &__submit{
                        background-color: map-get($color, txt_blue);
                        border-radius: 50px;
                        color: white;
                        font-weight: bold;
                        margin-left: 12px;
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