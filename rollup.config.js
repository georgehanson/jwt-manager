import typescript from 'rollup-plugin-typescript';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

export default {
    entry: './src/index.ts',
    dest: './dist/build.js',
    plugins: [
        typescript(),
        babel({
            exclude: 'node_modules/**',
            presets: ['es2015-rollup', 'stage-2'],
            plugins: ['transform-object-assign']
        }),
        uglify({}, minify)
    ]
}