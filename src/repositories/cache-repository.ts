export interface ICacheRepository {
   set(key: string, value: string): Promise<void>
   incrementValue(key: string, member: string, increment: number): Promise<void>
   incrementValueInRanking(
      key: string,
      increment: number,
      member: string,
   ): Promise<void>
   getTopRanking(
      key: string,
      valueStart: string | number,
      valueEnd: string | number,
      withScores?: 'WITHSCORES',
   ): Promise<string[]>
}
