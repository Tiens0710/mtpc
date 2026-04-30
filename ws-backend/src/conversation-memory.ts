export interface Turn {
  role: "user" | "assistant";
  text: string;
}

export class ConversationMemory {
  private turns: Turn[] = [];
  private readonly maxTurns: number;

  constructor(maxTurns = 8) {
    this.maxTurns = maxTurns;
  }

  addUser(text: string) {
    this.turns.push({ role: "user", text });
    this.trim();
  }

  addAssistant(text: string) {
    this.turns.push({ role: "assistant", text });
    this.trim();
  }

  buildContextPrefix(currentMessage: string): string {
    if (this.turns.length === 0) return currentMessage;

    const historyLines = this.turns
      .map((t) => `${t.role === "user" ? "Người dùng" : "Trợ lý"}: ${t.text}`)
      .join("\n");

    return `[LỊCH SỬ HỘI THOẠI]\n${historyLines}\n\n[TIN NHẮN HIỆN TẠI]\n${currentMessage}`;
  }

  getHistory(): Turn[] {
    return [...this.turns];
  }

  clear() {
    this.turns = [];
  }

  private trim() {
    const maxItems = this.maxTurns * 2;
    if (this.turns.length > maxItems) {
      this.turns = this.turns.slice(this.turns.length - maxItems);
    }
  }
}
