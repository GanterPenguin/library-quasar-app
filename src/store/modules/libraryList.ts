import {
  VuexModule, Module, Action, Mutation, getModule,
} from 'vuex-module-decorators';
import store from 'store/index';
import { Library } from 'models/Library';
import { getLibrariesList } from 'api/requests';
import { SearchParams } from 'models/filters';
import { getTotalPagesFromHeaders } from 'lib/utils';

interface LibraryListInterface {
  items: Library[];
  totalPages: number | null;
}

@Module({
  dynamic: true,
  store,
  name: 'library-list',
  namespaced: true,
})
class LibraryList extends VuexModule implements LibraryListInterface {
  public items: Library[] = [];

  public totalPages: number | null = null;

  public title: string | null = 'Загрузка...';

  // eslint-disable-next-line @typescript-eslint/require-await
  @MutationAction({ mutate: ['title'] })
  public async setTitle(title: string) {
    return { title };
  }

  @Action
  public async getItems(params: SearchParams) {
    const response = await getLibrariesList(params);
    this.SET_ITEMS(response.data);
    if (this.totalPages === null) {
      const totalPages = getTotalPagesFromHeaders(response.headers);
      if (totalPages) {
        this.SET_TOTAL_PAGES(totalPages);
      }
    }
  }

  @Mutation
  private SET_ITEMS(items: Library[]) {
    this.items = items;
  }

  @Mutation
  private SET_TOTAL_PAGES(pages: number) {
    this.totalPages = pages;
  }
}

export const libraryListModule = getModule(LibraryList);
