const getColumns = ({navigate}) => {
  return [
    {
      name: 'id',
      title: '编号',
      type: 'serialNumber',
      primary: true,
      hover: true,
      onClick: () => {}
    },
    {
      name: 'name',
      title: '名称',
      type: 'mainInfo'
    },
    {
      name: 'status',
      title: '状态',
      type: 'tag',
      valueOf: (item) => {
        if (item.status === 'open') {
          return { type: 'success', text: '开启' };
        }
        if (item.status === 'closed') {
          return { type: 'danger', text: '关闭' };
        }
      }
    },
    {
      name: 'description',
      title: '描述',
      type: 'description',
      ellipsis: true
    },
    {
      name: 'createdTime',
      title: '添加时间',
      type: 'datetime'
    }
  ];
};

export default getColumns;
