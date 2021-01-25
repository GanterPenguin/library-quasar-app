import {
  SearchParams,
} from 'models/filters';
import Router from 'router/index';
import { removeEmpty } from 'lib/utils';

export function pushRouteParams(
  params: SearchParams,
  noRouterPush?: boolean,
) {
  const copy = { ...params } as Record<string, string>;
  removeEmpty(copy);
  if (!noRouterPush) {
    Router.replace({ query: copy })
    // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  }
}
