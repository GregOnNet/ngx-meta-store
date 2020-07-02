import {Injectable} from '@angular/core';
import {MetaStore} from "../meta-store.service";

interface Filter {
  name: string;
  age: number;
}

@Injectable({ providedIn: 'root' })
export class FilterStore extends MetaStore<Filter> {}

