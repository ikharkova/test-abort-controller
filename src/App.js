import styles from './app.module.scss'
import Search from './components/Search/Search';
import { useEffect, useState, useRef } from "react";
import { FixedSizeList } from 'react-window';
import PhotoBlock from './components/PhotoBlock/PhotoBlock';
import Loading from './components/Loading/Loading';
import {ReactComponent as EmojiIcon} from './assets/icons/emoji-icon.svg';


function App() {
  const [searchValue, setSearchValue] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listHeight, setListHeight] = useState(500);
  const mainRef = useRef();
  
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const Row = ({ index, style }) => (
    <div style={style}>
      <PhotoBlock url={items[index].thumbnailUrl} title={items[index].title} />
    </div>
  );

  useEffect(() => {
    setListHeight(mainRef?.current.clientHeight - 165 || 500);
  }, [])

  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = { signal: abortCtrl.signal };

    setItems([]);

    if(searchValue) {
      setLoading(true);

      fetch(`https://jsonplaceholder.typicode.com/photos?title_like=^${searchValue}`, opts)
        .then((response) => response.json())
        .then((json) => {
          setItems(json);
          setLoading(false);
        });
    }

    return () => abortCtrl.abort();
  }, [searchValue]);

  return (
    <div className={styles['main']} ref={mainRef}>
    <Search 
      onChange={onChangeSearchInput}
      value={searchValue}
    />
    {
      searchValue && (
        loading ? <Loading /> : 
          (
            !items.length ? 
            (<div className={styles['not-result']}>
              <span>There are no result for this search</span>
              <EmojiIcon className={styles['emoji-icon']}/>
            </div>) :
            <FixedSizeList
              height={listHeight}
              width="100vw"
              itemSize={380}
              itemCount={items.length}
            >
              {Row}
            </FixedSizeList> 
          )
      )
    }
    </div>
  );
}

export default App;
