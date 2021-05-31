import './mainPage.scss'
import Page from '../../core/templates/page';

class MainPage extends Page {
  static TextObject = {
    MainTitle: 'About Game',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(MainPage.TextObject.MainTitle);
    this.container.append(title);
    this.container.innerHTML=`
    <div class='about-game__container'>
    <h2 class='about-game__title'>How to play?</h2>
    <div class="about-game__register-block">
        <p>Register new player in game</p>
    </div>
    <div class="about-game__configure-block">
        <p>Configure your game settings</p>
    </div>
    <div class="about-game__start-block">
        <p>Start you new game! Remember card positions and match it before times up.</p>
    </div>

  

  </div>
    
    `
    return this.container;
  }
}

export default MainPage;
