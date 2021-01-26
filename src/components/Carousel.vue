<template>
  <div class="library-carousel">
    <q-carousel
      v-if="gallery"
      v-model="slide"
      transition-prev="scale"
      transition-next="scale"
      swipeable
      animated
      control-color="primary"
      navigation
      padding
      arrows
      height="500px"
      class="shadow-1 rounded-borders"
    >
      <q-carousel-slide
        v-for="(image, index) in gallery"
        :name="index"
        :key="index"
        class="column no-wrap flex-center"
      >
        <q-img
          :src="image.url"
          basic
        />
      </q-carousel-slide>

    </q-carousel>
    <q-img
      v-else-if="image"
      :src="image.url"
      height="500px"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
} from '@vue/composition-api';
import { Image } from 'models/Library';

export default defineComponent({
  name: 'LibraryCarousel',
  props: {
    gallery: {
      type: Array as PropType<Image[]>,
    },
    image: {
      type: Object as PropType<Image>,
    },
  },
  setup() {
    const slide = ref(0);
    return {
      slide,
    };
  },
});
</script>

<style>

</style>
