<template>
  <q-page class="q-pa-sm row justify-center q-gutter-md">
    <library-card
      v-for="library in libraries"
      :key="library._id"
      :library="library"
    />

    <pagination/>
  </q-page>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  watch,
} from '@vue/composition-api';
import LibraryCard from 'components/LibraryCard.vue';
import Pagination from 'components/Pagination.vue';
import { queryParamsModule } from 'store/modules/queryParams';
import { libraryListModule } from 'store/modules/libraryList';

export default defineComponent({
  name: 'LibraryList',
  components: {
    LibraryCard,
    Pagination,
  },
  setup() {
    const searchParams = computed(() => queryParamsModule.params);
    const loading = ref(false);

    const libraries = computed(() => libraryListModule.items);
    const getLibraries = async () => {
      loading.value = true;
      await libraryListModule.getItems(searchParams.value);
      loading.value = false;
    };
    void getLibraries();

    watch(searchParams, getLibraries);

    return { loading, getLibraries, libraries };
  },
});
</script>
