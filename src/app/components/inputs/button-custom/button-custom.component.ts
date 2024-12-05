import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-custom',
  standalone: true,
  imports: [],
  template: `<div class="custom-card">
    <img src="{{ ico }}" alt="{{ label.replace(' ', '').toLowerCase() }}" />
    <span>{{ label }}</span>
  </div>`,
  styles: `
  .custom-card {
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
    text-align: center;
    &:hover {
      cursor: pointer;
      background: #ecebeb;;
      box-shadow: 0 0.2rem 0.2rem 0 hsl(0deg 0% 0%)
    }
    img{
    width:50px;
    height:50px
    }
  }`,
})
export class ButtonCustomComponent {
  @Input() ico: string = '';
  @Input() label: string = '...';
}
