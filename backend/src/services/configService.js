const { query } = require('../database/pool');

const normalizeConfig = (config) => ({
  id: config.id,
  heroTitle: config.hero_title,
  heroSubtitle: config.hero_subtitle,
  about: config.about,
  profileImage: config.profile_image,
  contactEmail: config.contact_email,
  whatsappNumber: config.whatsapp_number,
  githubUrl: config.github_url,
  linkedinUrl: config.linkedin_url,
  resumeUrl: config.resume_url,
  createdAt: config.created_at,
  updatedAt: config.updated_at
});

const getConfig = async () => {
  const result = await query(
    'SELECT id, hero_title, hero_subtitle, about, profile_image, contact_email, whatsapp_number, github_url, linkedin_url, resume_url, created_at, updated_at FROM site_config LIMIT 1'
  );
  
  if (result.rows.length === 0) {
    return {
      heroTitle: 'Bienvenido a mi Portafolio',
      heroSubtitle: 'Desarrollador Full Stack',
      about: '',
      profileImage: '',
      contactEmail: ''
    };
  }
  
  return normalizeConfig(result.rows[0]);
};

const updateConfig = async (payload) => {
  const existing = await query('SELECT id FROM site_config LIMIT 1');
  
  if (existing.rows.length === 0) {
    const result = await query(
      `INSERT INTO site_config (hero_title, hero_subtitle, about, profile_image, contact_email, whatsapp_number, github_url, linkedin_url, resume_url, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
       RETURNING id, hero_title, hero_subtitle, about, profile_image, contact_email, whatsapp_number, github_url, linkedin_url, resume_url, created_at, updated_at`,
      [
        payload.heroTitle || '',
        payload.heroSubtitle || '',
        payload.about || '',
        payload.profileImage || '',
        payload.contactEmail || '',
        payload.whatsappNumber || '',
        payload.githubUrl || '',
        payload.linkedinUrl || '',
        payload.resumeUrl || ''
      ]
    );
    return normalizeConfig(result.rows[0]);
  }

  const result = await query(
    `UPDATE site_config SET 
      hero_title = COALESCE($1, hero_title),
      hero_subtitle = COALESCE($2, hero_subtitle),
      about = COALESCE($3, about),
      profile_image = COALESCE($4, profile_image),
      contact_email = COALESCE($5, contact_email),
      whatsapp_number = COALESCE($6, whatsapp_number),
      github_url = COALESCE($7, github_url),
      linkedin_url = COALESCE($8, linkedin_url),
      resume_url = COALESCE($9, resume_url),
      updated_at = NOW()
     WHERE id = $10
     RETURNING id, hero_title, hero_subtitle, about, profile_image, contact_email, whatsapp_number, github_url, linkedin_url, resume_url, created_at, updated_at`,
    [
      payload.heroTitle,
      payload.heroSubtitle,
      payload.about,
      payload.profileImage,
      payload.contactEmail,
      payload.whatsappNumber,
      payload.githubUrl,
      payload.linkedinUrl,
      payload.resumeUrl,
      existing.rows[0].id
    ]
  );

  return normalizeConfig(result.rows[0]);
};

module.exports = {
  getConfig,
  updateConfig
};
