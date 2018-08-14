/*
  преобразование unix-времени в формат "изменено *** времени назад"
*/

export class DateService {
    constructor() {}

    public static translateDate(modified: number): string {
     const now = Math.floor(new Date().getTime() / 1000);
     const diff = now - modified;

     if (diff < 60) {
        return 'только что';
     }

     if (diff < 60 * 60) {
        return Math.floor(diff / 60) + ' ' + DateService.getWord(Math.floor(diff / 60), ['минуту', 'минуты', 'минут']) + ' назад';
     }

     if (diff < 60 * 60 * 24) {
        return Math.floor(diff / (60 * 60)) + ' ' + DateService.getWord(Math.floor(diff / (60 * 60)), ['час', 'часа', 'часов']) + ' назад';
     }

     if (diff < 60 * 60 * 24 * 30) {
        return Math.floor(diff / (60 * 60 * 24)) + ' ' + DateService.getWord(Math.floor(diff / (60 * 60 * 24)) , ['день', 'дня', 'дней']) + ' назад';
     }

     if (diff < 60 * 60 * 24 * 365) {
        return Math.floor(diff / (60 * 60 * 24 * 30)) + ' ' + DateService.getWord( Math.floor(diff / (60 * 60 * 24 * 30)) , ['месяц', 'месяца', 'месяцев']) + ' назад';
     }

      return Math.floor(diff / (60 * 60 * 24 * 365)) + ' ' + DateService.getWord(Math.floor(diff / (60 * 60 * 24 * 365)) , ['год', 'года', 'лет']) + ' назад';
    }


    // склонение существительных
    public static getWord(number: number, titles: string[]) {
      const cases = [2, 0, 1, 1, 1, 2];
      return titles[ (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5] ];
    }
}
