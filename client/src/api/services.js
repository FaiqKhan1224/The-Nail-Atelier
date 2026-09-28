const API_BASE = 'http://localhost:5000/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message || data.error || `Request failed: ${response.status}`
    );
  }

  return data;
}

function asArray(data, keys = []) {
  if (Array.isArray(data)) {
    return data;
  }

  for (const key of keys) {
    if (Array.isArray(data?.[key])) {
      return data[key];
    }
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  for (const key of keys) {
    if (Array.isArray(data?.data?.[key])) {
      return data.data[key];
    }
  }

  return [];
}

/* =========================
   AUTH
========================= */

export const AuthAPI = {
  register: (data) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  login: (data) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  me: () => request('/auth/me'),

  updateMe: (data) =>
    request('/auth/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  changePassword: (data) =>
    request('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

/* =========================
   SERVICES
========================= */

export const ServiceAPI = {
  list: async (category) => {
    const endpoint = category
      ? `/services?category=${encodeURIComponent(category)}`
      : '/services';

    const data = await request(endpoint);

    return asArray(data, ['services', 'items', 'results']);
  },

  get: (id) => request(`/services/${id}`),

  adminList: async () => {
    const data = await request('/services/admin/all');

    return asArray(data, ['services', 'items', 'results']);
  },

  create: (data) =>
    request('/services', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    request(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  remove: (id) =>
    request(`/services/${id}`, {
      method: 'DELETE',
    }),
};

/* =========================
   REVIEWS
========================= */

export const ReviewAPI = {
  list: async () => {
    const data = await request('/reviews');

    return asArray(data, ['reviews', 'items', 'results']);
  },

  create: (data) =>
    request('/reviews', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  adminList: async () => {
    const data = await request('/reviews/admin/all');

    return asArray(data, ['reviews', 'items', 'results']);
  },

  updateStatus: (id, data) =>
    request(`/reviews/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  remove: (id) =>
    request(`/reviews/${id}`, {
      method: 'DELETE',
    }),
};

/* =========================
   GALLERY
========================= */

export const GalleryAPI = {
  list: async (category) => {
    const endpoint = category
      ? `/gallery?category=${encodeURIComponent(category)}`
      : '/gallery';

    const data = await request(endpoint);

    return asArray(data, [
      'gallery',
      'galleries',
      'galleryItems',
      'items',
      'results',
    ]);
  },

  create: (data) =>
    request('/gallery', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    request(`/gallery/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  remove: (id) =>
    request(`/gallery/${id}`, {
      method: 'DELETE',
    }),
};

/* =========================
   OFFERS
========================= */

export const OfferAPI = {
  list: async () => {
    const data = await request('/offers');

    return asArray(data, [
      'offers',
      'activeOffers',
      'items',
      'results',
    ]);
  },

  adminList: async () => {
    const data = await request('/offers/admin/all');

    return asArray(data, ['offers', 'items', 'results']);
  },

  create: (data) =>
    request('/offers', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    request(`/offers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  remove: (id) =>
    request(`/offers/${id}`, {
      method: 'DELETE',
    }),
};

/* =========================
   BRIDAL PACKAGES
========================= */

export const PackageAPI = {
  list: async () => {
    const data = await request('/packages');

    return asArray(data, [
      'packages',
      'bridalPackages',
      'items',
      'results',
    ]);
  },

  adminList: async () => {
    const data = await request('/packages/admin/all');

    return asArray(data, [
      'packages',
      'bridalPackages',
      'items',
      'results',
    ]);
  },

  create: (data) =>
    request('/packages', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    request(`/packages/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  remove: (id) =>
    request(`/packages/${id}`, {
      method: 'DELETE',
    }),
};

/* =========================
   SETTINGS
========================= */

export const SettingsAPI = {
  get: () => request('/settings'),

  update: (data) =>
    request('/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

/* =========================
   AI CHAT
========================= */

export const AIChatAPI = {
  config: () => request('/ai/config'),

  send: (message, history = []) =>
    request('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({
        message,
        history,
      }),
    }),
};

/* =========================
   AI KNOWLEDGE
========================= */

export const AIKnowledgeAPI = {
  list: async () => {
    const data = await request('/ai/knowledge');

    return asArray(data, [
      'knowledge',
      'items',
      'results',
    ]);
  },

  create: (data) =>
    request('/ai/knowledge', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    request(`/ai/knowledge/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  remove: (id) =>
    request(`/ai/knowledge/${id}`, {
      method: 'DELETE',
    }),
};

/* =========================
   APPOINTMENTS
========================= */

export const AppointmentAPI = {
  slots: async (serviceId, date) => {
    const data = await request(
      `/appointments/available-slots?serviceId=${encodeURIComponent(
        serviceId
      )}&date=${encodeURIComponent(date)}`
    );

    return asArray(data, [
      'slots',
      'availableSlots',
      'items',
      'results',
    ]);
  },

  mine: async () => {
    const data = await request('/appointments/mine');

    return asArray(data, [
      'appointments',
      'items',
      'results',
    ]);
  },

  adminList: async () => {
    const data = await request('/appointments/admin/all');

    return asArray(data, [
      'appointments',
      'items',
      'results',
    ]);
  },

  create: (data) =>
    request('/appointments', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  cancel: (id) =>
    request(`/appointments/${id}/cancel`, {
      method: 'PUT',
    }),

  updateStatus: (id, status) =>
    request(`/appointments/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),
};

/* =========================
   CONTACT
========================= */

export const ContactAPI = {
  send: (data) =>
    request('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  adminList: async () => {
    const data = await request('/contact/admin/all');

    return asArray(data, [
      'messages',
      'contacts',
      'items',
      'results',
    ]);
  },

  updateStatus: (id, status) =>
    request(`/contact/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),

  remove: (id) =>
    request(`/contact/${id}`, {
      method: 'DELETE',
    }),
};

/* =========================
   ADMIN DASHBOARD
========================= */

export const AdminAPI = {
  stats: () => request('/admin/stats'),
};

/* =========================
   DEFAULT EXPORT
========================= */

export default {
  AuthAPI,
  ServiceAPI,
  ReviewAPI,
  GalleryAPI,
  OfferAPI,
  PackageAPI,
  SettingsAPI,
  AIChatAPI,
  AIKnowledgeAPI,
  AppointmentAPI,
  ContactAPI,
  AdminAPI,
};