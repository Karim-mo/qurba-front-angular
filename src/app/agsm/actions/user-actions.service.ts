import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AgsmService } from 'agsm';
import { userReducer } from '../reducers/userReducer';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_RESET_ERRORS,
  USER_LOGOUT,
} from '../types/types';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserActionsService {
  private apiUrl = 'http://localhost:5000/auth';

  constructor(private agsm: AgsmService, private http: HttpClient) {}

  async login(userData: any) {
    this.agsm.dispatch(USER_LOGIN_REQUEST);

    // Start determining which credentials were used
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const usernameRegex = /^[A-Za-z]+$/;
    const phoneRegex = /^\d{11}$/;

    let credentials: any = {};
    try {
      if (
        !emailRegex.test(userData.emailUserPhone) &&
        !usernameRegex.test(userData.emailUserPhone) &&
        !phoneRegex.test(userData.emailUserPhone)
      ) {
        throw new Error('Invalid Credentials');
      }

      if (emailRegex.test(userData.emailUserPhone)) {
        credentials = { email: userData.emailUserPhone };
      } else if (usernameRegex.test(userData.emailUserPhone)) {
        credentials = { username: userData.emailUserPhone };
      } else if (phoneRegex.test(userData.emailUserPhone)) {
        credentials = { mobile: userData.emailUserPhone };
      }

      const { user } = await this.http
        .post<any>(
          this.apiUrl + '/login',
          { ...credentials, password: userData.password },
          httpOptions
        )
        .toPromise();

      localStorage.setItem('user', JSON.stringify(user));

      this.agsm.dispatch(USER_LOGIN_SUCCESS, user);
    } catch (e: any) {
      const error = e.error ? e.error.message : e.message;
      this.agsm.dispatch(USER_LOGIN_FAIL, error);
    }
  }

  async register(userData: any) {
    this.agsm.dispatch(USER_LOGIN_REQUEST);

    // Start determining which credentials were used
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const usernameRegex = /^[A-Za-z]+$/;
    const phoneRegex = /^\d{11}$/;

    let credentials: any = {};
    try {
      if (
        !emailRegex.test(userData.emailUserPhone) &&
        !usernameRegex.test(userData.emailUserPhone) &&
        !phoneRegex.test(userData.emailUserPhone)
      ) {
        throw new Error('Invalid Credentials');
      }

      if (emailRegex.test(userData.emailUserPhone)) {
        credentials = { email: userData.emailUserPhone };
      } else if (usernameRegex.test(userData.emailUserPhone)) {
        credentials = { username: userData.emailUserPhone };
      } else if (phoneRegex.test(userData.emailUserPhone)) {
        credentials = { mobile: userData.emailUserPhone };
      }

      const { user } = await this.http
        .post<any>(
          this.apiUrl + '/register',
          { ...credentials, password: userData.password, name: userData.name },
          httpOptions
        )
        .toPromise();

      localStorage.setItem('user', JSON.stringify(user));

      this.agsm.dispatch(USER_LOGIN_SUCCESS, user);
    } catch (e: any) {
      const error = e.error ? e.error.message : e.message;
      this.agsm.dispatch(USER_LOGIN_FAIL, error);
    }
  }

  logout() {
    this.agsm.dispatch(USER_LOGOUT);

    localStorage.removeItem('user');
  }

  resetErrors() {
    this.agsm.dispatch(USER_RESET_ERRORS);
  }
}
