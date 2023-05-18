import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class ParseLatLngPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
