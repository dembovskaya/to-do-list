import { Button } from '../base/button';
import { Icon, IconTypes } from '../base/icon';
import { changeMode } from '../base/theme/component';
import { LogoName } from './components/logo-name/component';
import { Logo } from './components/logo/component';
import { SearchBar } from './components/search-bar/component';
import { openModalToAddTask } from './helpers';

import styles from './styles.module.scss';

export function Header() {
  const header = document.createElement('header');
  header.classList.add(styles.header);

  header.append(
		Logo(), 
		LogoName(), 
		SearchBar(), 
		Button({content: '+ TASK', clickHandler: openModalToAddTask}), 
		Icon({type: IconTypes.Sun, clickHandler: changeMode}), 
		Icon({type: IconTypes.Moon, clickHandler: changeMode})
	);

  return header;
}
