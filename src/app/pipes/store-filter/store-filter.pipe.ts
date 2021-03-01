import { Pipe, PipeTransform } from '@angular/core';
import { StoreOrderType } from 'src/app/orders/models/order.model';


@Pipe({
  name: 'storeFilter'
})
export class StoreFilterPipe implements PipeTransform {

  transform(value: StoreOrderType, args: any): any {
    let name = '';
    switch (value) {
      case StoreOrderType.MartOsDelivery: {
        if (args === 'details') {
          name = 'Fast Delivery';
        } else {
          name = 'Mart OS';
        }
        break;
      }
      case StoreOrderType.PickUpInStore: {
        name = 'PickUp In Store';
        break;
      }
      case StoreOrderType.StoreDelivery: {
        name = 'Store Delivery';
        break;
      }
      default: {
        break;
      }
    }
    return name;

  }

}
