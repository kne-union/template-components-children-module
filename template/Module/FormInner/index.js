import { createWithRemoteLoader } from '@kne/remote-loader';

const FormInner = createWithRemoteLoader({
  modules: ['components-core:FormInfo']
})(({ remoteModules }) => {
  const [FormInfo] = remoteModules;
  const { Input, TextArea } = FormInfo.fields;
  return (
    <>
      <FormInfo list={[<Input name="name" label="名称" rule="REQ LEN-0-100" />, <TextArea name="description" label="描述" block />]} />
    </>
  );
});

export default FormInner;
