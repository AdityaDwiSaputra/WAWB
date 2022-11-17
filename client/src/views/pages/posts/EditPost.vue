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
            <v-col sm="10" class="mx-auto">
                <v-card class="pa-5">
                    <v-card-title>Edit Info Kesehatan</v-card-title>
                    <v-divider></v-divider>
                    <form class="pa-5" enctype="multipart/form-data">
                        <v-text-field v-model="post.title" label="Title" variant="outlined" prepend-icon="mdi-note" :rules="rules"></v-text-field>
                        <v-text-field v-model="post.category" label="Category" variant="outlined" prepend-icon="mdi-view-list" :rules="rules"></v-text-field>
                        <v-textarea v-model="post.content" label="Content" variant="outlined" prepend-icon="mdi-note-plus" :rules="rules"></v-textarea>
                        <v-file-input @change="selectedFile" variant="outlined" show-size counter multiple label="Select Image"></v-file-input>
                        <v-img width="150" :src="`/${post.image}`"></v-img>
                        <v-btn @click="updateForm" class="mt-3" color="success">Update Info Kesehatan</v-btn>
                    </form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            rules: [(value) => !!value || "This field is required"],
            post: {
                title: "",
                category: "",
                content: "",
                image: ""
            },
            image: ""
        };
    },
    methods: {
        selectedFile(file){
            this.image = file.target.files[0];
        },
        async updateForm(){
            const formData = new FormData();
            formData.append('image', this.image);
            formData.append('title', this.post.title);
            formData.append('category', this.post.category);
            formData.append('content', this.post.content);
            formData.append('old_image', this.post.image);
            await axios
                .patch('/api/v1/posts/' + this.$route.params.id, formData)
                .then(res => {
                    const response = res.data;
                    console.log(response);
                    this.$router.push({name: "Post", params: { message: response.message }})
                });
        },
        async getPostDetail() {
            await axios
                .get('/api/v1/posts/' + this.$route.params.id)
                .then(res => {
                    this.post = res.data;
                    // console.log(this.post);
                })
        }
    },
    async created(){
        await this.getPostDetail();
    }
}
</script>