import {Http} from '@angular/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import {Task} from '../classes/task';
import {Item} from '../classes/item';

/*
  связь с бэкендом
*/

@Injectable()
export class DataService {
  public tasks: Task[];

  url = ''; //"http://localhost/";

  constructor(private http: Http) {

  }

  getTasksList() {
    return this.http.get(this.url + 'php/tasks/get.php').
    pipe(map((data) => {
      const d = JSON.parse(data['_body']);
      for (const i in d) {
        d[i].expanded = false;
        d[i].nativeTitle = d[i].title;
        d[i].loading = false;
        d[i].visible = true;


        if (d[i].items == null) {
          d[i].items = [];
        }

        for (const j in d[i].items) {
          d[i].items[j].nativeTitle = d[i].items[j].title;
          d[i].items[j].done = (d[i].items[j].done == 0) ? false : true;
        }
      }

      return d;
    }));
  }




  checkboxClick(item: Item, task: Task) {
    return this.http.get(this.url + 'php/items/checkbox.php', {params: {id: item.id}}).
    pipe(map((data) => {
      item.done = !item.done;
      task.modified = Math.floor(new Date().getTime() / 1000);
    }));
  }


  deleteItem(item: Item, task: Task) {
    return this.http.get(this.url + 'php/items/delete.php', {params: {id: item.id}}).
    pipe(map((data) => {
      for (const i in task.items) {
        if (task.items[i].id == item.id) {
          task.items.splice(+i, 1);
          break;
        }
      }

      task.modified = Math.floor(new Date().getTime() / 1000);
    }));
  }


  addItem(title: string, task: Task) {
    return this.http.get(this.url + 'php/items/add.php', {
      params: {
        task_id: task.id,
        title: title
      }
    }).
    pipe(map((data) => {
      const newItem: Item = {
        id: data['_body'],
        title: title,
        done: false,
        nativeTitle: title,
      };

      task.items.push(newItem);
      task.modified = Math.floor(new Date().getTime() / 1000);
    }));
  }


  itemRename(item: Item, task: Task) {
    return this.http.get(this.url + 'php/items/rename.php', {
      params: {
        id: item.id,
        title: item.title
      }
    }).
    pipe(map((data) => {
      item.nativeTitle = item.title;
      task.modified = Math.floor(new Date().getTime() / 1000);
    }));
  }

  taskRename(task: Task) {
    return this.http.get(this.url + 'php/tasks/rename.php', {
      params: {
        id: task.id,
        title: task.title
      }
    }).
    pipe(map((data) => {
      task.nativeTitle = task.title;
      task.modified = Math.floor(new Date().getTime() / 1000);
    }));
  }


  deleteTask(id: number) {
    return this.http.get(this.url + 'php/tasks/delete.php', {params: {id: id}});
  }


  addTask() {
    return this.http.get(this.url + 'php/tasks/add.php');
  }
}
