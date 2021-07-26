import { Injectable } from '@angular/core';
import { Framework } from './framework';
import { Versions } from './versions';

@Injectable()
export class DataService {
  getFramework() {
    return [
      new Framework(0, 'angular'),
      new Framework(1, 'react'),
      new Framework(2, 'vue')
    ];
  }

  getVersions() {
   return [
     new Versions(0, 0, '1.1.1'),
     new Versions(1, 0, '1.2.1'),
     new Versions(2, 0, '1.3.3'),
     new Versions(3, 1, '2.1.2'),
     new Versions(4, 1, '3.2.4'),
     new Versions(5, 1, '4.3.1'),
     new Versions(6, 2, '3.3.1'),
     new Versions(7, 2, '5.2.1'),
     new Versions(8, 2, '5.1.3')
   ];
  }
}
