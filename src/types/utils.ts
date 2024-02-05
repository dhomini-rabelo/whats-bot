export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
export type Mandatory<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>
// export type ConditionalType<T> = T extends null ? string : number
export type NullObject<T> = {
  [K in keyof T]: T[K] | null
}
export type TrueObject<T> = {
  [K in keyof T]: true
}
