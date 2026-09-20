<template>
  <div class="game-action-container">
    <button
      v-if="!collected"
      class="bg-black text-primary border-2 border-sage px-6 py-3 rounded-lg hover:bg-sage hover:text-black transition-colors duration-200 font-bold text-lg"
      style="text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);"
      @click="performAction"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { addEvidence } from '../utils/secretAgentHelpers.js';
import evidenceData from '../data/secretAgentEvidence.json';

export default {
  name: 'EvidenceAction',
  props: {
    id: {
      type: String,
      default: ''
    },
    actionType: {
      type: String,
      default: 'item', // 'item' logs a piece of evidence, 'text' is a text-only action (e.g. rejecting a counterfeit)
      validator: (value) => ['item', 'text'].includes(value)
    },
    label: {
      type: String,
      default: ''
    },
    resultText: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const collected = ref(false);

    const item = computed(() => {
      if (props.actionType === 'item') {
        return evidenceData.find(item => item.id == parseInt(props.id));
      }
      return null;
    });

    const buttonText = computed(() => {
      if (props.actionType === 'item' && item.value) {
        return props.label || `${item.value.instructions} ${item.value.name}`;
      }
      return props.label || 'Investigate';
    });

    const performAction = () => {
      if (props.actionType === 'item' && item.value) {
        addEvidence(props.id);

        const result = props.resultText || item.value.result;
        if (typeof window !== 'undefined' && window.showNotificationPanel) {
          window.showNotificationPanel(result, 4000);
        }
      } else if (props.actionType === 'text') {
        if (typeof window !== 'undefined' && window.showNotificationPanel) {
          window.showNotificationPanel(props.resultText || 'Noted.', 4000);
        }
      }

      collected.value = true;
    };

    return {
      collected,
      buttonText,
      performAction
    };
  }
};
</script>
