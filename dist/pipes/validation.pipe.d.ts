import { ArgumentMetadata } from '@nestjs/common';
import { PipeTransform } from '@nestjs/common';
export declare class ValidationPipe implements PipeTransform<any> {
    transform(value: any, { metatype }: ArgumentMetadata): Promise<any>;
    private static toValidate;
}
