import mtpcData from '../data/mtpc_knowledge_base/mtpc_data_agent.json';

export interface MtpcknowledgeItem {
  title: string;
  category: string;
  url: string;
  content: string;
  keywords: string;
}

/**
 * AgentRouter helps find the most relevant URL on the MTPC website
 * based on user input or AI intent classification.
 */
export const AgentRouter = {
  /**
   * Finds a URL based on keyword matching
   * @param query The user's input or intention
   * @returns The most relevant URL or null if no strong match
   */
  findUrl(query: string): string | null {
    const data: MtpcknowledgeItem[] = mtpcData as MtpcknowledgeItem[];
    const lowerQuery = query.toLowerCase();

    // 1. Check for exact category match or direct keyword hit
    const directHit = data.find(item => 
      lowerQuery.includes(item.title.toLowerCase()) || 
      item.keywords.split(', ').some(k => lowerQuery.includes(k.toLowerCase()))
    );

    if (directHit) return directHit.url;

    // 2. Fallback: Search in content (simplified)
    const contentHit = data.find(item => item.content.toLowerCase().includes(lowerQuery));
    if (contentHit) return contentHit.url;

    return null;
  },

  /**
   * Get all available routes organized by category
   */
  getRoutes() {
    return mtpcData.map(item => ({
      title: item.title,
      category: item.category,
      url: item.url
    }));
  }
};
