import { createDirectus, rest } from '@directus/sdk';

const directusAPI = process.env.DIRECTUS_URL_DEV

const directus = createDirectus(`${directusAPI}`).with(rest({
    onRequest: (options) => ({ ...options, cache: 'no-store' }),
}))

export default directus;