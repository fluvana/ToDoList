export class Item {
  id: number;
  title: string; // название элемента списка
  nativeTitle: string;  // для проверки, изменилось ли название элемента после редактирования или нет
  done: Boolean; // помечен ли как "сделано"?
}
