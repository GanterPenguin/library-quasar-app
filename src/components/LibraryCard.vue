<template>
  <q-card bordered class="library-card">
    <router-link :to="getDetailLink(library.nativeId)">
    <q-img
      :src="library.data.general.image ? library.data.general.image.url : '/no-img-placeholder.png'"
      :ratio="4/3"
      basic
    >
      <div class="absolute-bottom text-subtitle2 text-center">
        {{ library.data.general.name }}
      </div>
    </q-img>

    <div class="library-card__description">
      <q-card-section>
        <div
          class="text-subtitle2"
          v-if="library.data.general.address && library.data.general.address.fullAddress"
        >
          {{ library.data.general.address.fullAddress }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ description }}
      </q-card-section>
    </div>
    </router-link>
    <q-separator inset v-if="hasWebsite" />

    <q-card-actions v-if="hasWebsite">
      <q-btn
        flat
        type="a"
        :href="library.data.general.contacts.website"
        target="_blank"
        label="Сайт"
        color="primary"
      />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api';
import { Library } from 'models/Library';

export default defineComponent({
  name: 'LibraryCard',
  props: {
    library: {
      type: Object as PropType<Library>,
      required: true,
    },
  },
  setup(props) {
    const hasWebsite = computed(() => props.library.data.general.contacts
      && props.library.data.general.contacts.website);

    const description = computed(() => {
      const regex = /<\/?[^>]+(>|$)/g;
      const cleanString = props.library.data.general.description.replace(regex, '');
      return `${cleanString.slice(0, 100)}...`;
    });

    const getDetailLink = (id: number) => `/library/${id}`;

    return { hasWebsite, description, getDetailLink };
  },
});
</script>

<style lang="scss" scoped>
.library-card {
  &__description {
    max-height: 140px;
    height: 100%;
    overflow: auto;
  }

  @media screen and (min-width: $breakpoint-xs-max) {
    max-width: 45%;
    width: 100%;
  }

  @media screen and (min-width: $breakpoint-md-max) {
    max-width: 18%;
    width: 100%;
  }
}
</style>
