const User = require('./User');

describe('User model', () => {
  it('hashes a password', () => {
    const user = new User ({
      username: 'Chris',
      password: 'password123'
    });

    expect(user.passwordHash).toEqual(expect.any(String));
    expect(user.toJSON().password).toBeUndefined();
  });
  
});
