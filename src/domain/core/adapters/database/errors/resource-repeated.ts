import { DatabaseError } from './_base'

export class ResourceRepeated extends DatabaseError {
  public type = 'resource-repeated'
}
