export interface CursorPaginationParams {
  cursor?: string;
  limit: number;
}

export interface CursorPaginationResult<T> {
  items: T[];
  nextCursor: string | null;
  hasMore: boolean;
  totalCount?: number;
}

export function encodeCursor(id: string, timestamp: string): string {
  return Buffer.from(`${id}:${timestamp}`).toString('base64url');
}

export function decodeCursor(cursor: string): { id: string; timestamp: string } {
  const decoded = Buffer.from(cursor, 'base64url').toString('utf-8');
  const [id, timestamp] = decoded.split(':');
  if (!id || !timestamp) throw new Error('Invalid cursor format');
  return { id, timestamp };
}

export function buildPaginatedResponse<T extends { id: string; createdAt: string }>(
  items: T[],
  limit: number,
): CursorPaginationResult<T> {
  const hasMore = items.length > limit;
  const resultItems = hasMore ? items.slice(0, limit) : items;
  const lastItem = resultItems[resultItems.length - 1];
  const nextCursor = hasMore && lastItem ? encodeCursor(lastItem.id, lastItem.createdAt) : null;

  return {
    items: resultItems,
    nextCursor,
    hasMore,
  };
}
