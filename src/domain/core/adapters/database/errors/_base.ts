export abstract class DatabaseError extends Error {
  abstract type: string
}
