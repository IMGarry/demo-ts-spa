import Page from '../../core/templates/page';
import { Game } from "../../core/components/game/game";
import SettingsPage from '../settings/settingsPage';


class GamePage extends Page {
  private readonly game: Game;

  static TextObject = {
    MainTitle: 'Game',
  };

  constructor(id: string) {
    super(id);
    this.game = new Game();

  }



  render() {
    const title = this.createHeaderTitle(SettingsPage.TextObject.MainTitle);
    this.container.append(title);
    this.container.innerHTML=`
    <div class='game__container'>
    ${this.game.element}
    </div>
    `
    // this.container.append(this.game.element);
    return this.container;
  }
};

export default GamePage;