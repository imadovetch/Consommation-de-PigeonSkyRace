import { TestBed } from '@angular/core/testing';
import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;

  const mockToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
    'eyJ1c2VySUQiOiIxMjMiLCJyb2xlcyI6WyJhZG1pbiIsInVzZXIiXSwiaWF0IjoxNjA3MTI3MzAwLCJleHAiOjE2MzcxMjczMDB9.' +
    'signature';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenService],
    });
    service = TestBed.inject(TokenService);

    // Set up localStorage mock
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      (localStorage as any)[key] = value;
    });
    spyOn(localStorage, 'getItem').and.callFake((key: string) => (localStorage as any)[key] || null);
    spyOn(localStorage, 'removeItem').and.callFake((key: string) => {
      delete (localStorage as any)[key];
    });
  });

  afterEach(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('id');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set token and user details in localStorage', () => {
    const data = {
      token: mockToken,
      user: { userID: '123', id: '456' },
    };

    service.set(data);

    expect(localStorage.setItem).toHaveBeenCalledWith('token', mockToken);
    expect(localStorage.setItem).toHaveBeenCalledWith('user_id', '123');
    expect(localStorage.setItem).toHaveBeenCalledWith('id', '456');
  });

  it('should retrieve the token from localStorage', () => {
    localStorage.setItem('token', mockToken);

    const token = service.getToken();

    expect(token).toBe(mockToken);
  });

  it('should validate a valid token', () => {
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user_id', '123');

    const isValid = service.isValid();

    expect(isValid).toBeTrue();
  });

  it('should return false for an invalid token', () => {
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user_id', 'invalid_user');

    const isValid = service.isValid();

    expect(isValid).toBeFalse();
  });

  it('should decode the token payload correctly', () => {
    const payload = service.payload(mockToken);

    expect(payload.userID).toBe('123');
    expect(payload.roles).toEqual(['admin', 'user']);
    expect(payload.exp).toBeTruthy();
  });

  it('should remove token and user details from localStorage', () => {
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user_id', '123');
    localStorage.setItem('id', '456');

    service.removeToken();

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user_id')).toBeNull();
    expect(localStorage.getItem('id')).toBeNull();
  });

  it('should return roles from the token', () => {
    localStorage.setItem('token', mockToken);

    const roles = service.getRoles();

    expect(roles).toEqual(['admin', 'user']);
  });

  it('should return null if token decoding fails', () => {
    const invalidToken = 'invalid.token.signature';
    localStorage.setItem('token', invalidToken);

    const payload = service.payload(invalidToken);

    expect(payload).toBeNull();
  });

  it('should return loggedIn as true for a valid token', () => {
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user_id', '123');

    expect(service.loggedIn()).toBeTrue();
  });

  it('should return loggedIn as false for an invalid token', () => {
    localStorage.setItem('token', 'invalidToken');
    localStorage.setItem('user_id', '123');

    expect(service.loggedIn()).toBeFalse();
  });
});
