export default {
    async fetch(request) {
        // URL base da API do Mixpanel
        const mixpanelUrl = "https://api.mixpanel.com";

        // Extrair o caminho e a query string do request original
        const url = new URL(request.url);
        const path = url.pathname;
        const searchParams = url.search;

        // Configurar o destino completo
        const targetUrl = mixpanelUrl + path + searchParams;

        // Copiar o método e cabeçalhos do request original
        const init = {
            method: request.method,
            headers: request.headers,
            body: request.method !== "GET" ? await request.text() : null,
        };

        // Fazer o request para o Mixpanel
        const response = await fetch(targetUrl, init);

        // Retornar a resposta para o cliente
        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
        });
    },
} satisfies ExportedHandler<Env>;