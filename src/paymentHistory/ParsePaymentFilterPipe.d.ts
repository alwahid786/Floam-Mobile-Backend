import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class ParsePaymentFilterPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
