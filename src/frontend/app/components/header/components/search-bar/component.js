import { SearchBarInput } from '../search-bar-input/component';

import styles from './styles.module.scss';

export function SearchBar() {
  const searchBar = document.createElement('div');
  const input = SearchBarInput();

  searchBar.classList.add('search-bar', styles.searchBar);

  searchBar.append(input);

  return searchBar;
}