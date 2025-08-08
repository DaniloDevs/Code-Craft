export interface ICacheRepository {
   set(key: string, value: string): Promise<void>
   incrementValue(key: string, increment: number, member: string): Promise<void>
}
