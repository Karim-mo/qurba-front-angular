import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { userState } from '../models/UserModel';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class usersApiService {
  // Initial State
  state: userState = {
    loading: false,
    user: null,
    error: null,
  };

  private apiUrl = 'http://localhost:5000/auth';
  private _userReducer = new Subject<userState>();

  constructor(private http: HttpClient) {}

  async register(userData: any) {
    this.state = {
      ...this.state,
      loading: true,
    };
    this._userReducer.next(this.state);

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

      this.state = {
        ...this.state,
        error: null,
        loading: false,
        user,
      };

      localStorage.setItem('user', JSON.stringify(user));

      this._userReducer.next(this.state);
    } catch (e: any) {
      this.state = {
        ...this.state,
        loading: false,
        error: e.error ? e.error.message : e.message,
      };

      this._userReducer.next(this.state);
    }
  }

  async login(userData: any) {
    this.state = {
      ...this.state,
      loading: true,
    };
    this._userReducer.next(this.state);

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

      this.state = {
        ...this.state,
        error: null,
        loading: false,
        user,
      };

      localStorage.setItem('user', JSON.stringify(user));

      this._userReducer.next(this.state);
    } catch (e: any) {
      this.state = {
        ...this.state,
        loading: false,
        error: e.error ? e.error.message : e.message,
      };

      this._userReducer.next(this.state);
    }
  }

  async logout() {
    this.state = {
      user: null,
      error: null,
      loading: false,
    };

    this._userReducer.next(this.state);

    localStorage.removeItem('user');
  }

  async resetErrors() {
    this.state = {
      ...this.state,
      error: null,
    };

    this._userReducer.next(this.state);
  }

  getState(): void {
    this._userReducer.next(this.state);
  }

  setState(state: userState): void {
    this.state = state;
    this._userReducer.next(this.state);
  }

  userReducer(): Observable<userState> {
    return this._userReducer.asObservable();
  }
}
