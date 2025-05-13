/* eslint-disable no-console */
import React from 'react';
import chalk from 'chalk';
import cliProgress from 'cli-progress';
import fs from 'fs-extra';
import ReactDOMServer from 'react-dom/server';

import { theme } from 'antd';
import { statistic } from '@ant-design/cssinjs-utils';
import { generateCssinjs, styleFiles } from './generate-cssinjs';

console.log(`🪄 Collecting token statistics...`);

const bar = new cliProgress.SingleBar(
  {
    format: `🪄 Collecting by component: [${chalk.cyan('{bar}')}] {component} | {value}/{total}`,
  },
  cliProgress.Presets.rect,
);

bar.start(styleFiles.length, 0);

(async () => {
  await generateCssinjs({
    key: 'file',
    beforeRender(componentName: string) {
      bar.increment({ component: componentName });
    },
    render(Component: any) {
      ReactDOMServer.renderToString(React.createElement(Component));
      // Render wireframe
      const wireframeToken = { ...theme.defaultConfig.token, wireframe: true };
      ReactDOMServer.renderToString(
        React.createElement(
          theme._internalContext.Provider,
          {
            value: {
              token: wireframeToken,
              override: {
                override: wireframeToken,
              },
            },
          },
          React.createElement(Component),
        ),
      );
    },
  });
  bar.stop();
  const tokenPath = `${process.cwd()}/components/version/token.json`;
  fs.writeJsonSync(tokenPath, statistic, 'utf8');
  console.log(chalk.green(`✅ Collected token statistics successfully, check it in`), tokenPath);
})();
