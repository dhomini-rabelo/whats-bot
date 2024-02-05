import { DatabaseError } from './_base'

export class ResourceNotFoundError extends DatabaseError {
  public type = 'resource-not-found'
}
