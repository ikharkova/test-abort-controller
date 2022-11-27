import styles from './styles.module.scss'

const Loading = () => {
  return (
    <div className={styles['lds-grid']}>Loading
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Loading;