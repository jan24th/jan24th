import { errorHandle } from "~/utils/gql";
import type { Sdk } from "./generated";
import { getSdk } from './generated'
import type { ClientError } from 'graphql-request';
import { GraphQLClient } from 'graphql-request'

const requestHeaders = async () => {
  const headers = new Headers();
  const SHOPIFY_TOKEN = process.env.SHOPIFY_TOKEN
  if (!SHOPIFY_TOKEN) throw new Error('SHOPIFY_TOKEN is missing')
  headers.set("X-Shopify-Storefront-Access-Token", SHOPIFY_TOKEN);
  return headers;
};
export const createClientBase = async (
  clientUrl: string,
  getHeaders?: () => Promise<Headers>,
  handleError?: {
    error?: (e: Error) => void;
    clientError?: (e: ClientError) => void;
  }
): Promise<Sdk> => {
  const headers = (await getHeaders?.()) || new Headers();
  headers.set("Content-Type", "application/json");
  return getSdk(
    new GraphQLClient(clientUrl, {
      headers,
      responseMiddleware: (res) => errorHandle(res, handleError),
    })
  );
};
export const shopifyAPI = () => {
  const SHOPIFY_ENDPOINT = process.env.SHOPIFY_ENDPOINT
  if (!SHOPIFY_ENDPOINT) throw new Error('SHOPIFY_ENDPOINT is missing')
  const client = createClientBase(
    SHOPIFY_ENDPOINT,
    requestHeaders,
    {
      error: console.error,
      clientError: (e) => console.log(e.request.variables),
    }
  )
  return new Proxy<Sdk>({} as Sdk, {
    get: (target, prop, receiver) => (...args: any) =>
      client.then((client) => Reflect.get(client, prop, receiver)(...args)
      ),
  })
}
