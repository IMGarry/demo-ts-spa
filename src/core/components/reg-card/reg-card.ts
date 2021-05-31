import './reg-card.scss'

import { BaseComponent } from '../base-component';

export class RegCard extends BaseComponent {

    constructor () {
        super('div', []);
        this.element.innerHTML = `
        
        <div class="reg-card hidden-card" id="reg-card">
          <form action="">
            <h2 class="reg-card-title">Registr new Player</h2>
            <label for="name">First name: </label>
            <input
              type="text"
              id="first-name"
              required
              value=""
              placeholder="Jessie"
            />
            <br />
            <br />
            <label for="name">Last name: </label>
            <input
              type="text"
              id="last-name"
              required
              value=""
              placeholder="Doe"
            />
            <br />
            <br />
            <label for="email">Your e-mail: </label>
            <input
              type="email"
              id="email"
              required
              value=""
              placeholder="Jessie.Doe@gmail.com"
            />
            <br />
            <br />
            
						<button class="button invalid" id="send" type="submit">
            Add user
            </button>
            <button class="cancel-button invalid" id="cancel-button" type="submit">
            Cancel
            </button>

          </form>
        </div>

        <div class="cover hidden-card" id="cover"></div>

       `;
    }
}