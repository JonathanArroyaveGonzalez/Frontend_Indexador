import { Gnome } from './gnome';

describe('Gnome', () => {
  it('should create an instance', () => {
    expect(new Gnome('id', 'name', 'thumbnail', "", "", "", "", "", "", {})).toBeTruthy();
  });
});
