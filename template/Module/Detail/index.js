import { createWithRemoteLoader } from '@kne/remote-loader';
import Fetch from '@kne/react-fetch';
import { useSearchParams } from 'react-router-dom';
import Actions from '../Actions';
import RightOptions from './RightOptions';

const Detail = createWithRemoteLoader({
  modules: ['components-core:Layout@Page', 'components-core:Layout@PageHeader', 'components-core:Global@usePreset', 'components-core:InfoPage', 'components-core:Descriptions']
})(({ remoteModules, ...props }) => {
  const [Page, PageHeader, usePreset, InfoPage, Descriptions] = remoteModules;
  const { apis } = usePreset();
  const [searchParams] = useSearchParams();
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
        return (
          <Page {...props} name="detail" headerFixed={false} header={
            <PageHeader title={data.name} info={`ID: ${data.id}`}
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
          } option={<RightOptions />}>
            <InfoPage>
              <InfoPage.Part title="详情信息">
                <InfoPage.Part>
                  <Descriptions
                    dataSource={[
                      [{ label: 'ID', content: data.id }],
                      [
                        {
                          label: '名称',
                          content: data.name
                        }
                      ],
                      [{ label: 'description', content: data.description }]
                    ]}
                  />
                </InfoPage.Part>
                <InfoPage.Part title="详情信息2">详情信息详情信息详情信息详情信息详情信息详情信息详情信息详情信息</InfoPage.Part>
              </InfoPage.Part>
            </InfoPage>
          </Page>
        );
      }}
    />
  );
});

export default Detail;
