import { createWithRemoteLoader } from '@kne/remote-loader';
import Fetch from '@kne/react-fetch';
import { useSearchParams } from 'react-router-dom';
import Actions from '../Actions';

const Basic = () => '基本信息';

const contentMap = {
  basic: Basic
};

const TabDetail = createWithRemoteLoader({
  modules: ['components-core:Layout@StateBarPage', 'components-core:Layout@PageHeader', 'components-core:Global@usePreset']
})(({ remoteModules, ...props }) => {
  const [StateBarPage, PageHeader, usePreset] = remoteModules;
  const { apis } = usePreset();
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <Fetch
      {...Object.assign(
        {},
        {
          loader: () => {
            return {
              id: '12345',
              name: '详情页'
            };
          }
        },
        { params: { id: searchParams.get('id') } }
      )}
      render={({ data, reload }) => {
        const activeKey = searchParams.get('tab') || 'basic';
        const ContentComponent = contentMap[activeKey] || Basic;
        return (
          <StateBarPage
            {...props}
            headerFixed={false}
            header={
              <PageHeader
                title={data.name}
                info={`ID: ${data.id}`}
                tasg={['标签1', '标签2']}
                buttonOptions={
                  <Actions
                    data={data}
                    onSuccess={() => {
                      reload();
                    }}
                  />
                }
              />
            }
            stateBar={{
              activeKey,
              onChange: key => {
                searchParams.set('tab', key);
                setSearchParams(searchParams.toString());
              },
              stateOption: [{ tab: '基本信息', key: 'basic' }]
            }}>
            <ContentComponent data={data} reload={reload} />
          </StateBarPage>
        );
      }}
    />
  );
});

export default TabDetail;
