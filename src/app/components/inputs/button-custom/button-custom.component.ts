import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-custom',
  standalone: true,
  imports: [],
  template: `<div id="blocked" class="custom-card">

    <span>{{ label }}</span>
  </div>`,
  styles: `.custom-card {
    display: flex;
    width: 100px;
    height: 100px;
    padding: 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.2rem;
    flex-shrink: 0;
    border-radius: 1.2rem;
    background: #fafafa;
    box-shadow: 0 0.4rem 0.4rem 0 hsl(0deg 0% 0%)
    font-size: 1.5rem;
    font-weight: 500;
    text-align: center;
    &:hover {
      cursor: pointer;
      background: #ecebeb;;
      box-shadow: 0 0.2rem 0.2rem 0 hsl(0deg 0% 0%)
    }
  }`,
})
export class ButtonCustomComponent {
  //@Input() ico: string ='';
  @Input() label: string = '...';
}

export interface ButtonSVG {
  NEW_DELIVERY: `<svg width="50px" height="50px" viewBox="0 -2 20 20" xmlns="http://www.w3.org/2000/svg">
  <g id="delivery-truck" transform="translate(-2 -4)">
    <path id="secondary" fill="#2ca9bc" d="M20.24,10.81,19,10.5l-.79-2.77a1,1,0,0,0-1-.73H13V17h2a2,2,0,0,1,4,0h1a1,1,0,0,0,1-1V11.78A1,1,0,0,0,20.24,10.81Z"/>
    <path id="primary" d="M9.17,17H13V6a1,1,0,0,0-1-1H5" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
    <path id="primary-2" data-name="primary" d="M3,13v3a1,1,0,0,0,1,1h.87" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
    <path id="primary-3" data-name="primary" d="M14.87,17H13V7h4.25a1,1,0,0,1,1,.73L19,10.5l1.24.31a1,1,0,0,1,.76,1V16a1,1,0,0,1-1,1h-.89" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
    <path id="primary-4" data-name="primary" d="M9,17a2,2,0,1,1-2-2A2,2,0,0,1,9,17Zm8-2a2,2,0,1,0,2,2A2,2,0,0,0,17,15ZM3,9H9" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
  </g>
</svg>`;
}
