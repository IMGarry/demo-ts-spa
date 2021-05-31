import './headerButton.scss'

import { BaseComponent } from '../../base-component';

export class HeaderButton extends BaseComponent {
    
    constructor () {
        super('button', ['header-button']);
        this.element.innerHTML = `
        Add new player
        `;
    }

    
}