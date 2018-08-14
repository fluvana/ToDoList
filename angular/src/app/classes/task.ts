import {Item} from '../classes/item';

export class Task {
  id: number;
  title: string; // название списка
  nativeTitle: string;  // для проверки, изменилось ли название списка после редактирования или нет
  items: Item[]; // массив элементов списка
  expanded: Boolean; // развернута ли карточка списка?
  modified: number; // когда был изменен (unix)
  loading: Boolean; // показывать ли спинер загрузки?
  visible: Boolean; // показывать ли карточку списка?
}
