import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { GenomeService } from 'src/app/services/genome.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  private container!: HTMLElement;
  signUpForm: FormGroup = new FormGroup({});
  signInForm: FormGroup = new FormGroup({});
  passwordVisible = false;

  constructor(
    private elementRef: ElementRef,
    private servicioSeguridad: GenomeService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.ConstruirFormulario();
  }

  ngAfterViewInit() {
    this.container = this.elementRef.nativeElement.querySelector('#container');
    this.attachEventListeners();
  }

  ConstruirFormulario() {
    // Initialize sign up form
    this.signUpForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });

    // Initialize sign in form
    this.signInForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      token: ['', [Validators.required]]
    });
  }

  onSubmitSignUp() {
    if (this.signUpForm.valid) {
      const datos = this.ConstruirDatos(1);
      
      this.servicioSeguridad.registerUser(datos).subscribe({
        next: (respuesta: any) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Hola ${datos.name} tu registro fue exitoso, revisa tu correo y sigue las intrucciones. ¡Bienvenido!`,
            showConfirmButton: false,
            timer: 1000
          });
          this.container.classList.remove("right-panel-active");
        },
        error: (err: HttpErrorResponse) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Se ha producido un error al registrar el usuario. Por favor, inténtalo de nuevo más tarde.",
            showConfirmButton: false,
            timer: 1000
          });
        }
      });

      this.signUpForm.reset();
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Por favor, complete el formulario de Registro correctamente.",
        showConfirmButton: false,
        timer: 1000
      });
    }
  }

  onSubmitSignIn() {
    if (this.signInForm.valid) {
      const datos = this.ConstruirDatos(0);

      this.servicioSeguridad.loginUser(datos).subscribe({
        next: (respuesta: any) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Bienvenido de nuevo.",
            showConfirmButton: false,
            timer: 3000
          });
          this.router.navigate(['/genome-table']);
        },
        error: (err: HttpErrorResponse) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Se ha producido un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.",
            showConfirmButton: false,
            timer: 3000
          });
        }
      });

    }
  }

  attachEventListeners() {
    const signUpButton = this.container.querySelector('#signUp');
    const signInButton = this.container.querySelector('#signIn');

    signUpButton?.addEventListener('click', () => {
      this.container.classList.add("right-panel-active");
    });

    signInButton?.addEventListener('click', () => {
      this.container.classList.remove("right-panel-active");
    });
  }

  ConstruirDatos(tipo: number) {
    if (tipo === 1) {
      return {
        name: this.signUpForm.get('nombre')?.value,
        email: this.signUpForm.get('email')?.value,
      };
    } else {
      return {
        email: this.signInForm.get('usuario')?.value,
        token: this.signInForm.get('token')?.value
      };
    }
  }

  get ObtenerFormGroupLogin() {
    return this.signInForm.controls;
  }

  get ObtenerFormGroupSignUp() {
    return this.signUpForm.controls;
  }

  togglePasswordVisibility(event: Event) {
    event.stopPropagation();
    this.passwordVisible = !this.passwordVisible;
    const inputElement = document.querySelector('[formControlName="token"]') as HTMLInputElement;
    if (inputElement) {
      inputElement.type = this.passwordVisible ? 'text' : 'password';
    }
  }

  togglePasswordVisibilityR(event: Event) {
    event.stopPropagation();
    this.passwordVisible = !this.passwordVisible;
    const inputElement = document.querySelector('[formControlName="password"]') as HTMLInputElement;
    if (inputElement) {
      inputElement.type = this.passwordVisible ? 'text' : 'password';
    }
  }
}
