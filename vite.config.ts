import {resolve} from 'path';
import {defineConfig} from 'vite'
import handlebars from 'vite-plugin-handlebars';

const root = resolve(__dirname, 'src/pages')
const outDir = resolve(__dirname, 'dist')

export default defineConfig({
    plugins: [handlebars()],
    root,
    build: {
        outDir,
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(root, 'index.html'),
                404: resolve(root, '404.html'),
                500: resolve(root, '500.html'),
                authorization: resolve(root, 'authorization.html'),
                chat: resolve(root, 'chat.html'),
                profile: resolve(root, 'profile.html'),
                registration: resolve(root, 'registration.html'),
            }
        }
    }
})
