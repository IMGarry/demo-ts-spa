import './logo.scss'

import { BaseComponent } from '../../base-component';

export class HeaderLogo extends BaseComponent {

    constructor () {
        super('div', ['header-logo']);
        this.element.innerHTML = `
        <button class="header-logo top">MATCH</button>
        <button class="header-logo bottom">MATCH</button>
        `;
    }
}