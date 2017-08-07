import Card from '../../common/card';

export class Player {
  public tokens: Card[];

  constructor(public name: string) {
    this.tokens = [];
  }
}
