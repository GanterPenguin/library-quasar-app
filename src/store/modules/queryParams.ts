import {
  VuexModule, Module, Action, Mutation, getModule,
} from 'vuex-module-decorators';
import store from 'store/index';
import { SearchParams } from 'models/filters';
import { pushRouteParams } from 'lib/filters';

interface QueryParamsInterface {
  paramsDefault: SearchParams;
  params: SearchParams;
}

@Module({
  dynamic: true,
  store,
  name: 'query-params',
  namespaced: true,
})
class QueryParams extends VuexModule implements QueryParamsInterface {
  public paramsDefault = {
    _page: 1,
    _limit: 10,
  };

  public params: SearchParams = {
    _page: 1,
    _limit: 10,
  };

  public inited = false;

  @Action
  public initParams(params: SearchParams) {
    this.UPDATE_PARAMS(params);
    pushRouteParams(this.params);
  }

  @Action
  public updateParams(params: SearchParams) {
    this.UPDATE_PARAMS(params);
    pushRouteParams(this.params);
  }

  @Action
  public resetParams(noRouterPush?: boolean) {
    this.RESET_PARAMS();
    pushRouteParams(this.params, noRouterPush);
  }

  @Mutation
  private UPDATE_PARAMS(params: SearchParams) {
    this.params = { ...this.params, ...params };
  }

  @Mutation
  private RESET_PARAMS() {
    this.params = { ...this.paramsDefault };
  }
}

export const queryParamsModule = getModule(QueryParams);
