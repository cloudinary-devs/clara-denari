// Evidence-ledger helpers for the "Counterfeit Countdown" story.
// Uses its own localStorage key so it can never collide with the
// original story's `inventory_item` state.
import evidenceData from '../data/secretAgentEvidence.json';

if (typeof window === 'undefined' && !global.localStorage) {
  global.localStorage = {
    setItem() {},
    getItem() {
      const mockResponse = evidenceData.reduce((acc, curr) => {
        return { ...acc, [curr.id]: true };
      }, {});
      return JSON.stringify(mockResponse);
    },
  };
}

export function addEvidence(id) {
  if (typeof window === 'undefined') return;

  const item = evidenceData.find(item => item.id == parseInt(id));
  if (!item) {
    console.error('Evidence item not found for ID:', id);
    return;
  }

  var json = localStorage.getItem('secret_agent_evidence');

  var evidenceItems;
  try {
    evidenceItems = JSON.parse(json || '{}');
  } catch (e) {
    console.error('Error parsing localStorage:', e);
    evidenceItems = {};
  }

  evidenceItems[id] = true;

  localStorage.setItem('secret_agent_evidence', JSON.stringify(evidenceItems));

  window.dispatchEvent(new CustomEvent('evidence_added', { detail: { id: id, name: item.name } }));
}

export function getEvidence() {
  if (typeof window === 'undefined') return [];

  var json = localStorage.getItem('secret_agent_evidence');

  var evidenceItems;
  try {
    evidenceItems = JSON.parse(json || '{}');
  } catch (e) {
    console.error('Error parsing localStorage in getEvidence:', e);
    evidenceItems = {};
  }

  return Object.keys(evidenceItems);
}
