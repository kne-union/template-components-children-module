import { createWithRemoteLoader } from '@kne/remote-loader';
import { useNavigate } from 'react-router-dom';
import getColumns from './getColumns';
import { useRef, useState } from 'react';
import { Space } from 'antd';
import Create from '../Actions/Create';
import Actions from '../Actions';

const stateType = [
  { tab: '全部', key: 'all' },
  {
    tab: '开启',
    key: 'open'
  },
  {
    tab: '关闭',
    key: 'closed'
  }
];

const stateTypeMap = new Map(stateType.map(item => [item.key, item]));

const List = createWithRemoteLoader({
  modules: ['components-core:Layout@TablePage', 'components-core:Filter', 'components-core:Global@usePreset', 'components-core:StateBar']
})(({ remoteModules, ...props }) => {
  const [TablePage, Filter, usePreset, StateBar] = remoteModules;
  const { ajax, apis } = usePreset();
  const { SearchInput, getFilterValue, fields: filterFields } = Filter;
  const { InputFilterItem } = filterFields;
  const ref = useRef(null);
  const [filter, setFilter] = useState([]);
  const filterValue = getFilterValue(filter);
  const navigate = useNavigate();
  return (
    <TablePage
      {...Object.assign(
        {},
        {
          loader: () => {
            return { pageData: [], totalCount: 0 };
          }
        },
        {
          data: Object.assign({}, filterValue)
        }
      )}
      ref={ref}
      name="list"
      pagination={{ paramsType: 'params' }}
      topArea={
        <StateBar
          type="radio"
          size="small"
          activeKey={filterValue.status || 'all'}
          onChange={value => {
            const currentState = stateTypeMap.get(value);
            setFilter(filter => {
              const newFilter = filter.slice(0);
              const currentIndex = filter.findIndex(item => item.name === 'status');

              if (currentState.key === 'all') {
                newFilter.splice(currentIndex, 1);
              } else if (currentIndex === -1) {
                newFilter.push({ name: 'status', value: { label: currentState.tab, value: currentState.key } });
              } else {
                newFilter.splice(currentIndex, 1, {
                  name: 'status',
                  value: { label: currentState.tab, value: currentState.key }
                });
              }
              return newFilter;
            });
          }}
          stateOption={stateType}
        />
      }
      page={{
        ...props,
        filter: {
          value: filter,
          onChange: setFilter,
          list: [[<InputFilterItem label="条件一" name="filter1" />, <InputFilterItem label="条件二" name="filter2" />]]
        },
        titleExtra: (
          <Space align="center">
            <SearchInput name="keyword" label="关键字" />
            <Create type="primary" onSuccess={() => ref.current?.reload()}>
              添加
            </Create>
          </Space>
        )
      }}
      columns={[
        ...getColumns({ navigate }),
        {
          name: 'options',
          title: '操作',
          type: 'options',
          fixed: 'right',
          valueOf: item => {
            return {
              children: <Actions data={item} onSuccess={() => ref.current?.reload()} />
            };
          }
        }
      ]}
    />
  );
});

export default List;
