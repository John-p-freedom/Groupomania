<template>
    <section id="viewsComponents">
        <HeaderView/>
    </section>

    <section class="messages" id="messages">
        <div class="messages__head">
            <p>Message écrit par {{showMessages().allMessages.author}}</p>
        </div>

        <div class="messages__body">
            <p>{{allMessages.message}}</p>
        </div>

        <div class="messages__foot">
            <span class="messages__foot__txt">
                <p>Créer le {{allMessages.create}}</p>
            </span>
            <span class="messages__foot__icons">
                <i class="fa-solid fa-thumbs-up"></i>
                <i class="fa-solid fa-thumbs-down"></i>
                <i class="fa-solid fa-comments"></i>
            </span>
        </div>
    </section>

    <!--<section class="new">
        <div class="new__icon" @click.prevent="NewMessage">
            <i class="fa-solid fa-message"></i>
        </div>
        <div class="new__message" v-if="ShowNewMessage">
            
        </div>
    </section>-->
</template>

<script>
/*function getId(){
  let productUrl = location.href;
  let url = new URL(productUrl);
  let idUrl = url.searchParams.get("id");
  return idUrl;
}*/
import HeaderView from '@/components/header.vue'
export default {
    name: "#viewsComponents",
    components:{
        HeaderView
    },
    data: function (){
        return{
            allMessages :{
                author : "",
                message : "",
                create : ""
            }
        }
    },
    methods:{
        showMessages(){
            fetch (`http://localhost:3000/api/messages/all`)
                .then(function(res){
                    if (res.ok){
                        return res.json();
                    }
                })
                .then(function(user){
                    return allMessages = {
                        author : user.author,
                        message : user.message,
                        create : user.updatedAt
                    };
                })
                .catch(function(err){
                    console.log(err);
                    return;
                })
        }
    }
}
</script>

<style lang="scss">
    @import "../utils/variables.scss";
    @import "../utils/mixins.scss";
    @include body;
</style>