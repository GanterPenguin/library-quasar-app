import { getCurrentInstance } from '@vue/composition-api';

export function removeEmpty(obj: Record<string, unknown>) {
  Object.entries(obj).forEach(([key, val]) => {
    if (val && typeof val === 'object') removeEmpty(val as Record<string, unknown>);
    else if (val === null || val === undefined) delete obj[key];
    if (Array.isArray(val) && val.length === 0) delete obj[key];
  });
}

export function getTotalPagesFromHeaders(headers: Record<string, string>, limit: number) {
  if (headers && headers['x-total-count']) {
    const totalCount = parseInt(headers['x-total-count'], 10);
    return Math.ceil(totalCount / limit);
  }
  throw new Error('Ошибка при получении количества страниц');
}

export function useRoute() {
  const vm = getCurrentInstance();
  if (!vm) throw new Error('must be called in setup');

  return vm.$route;
}
