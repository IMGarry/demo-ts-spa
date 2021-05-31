import Page from '../../core/templates/page';
import MainPage from '../main/mainPage';
import SettingsPage from '../settings/settingsPage';
import StatisticsPage from '../statistics/bestScore';
import Header from '../../core/components/header/header';
import ErrorPage, { ErrorTypes } from '../error';
import { Game } from "../../core/components/game/game";
import { ImageCategoryModel } from '../../models/image-category-model'
import { RegCard } from '../../core/components/reg-card/reg-card';
import GamePage from '../game/game';


export const enum PageIds {
  MainPage = 'about-game-page',
  SettingsPage = 'game-settings-page',
  StatisticsPage = 'best-score-page',
  GamePage = 'game-page'
}

class App {
  private static container: HTMLElement = document.body;
  private static defaultPageId: string = 'current-page';
  private header: Header;
  private regCard: RegCard;
  
  
  // static btn: HTMLElement | null = document.querySelector('.header-button');
  // private btn: HTMLElement = document.querySelector('.header-button') ;
  private readonly game: Game;

  static renderNewPage(idPage: string) {
    const btn = document.querySelector('.header-button')
    console.log(btn?.textContent);
    
    const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
    
    if (currentPageHTML) {
      currentPageHTML.remove();
    }
    let page: Page | null = null;

    if (idPage === PageIds.MainPage) {
      page = new MainPage(idPage);
    } else if (idPage === PageIds.SettingsPage) {
      page = new SettingsPage(idPage);
    } else if (idPage === PageIds.StatisticsPage) {
      page = new StatisticsPage(idPage);
    } else {
      page = new ErrorPage(idPage, ErrorTypes.Error_404);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageId;
      App.container.append(pageHTML);
    }

    

    const menuItems = document.querySelectorAll('.header__nav-element')
    // const btn:HTMLElement | null = document.querySelector('.header-button')
    
    menuItems.forEach(it => {
      if (it.id === idPage) {
        it.classList.add('active')
      }
      if (it.id !== idPage) {
        it.classList.remove('active')
      }
      
    })

    


  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
    
  }

  private checkGamePage() {
    let id = window.location.hash.slice(1)
    if (App.defaultPageId) {
      console.log(id);
      
    }
  }
  
  constructor() {
    this.regCard = new RegCard()
    this.game = new Game();
    this.header = new Header('header', 'header-container');
  }

  private toggleButton () {
    const regButton = document.querySelector('.header-button');
    const regCard = document.querySelector('.reg-card');
    const cover = document.querySelector('.cover');
    const cancelButton = document.getElementById('cancel-button');
    

    regButton?.addEventListener('click', () => {
      console.log('Click!');
      
      document.body.classList.add('notScrollable');
      regCard?.classList.toggle('hidden-card');
      cover?.classList.toggle('hidden-card');
    });

    cancelButton?.addEventListener('click', () => {
      document.body.classList.remove('notScrollable');
      regCard?.classList.toggle('hidden-card');
      cover?.classList.toggle('hidden-card');
    });

    cover?.addEventListener('click', () => {
      document.body.classList.remove('notScrollable');
      cover?.classList.add('hidden-card');
      regCard?.classList.add('hidden-card');
    });

  }
  
  async start() {
    const res = await fetch("./images.json");
    const categories: ImageCategoryModel[] = await res.json();
    const cat = categories[0]
    const images = cat.images.map((name) => `${cat.category}/${name}`)
    this.game.newGame(images)
  }

  run() {
    App.container.append(this.header.render());
    App.container.append(this.game.element);
    App.container.append(this.regCard.element);
    App.renderNewPage('about-game-page');
    this.enableRouteChange();
    this.checkGamePage()
    this.toggleButton()
  }

  

}

// Main, Settings, Statistics

export default App;