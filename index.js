import process from 'process';
import path from 'path';
import Services from './services';
import { logSuccess } from './util';

import model_to_from from './to_from/model_to_from.json';

class App {
  async start() {
    await Services.startProcess(id_entity, model_to_from);

    logSuccess(`Done! Files created in "${path.resolve(__dirname)}\\result"`);

    process.exit();
  }
}

export default new App().start();
