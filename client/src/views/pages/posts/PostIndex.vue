<template>
    <v-container>
        <v-row no-gutters>
            <v-alert class="my-4"
            border="start"
            closable
            close-label="Close Alert"
            theme="dark"
            type="success"
            v-if="this.$route.params.message"
            >
                {{ this.$route.params.message }}
            </v-alert>
        </v-row>
        <v-row no-gutters justify="space-between">
            <v-col cols="4" class="pa-3 mr-5">
                <h2>Informasi Kesehatan</h2>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="4" class="d-flex justify-end">
                <v-btn v-if="LoginedUser.role != 'Mahasiswa'" :to="{ name: 'AddPost' }" rounded="lg" color="primary" prepend-icon="mdi-note-plus-outline">
                    Tambah Info Kesehatan
                </v-btn>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col sm="4" class="pa-3" v-for="post in posts" :key="post._id">
                <v-card class="pa-1" elevation="4">
                    <v-img height="150" :src="`/${post.image}`"></v-img>
                    <v-btn class="ml-4 mt-3" size="small" variant="outlined" color="indigo">
                        {{post.category}}
                    </v-btn>
                    <v-card-title class="headline">
                        {{post.title}}
                    </v-card-title>
                    <v-card-text class="py-0">
                        <p> {{post.content.substring(0, 100) + "..."}} </p>
                    </v-card-text>
                    <v-card-actions>
                        <v-hover v-slot="{ isHovering, props }">
                            <v-btn
                                size="small"
                                :variant="isHovering ? 'elevated' : 'outlined'"
                                color="info"
                                v-bind="props"
                                :to="{ name: 'PostDetail', params: { id: post._id } }"
                            >
                                Read More
                            </v-btn>
                        </v-hover>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    name: "PostIndex",
    data() {
        return {
            posts: [],
            LoginedUser: JSON.parse(window.localStorage.getItem('user'))
        }
    },
    methods: {
        async fetchPost(){
            await axios
                .get('/api/v1/posts/')
                .then(res => {
                    this.posts = res.data;
                });
        },
    },    
    async created(){
        this.fetchPost();
    },
}
</script>