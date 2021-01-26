<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="arrow_back"
          aria-label="back"
          @click="$router.back()"
        />
        <q-toolbar-title>
          {{ title }}
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">

import { computed, defineComponent } from '@vue/composition-api';
import { libraryListModule } from 'store/modules/libraryList';

export default defineComponent({
  name: 'DetailLayout',
  setup() {
    const title = computed(() => libraryListModule.title);

    return { title };
  },
});
</script>
