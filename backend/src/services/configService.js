const { hasValidSupabaseConfig, supabaseFetch } = require('../utils/supabaseClient');
const { siteConfig } = require('../models/inMemoryStore');
const config = require('../config/env');

const selectClause = 'id,heroTitle,heroSubtitle,about,contactEmail,whatsappNumber,githubUrl,linkedinUrl,resumeUrl';

const getConfig = async () => {
  if (!hasValidSupabaseConfig()) {
    return siteConfig;
  }

  const data = await supabaseFetch(`${config.supabase.configTable}?select=${selectClause}&limit=1`);
  return data[0] || siteConfig;
};

const updateConfig = async (payload) => {
  const updated = { ...siteConfig, ...payload };

  if (!hasValidSupabaseConfig()) {
    Object.assign(siteConfig, updated);
    return siteConfig;
  }

  const response = await supabaseFetch(`${config.supabase.configTable}?id=eq.${updated.id}`, {
    method: 'PATCH',
    body: JSON.stringify(updated)
  });

  if (!response || response.length === 0) {
    await supabaseFetch(config.supabase.configTable, {
      method: 'POST',
      body: JSON.stringify([updated])
    });
  }

  return updated;
};

module.exports = {
  getConfig,
  updateConfig
};
