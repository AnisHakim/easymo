import DsStore from './store/DsStore'
export default function Root(props) {
  return (
    <Provider store={DsStore}>
      <section>{props.name} is mounted!</section>
    </Provider>
  )
}
