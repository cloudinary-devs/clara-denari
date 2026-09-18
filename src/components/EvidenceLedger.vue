<template>
  <div class="markdown-body">
    <div class="flex justify-between items-center">
      <h2 class="text-responsive-l md:text-responsive-xl font-bold text-blue-400 shadow-lg">
        Evidence Dossier
        <span class="text-gray-400 font-normal text-responsive-sm">
          ({{ evidence.length }} / {{ totalEvidence }})
        </span>
      </h2>
    </div>

    <div id="evidence-container">
      <div v-if="evidence.length === 0" class="text-gray-200 text-start p-3 text-responsive-sm" style="text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);">
        No verified evidence logged yet.
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-1">
        <div
          v-for="item in evidence"
          :key="item.name"
          class="item p-1.5 bg-black bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
        >
          <div class="flex items-center gap-1.5">
            <div v-if="item.imageUrl" class="flex-shrink-0">
              <img
                :src="item.imageUrl"
                :alt="item.name"
                class="w-6 h-6 object-cover rounded"
              />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-gray-200 text-xs font-normal leading-tight" style="text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);">
                <a :href="`/${item.location}`" class="hover:text-blue-400 transition-colors duration-200">
                  <span class="truncate">{{ item.name }}</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getEvidence } from '../utils/secretAgentHelpers.js';
import evidenceData from '../data/secretAgentEvidence.json';

export default {
  name: 'EvidenceLedger',
  setup() {
    const evidence = ref([]);
    const totalEvidence = evidenceData.length;

    const loadEvidence = () => {
      const ids = getEvidence();
      evidence.value = ids.map(id => {
        const itemData = evidenceData.find(item => item.id == parseInt(id));
        return {
          name: itemData ? itemData.name : `Evidence ${id}`,
          imageUrl: itemData ? itemData.imageUrl : null,
          location: itemData ? itemData.location : null
        };
      });
    };

    const handleEvidenceAdded = () => {
      setTimeout(loadEvidence, 200);
    };

    onMounted(() => {
      loadEvidence();
      window.addEventListener('evidence_added', handleEvidenceAdded);
    });

    return {
      evidence,
      totalEvidence,
      loadEvidence
    };
  }
};
</script>
