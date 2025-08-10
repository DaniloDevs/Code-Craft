export interface ICacheRepository {
   set(key: string, value: string): Promise<void>
   get(key: string): Promise<string | null>

   hashSet(hashKey: string, field: string, value: string): Promise<void>
   hashGet(hashKey: string, field: string): Promise<string | null>
   hashIncrement(
      hashKey: string,
      field: string,
      increment: number,
   ): Promise<void>

   rankingIncrement(
      key: string,
      member: string,
      increment: number,
   ): Promise<void>
   rankingGetTop(
      key: string,
      start: number,
      end: number,
      withScores?: boolean,
   ): Promise<string[]>
   rankingGetScore(key: string, member: string): Promise<string | null>
}
