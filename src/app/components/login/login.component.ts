import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { pipe, Subject, take, takeUntil } from 'rxjs';
import { AlertComponent, StateAlert } from '../alert/alert.component';
import { AlertService } from '../alert/alert.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule, HttpClientModule],
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
          if (res.err) {
            this.canLoadin = true;
            return;
          }
          this.routerService.navigate(['']);
        },
        (error) => {
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
      .eLogin({ user: this.user, pass: this.pass })
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (res) => {
          if (res.err) {
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
