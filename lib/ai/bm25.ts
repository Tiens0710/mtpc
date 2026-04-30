/**
 * A simple implementation of BM25 (Okapi) in TypeScript.
 * For production, consider using a more robust library like 'flexsearch' or 'bm25'.
 */

export class BM25 {
  private k1: number = 1.5;
  private b: number = 0.75;
  private avgdl: number = 0;
  private docCount: number = 0;
  private docLengths: number[] = [];
  private termFreqs: Map<string, number>[] = [];
  private idf: Map<string, number> = new Map();

  constructor(corpus: string[][]) {
    this.docCount = corpus.length;
    let totalLen = 0;
    
    // Calculate term frequencies and document lengths
    for (const doc of corpus) {
      const tf = new Map<string, number>();
      for (const term of doc) {
        tf.set(term, (tf.get(term) || 0) + 1);
      }
      this.termFreqs.push(tf);
      this.docLengths.push(doc.length);
      totalLen += doc.length;
    }
    
    this.avgdl = totalLen / this.docCount;

    // Calculate IDF
    const docFreqs = new Map<string, number>();
    for (const tfMap of this.termFreqs) {
      for (const term of tfMap.keys()) {
        docFreqs.set(term, (docFreqs.get(term) || 0) + 1);
      }
    }

    for (const [term, freq] of docFreqs) {
      const idfValue = Math.log(1 + (this.docCount - freq + 0.5) / (freq + 0.5));
      this.idf.set(term, idfValue);
    }
  }

  getScores(query: string[]): number[] {
    const scores: number[] = new Array(this.docCount).fill(0);
    
    for (const term of query) {
      const idfValue = this.idf.get(term) || 0;
      if (idfValue === 0) continue;

      for (let i = 0; i < this.docCount; i++) {
        const tf = this.termFreqs[i].get(term) || 0;
        const score = idfValue * (tf * (this.k1 + 1)) / (tf + this.k1 * (1 - this.b + this.b * (this.docLengths[i] / this.avgdl)));
        scores[i] += score;
      }
    }
    
    return scores;
  }
}
