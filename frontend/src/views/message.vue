<template>
    <section id="viewsComponents">
        <HeaderView/>
    </section>

    <section id="wall" v-for="item in items" :key="item">
        <div class="messages">
            <div class="messages__head">
                <p>Message écrit par <strong>{{item.author}}</strong> :</p>
            </div>

            <div class="messages__body">
                <p>{{item.message}}</p>
            </div>

            <div class="messages__line"></div>

            <div class="messages__foot">
                <span class="messages__foot__txt">
                    <p>Modifier</p>
                    <p>Supprimer</p>
                </span>
                <span class="messages__foot__icons">
                    <i class="fa-solid fa-thumbs-up fa-xl"></i>
                    <i class="fa-solid fa-thumbs-down fa-xl"></i>
                    <i class="fa-solid fa-comments fa-xl"></i>
                </span>
            </div>
        </div>
    </section>

    <div class="newMessage" @click.prevent="newMessage">
        <i class="fa-solid fa-message fa-2x"></i>
    </div>

    <section class="new" v-if="showNewMessage">
        
    </section>
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
            items: null,
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
                    self.items = messages;
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
    .newMessage{
        .fa-message{
            color: map-get($color,txt_orange);
            cursor: pointer;
        }
    }
</style>