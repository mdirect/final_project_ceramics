export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export async function apiFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    let errorDetails = "";
    try {
      const data = (await response.json()) as { message?: string } | undefined;
      if (data?.message) {
        errorDetails = ` - ${data.message}`;
      }
    } catch {
      // ignore json parse errors
    }
    throw new Error(`Request failed: ${response.status}${errorDetails}`);
  }

  return response.json() as Promise<T>;
}

