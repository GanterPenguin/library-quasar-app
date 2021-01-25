/* eslint-disable no-console */
import { Notify } from 'quasar';
import { boot } from 'quasar/wrappers';

// Обработчик ошибок vue по какой-то причине не отлавливает
// ошибки внутри промизов, соответственно
// в window.onerror они тоже не попадают
// скорее всего баг в @vue/composition-api
export default boot(({ Vue }) => {
  Vue.config.errorHandler = (error) => {
    if (error.message) {
      Notify.create({
        type: 'negative',
        message: error.message,
      });
    }
    // eslint-disable-next-line no-console
    console.error(error);
  };

  window.onerror = (message, source, line, col, error) => {
    if (typeof message === 'string') {
      Notify.create({
        type: 'negative',
        message,
      });
    }
    console.error(error);
  };
});
