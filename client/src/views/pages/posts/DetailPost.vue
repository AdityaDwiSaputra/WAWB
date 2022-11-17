<template>
    <v-container>
        <v-row no-gutters justify="space-between">
            <v-col cols="4" class="pa-3 mr-5">
                <h2>Informasi Kesehatan</h2>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="4" class="d-flex justify-end">
                <v-btn :to="{ name: 'Post' }" rounded="lg" color="info" variant="outlined" prepend-icon="mdi-keyboard-backspace">
                    Kembali
                </v-btn>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col sm="10" class="pa-4 mx-auto">
                <v-card class="pa-1" elevation="4">
                    <v-img :src="`/${post.image}`"></v-img>
                    <v-card-actions class="pb-0">
                        <v-row class="mt-1 mx-1">
                            <v-col sm=2>
                                <v-btn class="ml-4 mt-3" variant="outlined" color="indigo">
                                    {{post.category}}
                                </v-btn>
                            </v-col>
                            <v-col sm="10" class="d-flex justify-end">
                                <v-hover v-slot="{ isHovering, props }">
                                    <v-btn
                                        size="small"
                                        :variant="isHovering ? 'elevated' : 'outlined'"
                                        color="warning"
                                        v-bind="props"
                                        v-if="LoginedUser.role != 'Mahasiswa'"
                                        :to="{ name: 'EditPost', params: { id: this.$route.params.id } }"
                                    >
                                        Edit
                                    </v-btn>
                                </v-hover>            
                                <v-hover v-slot="{ isHovering, props }">
                                    <v-btn
                                        size="small"
                                        :variant="isHovering ? 'elevated' : 'outlined'"
                                        color="error"
                                        v-bind="props"
                                        v-if="LoginedUser.role != 'Mahasiswa'"
                                        @click="deletePost()"
                                    >
                                        Delete
                                    </v-btn>
                                </v-hover>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                    <v-card-subtitle class="headline mt-4 py-2">
                        <h1> {{post.title}} </h1>
                    </v-card-subtitle>
                    <v-card-text class="grey--text">
                        <p class="py-2 mb-4"> {{post.created}} </p>
                        <p> {{post.content}} </p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    name: 'DetailPost',
    data() {
        return{
            post: [],
            LoginedUser: JSON.parse(window.localStorage.getItem('user'))
        }
    },
    methods: {
        async getPostDetail() {
            await axios
                .get('/api/v1/posts/' + this.$route.params.id)
                .then(res => {
                    this.post = res.data;
                    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                    this.post.created = new Date(this.post.created).toLocaleDateString("id", options);
                })
        },
        async deletePost(){
            await axios
                .delete('/api/v1/posts/' + this.$route.params.id)
                .then(res => {
                    const response = res.data;
                    this.$router.push({name: "Post", params: { message: response.message }})
                });
        }
    },
    async created(){
        this.getPostDetail();
    }
}
</script>