import styles from './styles.module.scss'

const PhotoBlock = (props) => {
  const {
    title,
    url,
  } = props;
  
  return (
    <div className={styles['picture-block']}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles['picture-wrapper']}>
        <img src={url} alt={title}/>
      </div>
      <div className={styles.line}></div>
    </div>
  );
}
export default PhotoBlock;