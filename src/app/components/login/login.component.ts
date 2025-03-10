import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Subject, takeUntil } from 'rxjs';
import { LoginService } from '../../service/login.service';
import { MapComponent } from '../maps/maps.component';
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule, HttpClientModule,MapComponent],
})
export class LoginComponent implements OnInit {
  protected unsubscribe = new Subject<void>();
  protected tAlert = inject(NgToastService);
  protected routerService = inject(Router);
  protected loginService = inject(LoginService);
  protected user!: string;
  protected pass!: string;
  ngOnInit(): void {
    this.canLoadin = false;
    this.loginService
      .eVerifyToken()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (res) => {
          // @ts-ignore
          if (!res.data.Authentication) {
            this.canLoadin = true;
            return;
          }
          this.routerService.navigate(['']);
        },
        (error) => {
          console.log(error);

          this.canLoadin = true;
          this.tAlert.warning({
            detail: 'Falhar de Autenticação',
            summary: 'Você não esta autenticado. \nFaça o Login',
            duration: 5000,
          });
        },
        () => {
          console.log('finish');
        }
      );
  }

  canLoadin: boolean = true;

  Login() {
    this.canLoadin = false;
    this.loginService
      .eLogin({ email: this.user, pass: this.pass })
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (res) => {
          console.log(res);

          if (!res.actionResult) {
            this.canLoadin = true;
            this.tAlert.error({
              detail: 'Falhar ao Logar',
              summary: 'Faça o Login com Usuário e Senha corretos',
              duration: 5000,
            });
            return;
          }
          this.tAlert.success({
            detail: 'Logado com Sucesso',
            summary: 'Seja Bem Vindo',
            duration: 5000,
          });
          this.routerService.navigate(['']);
        },
        (error) => {
          this.canLoadin = true;
          this.tAlert.error({
            detail: 'Falhar ao Logar',
            summary: 'Faça o Login com Usuário e Senha corretos',
            duration: 5000,
          });
        }
      );
  }
}
