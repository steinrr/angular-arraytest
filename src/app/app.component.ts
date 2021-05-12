import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  monthLabels = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  items = [
    { name: 'item1', date: new Date('May 1 2015') },
    { name: 'item2', date: new Date('May 2 2015') },
    { name: 'item3', date: new Date('May 3 2015') },

    { name: 'item4', date: new Date('June 1 2015') },
    { name: 'item5', date: new Date('June 2 2015') },
    { name: 'item6', date: new Date('June 3 2015') },

    { name: 'item7', date: new Date('August 11 2015') }
  ];

  itemsGroupedByMonth = [];

  constructor() {
    this.itemsGroupedByMonth = this.prepareItems(this.items, this.monthLabels);
  }

  delete(item) {
    var parentIndex = 0;

    for (const monthGroup of this.itemsGroupedByMonth) {
      var index = monthGroup.items.indexOf(item);
      if (index !== -1) {
        monthGroup.items.splice(index, 1);
        if (monthGroup.items.length == 0) {
          this.itemsGroupedByMonth.splice(parentIndex, 1);
        }
      }
      parentIndex++;
    }
  }

  prepareItems(items, monthLabels) {
    var groups = [],
      itemGroupedByMonths = [];

    for (var i = 0; i < items.length; i++) {
      groups[items[i].date.getMonth()] = groups[items[i].date.getMonth()] || [];
      groups[items[i].date.getMonth()].push(items[i]);
    }

    for (var i = 0; i < groups.length; i++) {
      if (groups[i] && groups[i].length) {
        itemGroupedByMonths.push({
          month: monthLabels[i],
          items: groups[i]
        });
      }
    }
    return itemGroupedByMonths;
  }
}
