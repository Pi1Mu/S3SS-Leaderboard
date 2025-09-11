<template>
  <v-row>
    <v-col>
      <h1 class="th-1 mb-4">Seeds Leaderboard</h1>
    </v-col>
  </v-row>

  <!-- Filters -->
  <v-card class="mb-4">
    <v-card-title>Filters</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <v-select v-model="selectedVersions" :items="versionOptions" label="Version" multiple clearable chips
            variant="outlined" @update:model-value="loadSeeds" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="nameFilter" label="Search by name" variant="outlined" clearable
            @update:model-value="debouncedSearch" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>

  <!-- Seeds Table -->
  <v-card>
    <v-data-table :headers="headers" :items="seeds" :loading="loading" item-key="id" @click:row="onSeedClick" hover
      class="clickable-rows">
      <template v-slot:item.seed="{ item }">
        <v-chip variant="outlined" size="small">
          {{ item.seed }}
        </v-chip>
      </template>

      <template v-slot:item.version="{ item }">
        <v-chip color="primary" size="small">
          {{ item.version }}
        </v-chip>
      </template>

      <template v-slot:no-data>
        <div class="text-center pa-4">
          <v-icon size="48" color="grey">mdi-seed</v-icon>
          <p class="mt-2">No seeds found</p>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts" setup>
import { VERSION_OPTIONS } from '#shared/constants/versions'

interface Seed {
  id: number
  seed: string
  name: string
  version: string
  status: number
}

const loading = ref(false)
const seeds = ref<Seed[]>([])
const selectedVersions = ref<string[]>([])
const nameFilter = ref('')

const versionOptions = VERSION_OPTIONS

const headers = [
  {
    title: 'Version',
    key: 'version',
    align: 'start' as const
  },
  {
    title: 'Name',
    key: 'name',
    align: 'start' as const
  },
]

const loadSeeds = async () => {
  loading.value = true

  try {
    const params = new URLSearchParams()

    if (selectedVersions.value.length > 0) {
      selectedVersions.value.forEach(version => {
        params.append('version', version)
      })
    }

    if (nameFilter.value) {
      params.set('name', nameFilter.value)
    }

    params.set('orderBy', 'name')

    const data = await $fetch<Seed[]>(`/api/db/seeds/seeds?${params.toString()}`)
    seeds.value = data || []
  } catch (error) {
    console.error('Error loading seeds:', error)
    seeds.value = []
  } finally {
    loading.value = false
  }
}

let searchTimeout: NodeJS.Timeout | null = null
const debouncedSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  searchTimeout = setTimeout(() => {
    loadSeeds()
  }, 300)
}

const onSeedClick = (event: Event, { item }: { item: Seed }) => {
  // 将来の実装: 記録ランキングページに遷移
  console.log('Clicked seed:', item)
  // navigateTo(`/seeds/${item.id}/rankings`)
}

// Initial load
onMounted(() => {
  loadSeeds()
})
</script>

<style scoped>
.clickable-rows :deep(tbody tr) {
  cursor: pointer;
}

.clickable-rows :deep(tbody tr:hover) {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>