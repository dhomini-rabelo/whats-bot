export interface IBaseUseCase {
  execute(request: any): Promise<any>
}
