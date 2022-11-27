import styles from './styles.module.scss'



const Search = (props) => {
  const {
    onChange,
    value,
  } = props;
  
  return (
    <input onChange={onChange} value={value} className={styles['search-box']} type='text' name='name' placeholder='Пошук...'/>
  );
}
export default Search;