<template>
  <div class="filters q-pa-md">
    <q-input
      v-model="filters.q"
      label="Поиск"
    />
    <q-select
      v-model="filters._sort"
      label="Сортировка по"
      :options="sortOptions"
      emit-value
      map-options
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  onBeforeMount,
} from '@vue/composition-api';
import { useRoute } from 'lib/utils';
import { SearchParams } from 'models/filters';
import { debounce } from 'quasar';
import { queryParamsModule } from 'store/modules/queryParams';

export default defineComponent({
  name: 'Filters',
  setup() {
    const filters = ref({
      q: null,
      _sort: null,
    } as SearchParams);

    const applyFilters = debounce(() => {
      queryParamsModule.updateParams({ ...filters.value });
    }, 300);

    watch(filters, applyFilters, { deep: true });

    const sortOptions = [
      {
        label: 'Не задана',
        value: null,
      },
      {
        label: 'Дата создания',
        value: 'data.info.createDate',
      },
      {
        label: 'Дата обновления',
        value: 'data.info.updateDate',
      },
      {
        label: 'Название',
        value: 'data.general.name',
      },
      {
        label: 'ID',
        value: 'data.general.id',
      },
    ];

    onBeforeMount(() => {
      const route = useRoute();
      if (route.query.q) {
        filters.value.q = route.query.q as string;
      }
      if (route.query._sort) {
        filters.value._sort = route.query._sort as string;
      }
    });

    return { filters, applyFilters, sortOptions };
  },
});
</script>

<style>

</style>
