import './header.scss'
import Component from '../../templates/components';
import { PageIds } from '../../../pages/app/app';
import { HeaderLogo } from '../header/header-components/logo'
import { HeaderButton } from '../header/header-components/headerButton'


const Buttons = [
  {
    id: PageIds.MainPage,
    text: 'About Game',
  },
  {
    id: PageIds.StatisticsPage,
    text: 'Best Score',
  },
  {
    id: PageIds.SettingsPage,
    text: 'Game Settings',
  },
  
];

class Header extends Component {

  logo = new HeaderLogo()
  headerButton = new HeaderButton()

  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderPageButtons() {
    const pageButtons = document.createElement('div');
    pageButtons.className = 'header__nav'
    Buttons.forEach((button) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.href = `#${button.id}`;
      buttonHTML.id = `${button.id}`;
      buttonHTML.innerText = button.text;
      buttonHTML.className = 'header__nav-element'
      pageButtons.append(buttonHTML);
    });
    this.container.append(this.logo.element)
    this.container.append(pageButtons);
    this.container.append(this.headerButton.element);
  }

  render() {
    this.renderPageButtons();
    return this.container;
  }
}

export default Header;
