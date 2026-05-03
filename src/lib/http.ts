class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

export const isFiniteNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);

export const fetchJsonOrNull = async (
  requestUrl: string,
  resourceLabel: string,
): Promise<unknown | null> => {
  const response = await fetch(requestUrl);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new ApiError(`Failed to load ${resourceLabel}.`, response.status);
  }

  try {
    return await response.json();
  } catch {
    throw new ApiError(`Failed to parse ${resourceLabel} response.`, response.status);
  }
};
