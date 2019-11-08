import { IAuthor } from 'app/shared/model/author.model';

export interface IBlog {
  id?: number;
  text?: string;
  author?: IAuthor;
}

export class Blog implements IBlog {
  constructor(public id?: number, public text?: string, public author?: IAuthor) {}
}
