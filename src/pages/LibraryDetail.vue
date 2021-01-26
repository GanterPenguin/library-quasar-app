<template>
  <div class="library-detail">
    <q-card v-if="library">
      <library-carousel
        :gallery="library.data.general.gallery"
        :image="library.data.general.image"
      />
    </q-card>
    {{ library }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { getLibrariyDetail } from 'api/requests';
import { useRoute } from 'lib/utils';
import { Library } from 'models/Library';
import { libraryListModule } from 'store/modules/libraryList';
import LibraryCarousel from 'components/Carousel.vue';

export default defineComponent({
  name: 'LibraryDetail',
  components: {
    LibraryCarousel,
  },
  setup() {
    const loading = ref(false);
    const route = useRoute();
    const { id } = route.params;
    const idNumber = parseInt(id, 10);
    const library = ref<Library>();

    const loadDetail = async () => {
      await libraryListModule.setTitle('Загрузка...');
      loading.value = true;
      const response = await getLibrariyDetail(idNumber);
      loading.value = false;
      library.value = response.data;
      await libraryListModule.setTitle(response.data.data.general.name);
    };

    if (libraryListModule.items.length !== 0) {
      library.value = libraryListModule.itemById(id);
    } else {
      void loadDetail();
    }

    return { loading, library };
  },
});
</script>

<style>

</style>
