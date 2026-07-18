type ApiRouteContext = {
  params: Promise<{ path: string[] }>;
};

const FORWARDED_REQUEST_HEADERS = [
  "accept",
  "accept-language",
  "authorization",
  "content-type",
  "cookie",
  "origin",
  "user-agent",
  "x-forwarded-for",
];

const UNSAFE_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

async function forward(request: Request, context: ApiRouteContext): Promise<Response> {
  const configuredBackend = process.env.BACKEND_URL
    ?? (process.env.NODE_ENV === "development" ? "http://localhost:3000" : undefined);

  if (!configuredBackend) {
    return Response.json(
      { statusCode: 503, message: "Backend não configurado." },
      { status: 503 },
    );
  }

  const internalApiKey = process.env.INTERNAL_API_KEY;
  if (!internalApiKey || internalApiKey.length < 48) {
    return Response.json(
      { statusCode: 503, message: "Canal seguro da API não configurado." },
      { status: 503 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 64 * 1024) {
    return Response.json({ statusCode: 413, message: "Requisição muito grande." }, { status: 413 });
  }

  if (process.env.NODE_ENV === "production" && UNSAFE_METHODS.has(request.method)) {
    const configuredSite = new URL(process.env.SITE_URL || "https://cs5x5.com").origin;
    if (request.headers.get("origin") !== configuredSite) {
      return Response.json({ statusCode: 403, message: "Origem da requisição não autorizada." }, { status: 403 });
    }
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
    headers.set("x-internal-api-key", internalApiKey);

    const hasBody = request.method !== "GET" && request.method !== "HEAD";
    const body = hasBody ? await request.arrayBuffer() : undefined;

    const backendResponse = await fetch(target, {
      method: request.method,
      headers,
      body,
      cache: "no-store",
      redirect: "manual",
      signal: AbortSignal.timeout(30_000),
    });
    const responseHeaders = new Headers(backendResponse.headers);
    responseHeaders.set("Cache-Control", "no-store, max-age=0");
    responseHeaders.delete("server");
    responseHeaders.delete("x-powered-by");
    return new Response(backendResponse.body, {
      status: backendResponse.status,
      statusText: backendResponse.statusText,
      headers: responseHeaders,
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
