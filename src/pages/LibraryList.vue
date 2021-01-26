<template>
  <q-page class="q-pa-sm row justify-center relative-position">
    <div class="row q-gutter-md">
      <library-card
        v-for="library in libraries"
        :key="library._id"
        :library="library"
      />
    </div>

    <div class="row">
      <pagination/>
    </div>

    <q-inner-loading :showing="loading">
      <div class="absolute-top window-height full-width">
        <q-spinner size="50px" color="primary" class="absolute-center"/>
      </div>
    </q-inner-loading>
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
import { SearchParams } from 'models/filters';

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
  created() {
    if (this.$route.query) {
      queryParamsModule.initParams(this.$route.query as SearchParams);
    }
  },
});
</script>
