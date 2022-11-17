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
                    <v-card-title>Add New Info Kesehatan</v-card-title>
                    <v-divider></v-divider>
                    <form class="pa-5" enctype="multipart/form-data">
                        <v-text-field v-model="post.title" label="Title" variant="outlined" prepend-icon="mdi-note" :rules="rules"></v-text-field>
                        <v-text-field v-model="post.category" label="Category" variant="outlined" prepend-icon="mdi-view-list" :rules="rules"></v-text-field>
                        <v-textarea v-model="post.content" label="Content" variant="outlined" prepend-icon="mdi-note-plus" :rules="rules"></v-textarea>
                        <v-file-input @change="selectedFile" variant="outlined" :rules="rules" show-size counter multiple label="Select Image"></v-file-input>
                        <v-btn @click="submitForm" class="mt-3" color="primary">Tambah Info Kesehatan</v-btn>
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
        async submitForm(){
            const formData = new FormData();
            formData.append('image', this.image);
            formData.append('title', this.post.title);
            formData.append('category', this.post.category);
            formData.append('content', this.post.content);
            await axios
                .post('/api/v1/posts/', formData)
                .then(res => {
                    const response = res.data;
                    console.log(response);
                    this.$router.push({name: "Post", params: { message: response.message }})
                });
        }
    }
}
</script>