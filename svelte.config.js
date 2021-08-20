// svelte options exported for svelte-vscode
const {
  preprocess,
  createEnv,
  readConfigFile
} = require("@pyoner/svelte-ts-preprocess");

const env = createEnv();
const compilerOptions = readConfigFile(env);

module.exports = {
  dev: true,
  preprocess: preprocess({
    env,
    compilerOptions: {
      ...compilerOptions,
      allowNonTsExtensions: true
    }
  })
};
