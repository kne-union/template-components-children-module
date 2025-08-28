import { createWithRemoteLoader } from '@kne/remote-loader';
import AppChildrenRouter from '@kne/app-children-router';

const AppChildren = createWithRemoteLoader({
  modules: ['components-core:Layout@Menu']
})(({ remoteModules, baseUrl = '' }) => {
  const [Menu] = remoteModules;
  const menu = (
    <Menu
      items={[
        {
          key: 'index',
          label: '首页',
          path: `${baseUrl}`
        },
        {
          key: 'module',
          label: '子模块',
          path: `${baseUrl}/module`
        }
      ]}
    />
  );
  return (
    <AppChildrenRouter
      menu={menu}
      baseUrl={baseUrl}
      list={[
        {
          index: true,
          loader: () => import('./Home')
        },
        {
          path: 'module',
          loader: () => import('./Module')
        }
      ]}
    />
  );
});

export default AppChildren;

export { default as enums } from './enums';
