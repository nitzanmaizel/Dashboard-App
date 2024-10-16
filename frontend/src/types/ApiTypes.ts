export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_VERSION = '/api/v1';

export const API_FULL_URL = `${API_BASE_URL}${API_VERSION}`;

export const API_LOGIN = `${API_FULL_URL}/auth/login`;

export const API_DOCS = '/docs';

export const API_DOCS_SEARCH = `${API_DOCS}/search`;

export const API_DOCS_DOWNLOAD = `${API_DOCS}/download`;

export const API_DOCS_RECENT = `${API_DOCS}/recent`;

export const API_DOCS_CREATE = `${API_DOCS}/create`;

export const API_DOCS_DELETE = `${API_DOCS}/delete`;

export const API_USER = '/auth/user';

export const API_LOGOUT = '/auth/logout';
