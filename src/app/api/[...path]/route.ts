type ApiRouteContext = {
  params: Promise<{ path: string[] }>;
};

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

    const proxyRequest = new Request(target, request);
    return await fetch(proxyRequest, {
      cache: "no-store",
      signal: AbortSignal.timeout(30_000),
    });
  } catch {
    return Response.json(
      { statusCode: 502, message: "Não foi possível acessar a API." },
      { status: 502 },
    );
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
