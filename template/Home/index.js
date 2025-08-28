import { createWithRemoteLoader } from '@kne/remote-loader';

const Home = createWithRemoteLoader({
  modules: ['components-core:Layout@Page']
})(({ remoteModules, menu }) => {
  const [Page] = remoteModules;

  return (
    <Page title="首页" menu={menu}>
      欢迎👏
    </Page>
  );
});

export default Home;
