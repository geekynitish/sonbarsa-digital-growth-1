export default {
  async fetch(request, env) {
    const host = request.headers.get("host") || "";
    if (host === "www.sonbarsa.com") {
      const url = new URL(request.url);
      url.hostname = "sonbarsa.com";
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
