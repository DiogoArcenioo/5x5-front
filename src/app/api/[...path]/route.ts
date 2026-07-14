type ApiRouteContext = {
  params: Promise<{ path: string[] }>;
};

const FORWARDED_REQUEST_HEADERS = [
  "accept",
  "accept-language",
  "authorization",
  "content-type",
  "cookie",
  "user-agent",
];

async function forward(request: Request, context: ApiRouteContext): Promise<Response> {
  const configuredBackend = process.env.BACKEND_URL
    ?? (process.env.NODE_ENV === "development" ? "http://localhost:3000" : undefined);

  if (!configuredBackend) {
    return Response.json(
      { statusCode: 503, message: "Backend não configurado." },
      { status: 503 },
    );
  }

  const { path } = await context.params;

  try {
    const backendBase = configuredBackend.endsWith("/")
      ? configuredBackend
      : `${configuredBackend}/`;
    const target = new URL(`api/${path.map(encodeURIComponent).join("/")}`, backendBase);
    target.search = new URL(request.url).search;

    const headers = new Headers();
    for (const name of FORWARDED_REQUEST_HEADERS) {
      const value = request.headers.get(name);
      if (value) headers.set(name, value);
    }

    const hasBody = request.method !== "GET" && request.method !== "HEAD";
    const body = hasBody ? await request.arrayBuffer() : undefined;

    return await fetch(target, {
      method: request.method,
      headers,
      body,
      cache: "no-store",
      redirect: "manual",
      signal: AbortSignal.timeout(30_000),
    });
  } catch (error) {
    console.error("Backend proxy request failed", error);
    return Response.json({
      statusCode: 502,
      message: "Não foi possível acessar a API.",
      detail: process.env.NODE_ENV === "development" && error instanceof Error
        ? error.message
        : undefined,
    }, { status: 502 });
  }
}

export const dynamic = "force-dynamic";
export const GET = forward;
export const POST = forward;
export const PUT = forward;
export const PATCH = forward;
export const DELETE = forward;
export const HEAD = forward;
export const OPTIONS = forward;
