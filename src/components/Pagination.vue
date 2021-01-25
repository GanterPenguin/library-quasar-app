<template>
  <div class="q-pa-lg flex flex-center">
    <q-pagination
      v-if="page && maxPages"
      v-model="page"
      input
      :max="maxPages"
      :max-pages="5"
      :direction-links="true"
    >
    </q-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import { libraryListModule } from 'store/modules/libraryList';
import { queryParamsModule } from 'store/modules/queryParams';

export default defineComponent({
  name: 'Pagination',
  setup() {
    const page = computed({
      get() {
        if (queryParamsModule.params._page) {
          return queryParamsModule.params._page as number;
        }
        return 1;
      },
      set(value: number) {
        queryParamsModule.updateParams({ _page: value });
      },
    });

    const maxPages = computed(() => libraryListModule.totalPages);

    return { page, maxPages };
  },
});
</script>
