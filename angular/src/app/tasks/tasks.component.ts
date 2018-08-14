import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Task} from '../classes/task';
import {Item} from '../classes/item';
import {DateService} from '../services/date.service';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [DataService],
})


export class TasksComponent implements OnInit {
  tasks: Task[];
  translateDate = DateService.translateDate;
  searchString: string;

  constructor(private http: Http, private Data: DataService) { }

  ngOnInit() {
    this.Data.getTasksList().subscribe(data => {
      this.tasks = data;
    });
  }

  // отлавливаем нажатие на карточку списка
  taskOnClick(task: Task, e): void {
    if (!task.expanded) {
      if ((e.target.nodeName == 'INPUT') || (e.target.nodeName == 'LABEL') || (e.target.nodeName == 'I')) {
        // не сворачивать/разворачивать при нажатии на данные элементы
        return;
      }
    } else {
      // если карточка уже развернута, то ничего не делаем
      return;
    }

    // если кликнули не на чекбокс, то разворачиваем
    this.toggleTask(task);
  }


  // переименование списка
  taskRename(task: Task): void {
    if (task.title == task.nativeTitle) return;
    task.loading = true;

    this.Data.taskRename(task).subscribe((data) => {
      task.loading = false;
    });
  }

  // добавление списка
  addTask(): void {
    this.Data.addTask().
      subscribe((data) => {
        const newTask: Task = {
          id: data['_body'],
          title: 'Новый список',
          items: [],
          expanded: false,
          nativeTitle: 'Новый список',
          modified: Math.floor(new Date().getTime() / 1000),
          loading: false,
          visible: true
        };

        this.tasks = [newTask].concat(this.tasks);
      });
  }

  // сворачивание/разворачивание списка
  toggleTask(task: Task): void {   // свернуть/развернуть карточку
      task.expanded = !task.expanded;
  }

  // удаление списка
  deleteTask(task: Task): void {
    task.loading = true;
    this.Data.deleteTask(task.id).subscribe((data) => {
      for (const i in this.tasks) {
        if (this.tasks[i].id == task.id) {
          this.tasks.splice(+i, 1);
          break;
        }
      }
      task.loading = false;
    });
  }



  // изменение текста элемента списка
  itemRename(item: Item, task: Task): void {
    if (item.title == item.nativeTitle) return;
    task.loading = true;

    this.Data.itemRename(item, task).subscribe((data) => {
      task.loading = false;
    });
  }

  // добавление элмента списка
  addItem(task: Task, e): void {
    task.loading = true;
    if (e.target.value != '') {
      this.Data.addItem(e.target.value, task).subscribe((data) => {
        task.loading = false;
      });
      e.target.value = '';
    }
  }

  // удаление элмента списка
  deleteItem(item: Item, task: Task): void {
    task.loading = true;
    this.Data.deleteItem(item, task).subscribe((data) => {
      task.loading = false;
    });
  }

  // изменение состояния элемента сделано/не сделано
  checkboxOnClick(item: Item, task: Task): void {
    task.loading = true;
    this.Data.checkboxClick(item, task).subscribe((data) => {
      task.loading = false;
    });
  }


  // получение количества элементов, помеченных как "сделано"
  getDoneItemsCount(task: Task): number {
    let count = 0;

    for (const i in task.items) {
      if (task.items[i].done) {
        count++;
      }
    }

    return count;
  }


  // поиск по спискам
  search(): void {
    const s = this.searchString.toLowerCase();

    if (s == '') { // если пустой запрос -- отобразить все списки
      for (const i in this.tasks) {
        this.tasks[i].visible = true;
      }
      return;
    }


    for (const i in this.tasks) {
      let v = false;

      if (this.tasks[i].title.toLowerCase().includes(s)) {
        this.tasks[i].visible = true;
        continue;
      }

      for (const j in this.tasks[i].items) {
        if (this.tasks[i].items[j].title.toLowerCase().includes(s)) {
          v = true;
        }
      }

      this.tasks[i].visible = v;
    }
  }


  // отлавливает нажатие enter при изменении названия списка/элемента
  enterCatcher(e, task: Task, item: Item = undefined) {
    if (item == undefined) {
      this.taskRename(task);
    } else {
      this.itemRename(item, task);
    }

    e.target.blur();
  }

}
