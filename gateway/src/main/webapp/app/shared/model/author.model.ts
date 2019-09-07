import { IBlog } from 'app/shared/model/blog.model';

export interface IAuthor {
  id?: number;
  name?: string;
  blogs?: IBlog[];
}

export class Author implements IAuthor {
  constructor(public id?: number, public name?: string, public blogs?: IBlog[]) {}
}
