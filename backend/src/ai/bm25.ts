export class BM25 {
  private corpusSize: number;
  private avgDocLen: number;
  private docLengths: number[];
  private idf: Map<string, number>;
  private termFreqs: Map<string, number>[];

  // Các hệ số tiêu chuẩn của thuật toán Okapi BM25
  private k1 = 1.2;
  private b = 0.75;

  constructor(corpus: string[][]) {
    this.corpusSize = corpus.length;
    this.docLengths = [];
    this.idf = new Map();
    this.termFreqs = [];

    let totalLen = 0;
    const docCountWithTerm = new Map<string, number>();

    corpus.forEach((docTokens, i) => {
      this.docLengths[i] = docTokens.length;
      totalLen += docTokens.length;

      const freqs = new Map<string, number>();
      docTokens.forEach((token) => {
        freqs.set(token, (freqs.get(token) || 0) + 1);
      });
      this.termFreqs.push(freqs);

      freqs.forEach((_, token) => {
        docCountWithTerm.set(token, (docCountWithTerm.get(token) || 0) + 1);
      });
    });

    this.avgDocLen = this.corpusSize > 0 ? totalLen / this.corpusSize : 0;

    // Tính toán IDF cho từng từ khóa (Inverse Document Frequency)
    docCountWithTerm.forEach((df, token) => {
      // Công thức IDF cơ bản của BM25
      const idfValue = Math.log((this.corpusSize - df + 0.5) / (df + 0.5) + 1);
      this.idf.set(token, idfValue);
    });
  }

  getScores(queryTokens: string[]): number[] {
    const scores = new Array(this.corpusSize).fill(0);

    queryTokens.forEach((token) => {
      const idf = this.idf.get(token) || 0;
      if (idf === 0) return; // Bỏ qua từ chưa từng xuất hiện trong kho dữ liệu

      for (let i = 0; i < this.corpusSize; i++) {
        const freqs = this.termFreqs[i];
        const tf = freqs.get(token) || 0;

        if (tf > 0) {
          const docLen = this.docLengths[i];
          // Công thức chấm điểm TF-IDF của Okapi BM25
          const numerator = tf * (this.k1 + 1);
          const denominator = tf + this.k1 * (1 - this.b + this.b * (docLen / this.avgDocLen));
          scores[i] += idf * (numerator / denominator);
        }
      }
    });

    return scores;
  }
}
