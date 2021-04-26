<template>
  <v-form @submit.prevent="saveChanges">
    <v-container>
      <v-row>
        <v-col cols="6" offset="1">
          <v-text-field
            label="Title"
            required
            v-model="payload.title"
          ></v-text-field>
          <v-text-field
            type="number"
            label="Price"
            required
            v-model="payload.price"
          ></v-text-field>
          <v-text-field
            type="number"
            label="Stock"
            required
            v-model="payload.stock"
          ></v-text-field>
          <v-select
            label="Category"
            required
            v-model="payload.CategoryId"
            :items="categories"
          ></v-select>
          <v-btn type="submit" color="success" class="mr-4">
            <v-progress-circular
              indeterminate
              color="white"
              v-if="isLoading"
            ></v-progress-circular>
            <span v-else>Save</span>
          </v-btn>
        </v-col>
        <v-col cols="4">
          <v-img
            :src="payload.image_url"
            style="cursor: pointer;"
            class="mt-4"
            aspect-ratio="1"
            max-height="250"
            @click="pickFile"
          ></v-img>
          <input
            type="file"
            style="display: none"
            ref="image"
            accept="image/*"
            @change="onFilePicked"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import imgPlaceholder from '../../public/assets/image/placeholder.jpg'

export default {
  name: 'ProductForm',
  data() {
    return {
      type: this.$route.params?.id ? 'editProduct' : 'addProduct',
      payload: {
        title: '',
        image_url: imgPlaceholder,
        price: '',
        stock: '',
        CategoryId: ''
      },
      latestUrl: '',
      imageFile: '',
      isLoading: false
    }
  },
  methods: {
    dataPreparation() {
      const formData = new FormData()
      Object.keys(this.payload).forEach(el => {
        if (el !== 'image_url') {
          formData.append(el, this.payload[el])
        }
      })

      if (this.type === 'editProduct') {
        formData.append('latestUrl', this.latestUrl)
      }

      if (this.imageFile !== '') {
        formData.append('file', this.imageFile)
      }
      return formData
    },
    saveChanges() {
      this.isLoading = !this.isLoading
      const data = this.dataPreparation()
      const payload = { data }
      if (this.type === 'editProduct') {
        payload.id = this.$route.params.id
      }

      this.$store
        .dispatch(this.type, payload)
        .then(() => {
          return this.$store.dispatch('fetchProducts')
        })
        .then(res => {
          this.$store.commit('fetchProducts', res.data)
          this.$router.push('/products')
        })
        .catch(err => {
          this.$swal({
            text: err.response.data.message,
            icon: 'error',
            timer: 1200,
            showConfirmButton: false
          })
        })
        .finally(() => {
          this.isLoading = !this.isLoading
          Object.keys(this.payload).forEach(el => {
            this.payload[el] = el === 'image_url' ? imgPlaceholder : ''
          })
          this.imageFile = ''
        })
    },
    pickFile() {
      this.$refs.image.click()
    },
    onFilePicked(ev) {
      const files = ev.target.files[0]
      if (files) {
        // check if any file format
        if (files.name.lastIndexOf('.') <= 0) {
          return
        }

        // validate image size
        if (files.size > 5e5) {
          this.$swal({
            text: 'Image size should be less than 500 kB!',
            icon: 'error',
            timer: 1200,
            showConfirmButton: false
          })
          return
        }

        const fr = new FileReader()
        fr.readAsDataURL(files)
        fr.addEventListener('load', () => {
          this.imageFile = files
          this.payload.image_url = fr.result
        })
      } else {
        this.imageFile = ''
      }
    }
  },
  computed: {
    categories() {
      return this.$store.getters.categories
    },
    products() {
      return this.$store.state.products
    },
    selectedProduct() {
      return this.$store.getters.selectedProduct
    }
  },
  created() {
    if (this.$route.params?.id) {
      this.payload = this.selectedProduct
      this.latestUrl = this.payload.image_url
    }
  }
}
</script>
