import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'equalToProperty', async: false })
export class EqualToProperty implements ValidatorConstraintInterface {
    validate(value: unknown, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = (args.object as unknown)[relatedPropertyName];
        return value === relatedValue;
    }

    defaultMessage(args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        return `${relatedPropertyName} and confirm${relatedPropertyName} do not match`;
    }
}
