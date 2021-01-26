<template>
  <div class="library-detail relative-position">
    <q-inner-loading size="50px" color="primary" :showing="loading"/>
    <q-card v-if="library" flat>
      <q-card-section class="q-mb-sm">
        <library-carousel
          :gallery="library.data.general.gallery"
          :image="library.data.general.image"
        />
      </q-card-section>

      <q-card-section v-html="library.data.general.description"/>

      <q-card-section>
        <dl class="properties">
          <dt>Адрес:</dt>
          <dd>{{ library.data.general.address.fullAddress}}</dd>

          <dt v-if="workingSchedule">Режим работы:</dt>
          <dd v-if="workingSchedule">
            <div
              class="row"
              v-for="(day, index) in workingSchedule"
              :key="index"
            >
              <div class="col">{{ getDayName(index) }}</div>
              <div class="col">{{ day.from }} - {{ day.to }}</div>
            </div>
          </dd>
        </dl>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { getLibrariyDetail } from 'api/requests';
import { useRoute } from 'lib/utils';
import { Library } from 'models/Library';
import { libraryListModule } from 'store/modules/libraryList';
import LibraryCarousel from 'components/Carousel.vue';
import { daysArray } from 'dictionaries/workingSchedule';

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

    const getDayName = (day: number) => daysArray[day];
    const workingSchedule = computed(() => {
      if (library.value) {
        return Object.values(library.value.data.general.workingSchedule);
      }
      return undefined;
    });

    const loadDetail = async () => {
      await libraryListModule.setTitle('Загрузка...');
      loading.value = true;
      const response = await getLibrariyDetail(idNumber);
      loading.value = false;
      library.value = response.data;
      await libraryListModule.setTitle(response.data.data.general.name);
    };

    if (libraryListModule.items.length !== 0) {
      const libraryFromList = libraryListModule.itemById(id);
      if (libraryFromList) {
        library.value = libraryFromList;
        void libraryListModule.setTitle(libraryFromList.data.general.name);
      }
    } else {
      void loadDetail();
    }

    return {
      loading,
      library,
      workingSchedule,
      getDayName,
    };
  },
});
</script>

<style lang="scss" scoped>
.properties {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  max-width: 500px;

  dt {
    font-weight: 400;
    width: 40%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 200px;
  }

  dd {
    width: 60%;
    padding-left: 10px;
    margin-inline-start: 0;
  }
}
</style>
