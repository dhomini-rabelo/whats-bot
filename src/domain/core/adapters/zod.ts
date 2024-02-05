import * as zod from 'zod'
import { ValidationError } from '../use-cases/errors/validation-error/error'
import { EmptyRecord } from 'types/simple'

export function adaptZodSchema<ISchema extends zod.ZodType>(
  schemaObject: ISchema,
  data: EmptyRecord,
) {
  const validation = schemaObject.safeParse(data)
  if (!validation.success) {
    throw new ValidationError()
  }
  return validation.data
}
