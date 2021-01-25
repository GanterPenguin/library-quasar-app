export function removeEmpty(obj: Record<string, unknown>) {
  Object.entries(obj).forEach(([key, val]) => {
    if (val && typeof val === 'object') removeEmpty(val as Record<string, unknown>);
    else if (val === null || val === undefined) delete obj[key];
    if (Array.isArray(val) && val.length === 0) delete obj[key];
  });
}

/*
Хэдер Link имеет следующий вид, необходимо получить из последней ссылки общее количество страниц
Link: <http://localhost:3001/libraries?_page=1>; rel="first",
      <http://localhost:3001/libraries?_page=2>; rel="next",
      <http://localhost:3001/libraries?_page=1252>; rel="last"
 */
export function getTotalPagesFromHeaders(headers: Record<string, string>) {
  if (headers && headers.link) {
    const { link } = headers;
    if (link.split(',')[2]) {
      const lastLink = link.split(',')[2];
      const regex = /_page=[0-9]*/;
      const result = regex.exec(lastLink);
      return result && result[0] ? parseInt(result[0].replace('_page=', ''), 10) : null;
    }
  }
  throw new Error('Ошибка при получении количества страниц');
}
