import { API_BASE_URL } from '../config/constants';

export async function getCharacters({ page = 1, name = '', signal } = {}) {
  let url = `${API_BASE_URL}/character?page=${page}`;
  const search = name.trim();
  if (search) url += `&name=${encodeURIComponent(search)}`;

  const response = await fetch(url, { signal });
  if (response.status === 404) return { results: [], hasNextPage: false };
  if (!response.ok) throw new Error(`No se pudieron cargar los personajes (${response.status}).`);

  const data = await response.json();
  return {
    results: data.results ?? [],
    hasNextPage: Boolean(data.info?.next),
  };
}
